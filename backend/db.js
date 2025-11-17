const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const HistorySchema = new mongoose.Schema(
  {
    sendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // sender must always be known
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // receiver must always be known
    },

    // optional denormalized names (kept as you added)
    senderFirstName: {
      type: String,
    },
    senderLastName: {
      type: String,
    },
    receiverFirstName: {
      type: String,
    },
    receiverLastName: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01, // prevent negative or zero transfers
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); 

// Helpful indexes for fast history searches
HistorySchema.index({ sendId: 1, createdAt: -1 });
HistorySchema.index({ receiverId: 1, createdAt: -1 });

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);
const History = mongoose.model("History", HistorySchema);

module.exports = {
  User,
  Account,
  History,
};
