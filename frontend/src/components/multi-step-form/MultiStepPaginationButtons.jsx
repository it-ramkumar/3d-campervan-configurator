export default function MultiStepPaginationButtons({ onClick, text, disabled = false }) {
  return (
    <div className="">
      <button
        onClick={onClick}
        disabled={disabled}
       className="px-4 py-2 text-xs  rounded-full bg-white shadow-sm text-gray-800 transition"
      >
        <div className="">
          <span>{text}</span>
        </div>
      </button>
    </div>
  );
}
