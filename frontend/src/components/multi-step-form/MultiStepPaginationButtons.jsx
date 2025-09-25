export default function MultiStepPaginationButtons({ onClick, text, disabled = false }) {
  return (
    <div className="">
      <button
        onClick={onClick}
        disabled={disabled}
       className="px-4 py-2 text-xs  cursor-pointer  hover:shadow-lg
          focus:outline-none focus:ring-2 focus:bg-dark focus:text-brand
          transition-all duration-300
          disabled:opacity-40 disabled:cursor-not-allowed rounded-full bg-brand shadow-sm text-gray-800 "
      >
        <div className="">
          <span>{text}</span>
        </div>
      </button>
    </div>
  );
}
