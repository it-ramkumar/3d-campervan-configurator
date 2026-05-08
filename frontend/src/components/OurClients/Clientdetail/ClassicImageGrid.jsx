import { ImageWithSkeleton } from "../../Common/Common";

export default function ClassicImageGrid({ images, layout = "standard" }) {
  const imageStyle = "w-full object-cover rounded-lg border-4 border-white shadow-md hover:shadow-xl transition-shadow duration-300";

  if (layout === "vermont") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 bg-secondary rounded-lg">
        <div className="grid grid-rows-2 gap-4 h-160">
          <ImageWithSkeleton src={images[0]} alt="Vermont campervan" className={`${imageStyle} `} />
          <ImageWithSkeleton src={images[1]} alt="Vermont 2 campervan" className={`${imageStyle} `} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-3 gap-4 h-160">
          <ImageWithSkeleton src={images[2]} alt="Vermont 3 campervan" className={`${imageStyle} h-48 md:h-52`} />
          <ImageWithSkeleton src={images[3]} alt="Vermont 4 campervan" className={`${imageStyle} h-48 md:h-52`} />
          <ImageWithSkeleton src={images[4]} alt="Vermont 5 campervan" className={`${imageStyle} h-48 md:h-52 col-span-2 lg:col-span-1 border-primary`} />
        </div>
      </div>
    );
  }

  if (layout === "motovan") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-primary rounded-lg">
        <div className="col-span-2 md:col-span-2 md:row-span-2 h-160">
          <ImageWithSkeleton src={images[0]} alt="MotoVan 1" className={`${imageStyle} h-full min-h-[300px] border-hover`} />
        </div>
        <div className="col-span-2 md:col-span-2 aspect-auto">
          <ImageWithSkeleton src={images[1]} alt="MotoVan 2" className={`${imageStyle} h-48 md:h-56`} />
        </div>
        <div><ImageWithSkeleton src={images[2]} alt="MotoVan 3" className={`${imageStyle} h-48 md:h-56`} /></div>
        <div><ImageWithSkeleton src={images[3]} alt="MotoVan 4" className={`${imageStyle} h-48 md:h-56`} /></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-3 bg-white rounded-lg border border-primary/10">
      {images?.map((image, index) => (
        <div key={index} className={`${index === 0 ? "col-span-2 md:col-span-2 md:row-span-2 h-160" : "col-span-1"}`}>
          <ImageWithSkeleton
            src={image}
            alt={`Van image ${index + 1}`}
            className={`${imageStyle} ${index === 0 ? "h-64 md:h-full md:min-h-[350px]" : "h-48 md:h-full"}`}
          />
        </div>
      ))}
    </div>
  );
}