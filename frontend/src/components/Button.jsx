export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-[#1A73E8] hover:bg-[#0055FF] focus:outline-none focus:ring-4 focus:ring-[#EAF3FF] font-medium rounded-lg text-sm px-5 py-2.5 shadow-sm transition-transform transform hover:-translate-y-0.5 active:translate-y-0"
    >
      {label}
    </button>
  );
}
