const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, History, User } = require("../db"); // FIXED: Added User
const mongoose = require("mongoose");

const router = express.Router();

// Balance
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  res.json({
    balance: account.balance,
  });
});

// Money Transfer
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;

  // Don't allow transfer to oneself
  if (to === req.userId) {
    await session.abortTransaction();
    return res.json({ message: "Cannot Transfer to yourself!" });
  }

  try {
    // Sender & receiver accounts
    const senderAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const receiverAccount = await Account.findOne({ userId: to }).session(
      session
    );

    if (!receiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Fetch full user docs to store names in history
    const senderUser = await User.findById(req.userId).session(session);
    const receiverUser = await User.findById(to).session(session);

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // History creation
    await History.create(
      [
        {
          sendId: req.userId,
          receiverId: to,

          senderFirstName: senderUser.firstName,
          senderLastName: senderUser.lastName,

          receiverFirstName: receiverUser.firstName,
          receiverLastName: receiverUser.lastName,

          amount: amount,
        },
      ],
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({
      message: "Transfer failed",
    });
  }
});

// Transaction history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    // Fetch ALL entries where user is sender OR receiver
    const history = await History.find({
      $or: [{ sendId: req.userId }, { receiverId: req.userId }],
    }).sort({ createdAt: -1 });

    res.json({
      history,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
});

module.exports = router;
