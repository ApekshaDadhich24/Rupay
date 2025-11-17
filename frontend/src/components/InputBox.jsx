export function InputBox({ label, placeholder, onChange }) {
  return (
    <div className="w-full">
      <div className="text-sm font-medium text-gray-700 py-1">{label}</div>

      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-[#E6EDF8] rounded-lg 
                   bg-white text-sm text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-[#EAF3FF]
                   placeholder-gray-400 transition"
      />
    </div>
  );
}
