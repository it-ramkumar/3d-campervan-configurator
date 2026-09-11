import { ImageWithSkeleton } from "../../Common/Common";

export default function ClassicImageGrid({ images = [] }) {
  const imageStyle =
    "w-full aspect-square object-cover  shadow-md hover:shadow-xl transition-shadow duration-300";

  return (
    <div className="grid grid-cols-2 gap-4 p-3 bg-primary/40 rounded-lg border border-hover/20">
      {images.slice(0, 4).map((image, index) => (
        <ImageWithSkeleton
          key={index}
          src={image}
          alt={`Van image ${index + 1}`}
          className={imageStyle}
        />
      ))}
    </div>
  );
}