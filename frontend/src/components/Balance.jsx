export const Balance = ({ value }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 border border-[#E6EDF8] flex items-center justify-between">
      
      {/* Left side text */}
      <div>
        <div className="text-sm text-gray-500">Your ₹ Pay Balance</div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-gray-900">₹</span>
          <span className="text-3xl font-extrabold text-gray-900">
            {value}
          </span>
        </div>

        <div className="text-xs text-gray-500 mt-1">
          Available for instant transfer
        </div>
      </div>

      {/* Icon */}
      <div className="rounded-full p-3 bg-[#EAF3FF] flex items-center justify-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#1A73E8]"
        >
          <path
            d="M3 7.5C3 6.67157 3.67157 6 4.5 6H20.5C21.3284 6 22 6.67157 22 7.5V16.5C22 17.3284 21.3284 18 20.5 18H4.5C3.67157 18 3 17.3284 3 16.5V7.5Z"
            stroke="#1A73E8"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 11.5H16.01"
            stroke="#1A73E8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
