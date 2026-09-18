export default function FeatureItemText({ text = "" }) {
  const colonIndex = text.indexOf(":");

  return (
    <span>
      {colonIndex > 0 ? (
        <>
          <strong className="font-bold">{text.slice(0, colonIndex)}</strong>
          {text.slice(colonIndex)}
        </>
      ) : text}
    </span>
  );
}
