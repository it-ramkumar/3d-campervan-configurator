const GIFVanLoader = () => {
  return (
    // <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark bg-opacity-80 z-50">
    //   {/* Loader GIF */}
    //   <div className="w-24 h-24 sm:w-32 sm:h-32">
    //     <img
    //       src="/loader.gif"
    //       alt="Moving Van"
    //       className="w-full h-full object-contain animate-bounce"
    //     />
    //   </div>

    //   {/* Loading Text */}
    //   <p className=" text-white text-lg sm:text-xl font-semibold text-center">
    //     Please wait, your model is loading...
    //   </p>
    // </div>
    <div className="flex justify-center items-center h-full">
    <div className="w-12 h-12 border-4 border-dark border-t-transparent rounded-full animate-spin"></div>
  </div>
  );
};

export default GIFVanLoader;
