const RichParagraph = ({
  children,
  html,
  textColor = "text-black",
  className = "",
  inlineStyle = {},
  white = false,
  onClick,
}) => {
  const finalColorClass = white ? "text-white" : "text-black";

  if (html) {
    return (
      <p
        className={`text-sm sm:text-base md:text-lg lg:text-[16px] leading-relaxed font-serif ${finalColorClass} ${className}`}
        style={inlineStyle}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <p
      onClick={onClick}
      className={`
        text-sm sm:text-base md:text-lg lg:text-[16px]
        leading-relaxed font-serif
        ${finalColorClass}
        ${className}
      `}
      style={inlineStyle}
    >
      {children}
    </p>
  );
};

export default RichParagraph;
