import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TransactionHistory() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");

  async function handleData() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/account/history",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Get current logged-in userId from localStorage
      const currentUser = localStorage.getItem("userId");
      setUserId(currentUser);

      setData(res.data.history);
    } catch (err) {
      console.error(err);
      alert("Error loading history");
    }
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="w-full py-5">
      <div className="w-full lg:max-w-7xl mx-auto px-4 md:px-0 text-white flex flex-col justify-between gap-3">
        <p className="text-2xl font-bold">Transaction History</p>

        {/* Header row */}
        <div className="grid grid-cols-12 gap-4 p-4 rounded-md bg-zinc-700 w-full text-white font-semibold">
          <div className="col-span-1">No.</div>
          <div className="col-span-4">Sender</div>
          <div className="col-span-4">Receiver</div>
          <div className="col-span-3">Amount</div>
        </div>

        {/* Data rows */}
        {data.length > 0 ? (
          data.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 p-4 rounded-md bg-zinc-800 w-full text-white"
            >
              <div className="col-span-1">{i + 1}</div>

              <div className="col-span-4">
                {item.senderFirstName} {item.senderLastName}
              </div>

              <div className="col-span-4">
                {item.receiverFirstName} {item.receiverLastName}
              </div>

              {/* If current user is sender → show negative (red) */}
              {userId === item.sendId ? (
                <div className="text-lg col-span-3 text-red-600">
                  -₹{item.amount}
                </div>
              ) : (
                <div className="text-lg col-span-3 text-green-600">
                  +₹{item.amount}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-5">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
}
