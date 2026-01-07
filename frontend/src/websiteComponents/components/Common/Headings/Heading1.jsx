const Heading1 = ({
  text = "Custom Camper Vans...",
  textColor = "text-white",
  className = "",
  inlineStyle = {},
}) => {
  return (
    <h1
      className={`text-2xl sm:text-3xl md:text-5xl lg:text-[64px] xl:text-[72px]
      font-extrabold leading-tight tracking-normal font-serif
      break-words text-center ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </h1>
  );
};

export default Heading1;
