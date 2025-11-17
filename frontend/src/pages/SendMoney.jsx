import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const SendMoney = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if token doesn't exist
    }
  }, []);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-[#E6EDF8] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
                aria-label="Go back"
              >
                <i class="ri-arrow-left-line"></i>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                Send Money
              </h3>
            </div>

            <div className="text-sm text-gray-500">Secure transfer</div>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-lg">
                {name && name.length > 0 ? name[0].toUpperCase() : "U"}
              </div>
              <div>
                <div className="text-lg font-medium text-gray-900">{name}</div>
                <div className="text-xs text-gray-500">Recipient</div>
              </div>
            </div>

            {/* Amount input */}
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Amount (in Rs)
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  className="w-full pl-9 pr-3 h-12 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Transfers are instant. Make sure the amount is correct before
                confirming.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={async () => {
                  const res = await axios.post(
                    import.meta.env.VITE_SERVER_URL +
                      "/api/v1/account/transfer",
                    {
                      to: id,
                      amount,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  navigate("/paymentstatus?message=" + res?.data.message);
                }}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                {/* optional spinner could be added here later */}
                Initiate Transfer
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full flex items-center justify-center h-11 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                Cancel & Go Back
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
            By initiating this transfer you agree to the demo terms. This is a
            student project — no real money is used.
          </div>
        </div>
      </div>
    </div>
  );
};
