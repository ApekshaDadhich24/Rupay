import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TransactionHistory() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");

  async function handleData() {
    try {
      const res = await axios.get(
        "https://rupay.onrender.com/api/v1/account/history",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
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
    <div className="w-full py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Transaction History
            </h1>
            <p className="mt-1 text-sm text-gray-500 max-w-xl">
              All your recent transfers — easily spot debits and credits. This
              list shows who sent and who received each transfer.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Placeholder for future controls (filters/search) */}
            <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                />
              </svg>
              <input
                className="border-0 outline-none text-sm placeholder-gray-400"
                placeholder="Search by name or amount (coming soon)"
                disabled
              />
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">Records</div>
              <div className="text-lg font-semibold text-gray-800">
                {data?.length ?? 0}
              </div>
            </div>
          </div>
        </div>

        {/* Card wrapper */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Sender</div>
            <div className="col-span-4">Receiver</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {data && data.length > 0 ? (
              data.map((item, i) => {
                const isSender = userId === item.sendId;
                const senderName = `${item.senderFirstName || ""} ${
                  item.senderLastName || ""
                }`.trim();
                const receiverName = `${item.receiverFirstName || ""} ${
                  item.receiverLastName || ""
                }`.trim();
                const createdAt = item.createdAt || item.date || ""; // optional
                return (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50 transition"
                  >
                    {/* Index */}
                    <div className="col-span-1 text-sm text-gray-600">
                      {i + 1}
                    </div>

                    {/* Sender */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium">
                        {(item.senderFirstName?.[0] || "U").toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {senderName || "—"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.senderEmail || ""}
                        </div>
                      </div>
                    </div>

                    {/* Receiver */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-medium">
                        {(item.receiverFirstName?.[0] || "U").toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {receiverName || "—"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.receiverEmail || ""}
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-sm text-gray-500">
                      {createdAt ? new Date(createdAt).toLocaleString() : "—"}
                    </div>

                    {/* Amount */}
                    <div className="col-span-2 text-right">
                      {isSender ? (
                        <div className="inline-flex items-center gap-2 text-red-600 font-semibold">
                          <span>-</span>
                          <span>₹{item.amount}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                          <span>+</span>
                          <span>₹{item.amount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">
                  No transactions found yet. Once you send or receive money,
                  transactions will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Small note */}
        <div className="mt-4 text-xs text-gray-400">
          Tip: This is a demo transaction history for the ₹ Pay project. Amounts
          are shown as received (+) or sent (-) from your account perspective.
        </div>
      </div>
    </div>
  );
}
