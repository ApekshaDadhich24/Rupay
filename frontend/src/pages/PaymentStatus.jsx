import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      navigate("/signin");
    } else {
      const t = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#EAF3FF] to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col items-center">

        {/* Success Icon */}
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Payment Status Message */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          {message}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mt-2">
          Your transaction was processed successfully.
        </p>

        {/* Auto Redirect */}
        <p className="text-sm text-gray-600 mt-6">
          Redirecting to Dashboard in <span className="font-semibold">3 seconds...</span>
        </p>

        {/* Optional decorative line */}
        <div className="mt-6 h-px w-40 bg-gray-200 rounded-full"></div>

      </div>
    </div>
  );
};
