export default function MultiStepPaginationButtons({ onClick, text, disabled = false }) {
  return (
    <div className="px-1">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          cursor-pointer
          w-full sm:w-auto
          px-2 sm:px-6 lg:px-8
          py-2 sm:py-2
          text-sm sm:text-sm lg:text-md
          rounded-md
          shadow-md
          border border-[]
          font-heading
          bg-brand text-dark           hover:shadow-lg
          focus:outline-none focus:ring-2 focus:bg-dark focus:text-brand
          transition-all duration-300
          disabled:opacity-40 disabled:cursor-not-allowed
        `}
      >
        <div className="">
          <span>{text}</span>
        </div>
      </button>
    </div>
  );
}
