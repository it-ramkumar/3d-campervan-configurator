"use client";

import Image from "next/image";
import { Heading1, RichParagraph, SecondaryButton } from "../Common";
import BackButton from "../BackButton/BackButton";

export default function HeroImage({
  image,
  mobileImage,
  alt = "Big Bear Vans",

  // CONTENT
  slogan,
  title,
  description,

  // BUTTON
  buttonText,
  link = "/",
  showButton = true,

  // OVERLAY
  overlay = true,
  overlayOpacity = "bg-black/40",

  // IMAGE
  priority = true,
  className = "",
  imagePosition = "center",
}) {
  // FALLBACK IMAGE
  const finalImage =
    image && image.trim() !== "" ? image : "/images/blackLogo.webp";

  return (
    <section
      className={`
        relative w-full overflow-hidden
        h-[60vh] sm:h-[70vh] lg:h-[90vh]
        ${className}
      `}
    >
      {/* 🛠️ BACK BUTTON WITH ABSOLUTE POSITION AND HIGH Z-INDEX */}
      <div className="">
        <BackButton variant="default" label="Go Back" />
      </div>

      {/* HERO IMAGE */}
      {/* MOBILE IMAGE */}
      <Image
        src={mobileImage || finalImage}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        quality={70}
        sizes="(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 1536px"
        placeholder="blur"
        blurDataURL="/images/blackLogo.webp"
        style={{ objectPosition: imagePosition }}
        className="block md:hidden object-cover"
      />

      {/* DESKTOP IMAGE */}
      <Image
        src={finalImage}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        quality={70}
        sizes="(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 1536px"
        placeholder="blur"
        blurDataURL="/images/blackLogo.webp"
        style={{ objectPosition: imagePosition }}
        className="hidden md:block object-cover"
      />

      {/* OVERLAY */}
      {overlay && (
        <>
          <div className="absolute inset-0 z-[1] bg-gradient-to-tr from-black/80 via-black/35 to-transparent" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </>
      )}

      {/* Orange bottom accent — matches site-wide style */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ED985F] z-10" />

      {/* CONTENT */}
      <div className="relative z-[2] h-full flex items-center">
        <div className="container px-6 md:px-12 lg:px-20 max-w-3xl text-white space-y-5">
          {slogan && (
            <span className="inline-flex items-center font-ui font-semibold text-[10px] uppercase tracking-[0.28em] text-[#ED985F] border-l-2 border-[#ED985F] pl-3 py-0.5">
              {slogan}
            </span>
          )}
          {/* TITLE */}
          {title && <Heading1 text={title} />}

          {/* DESCRIPTION */}
          {description && (
            <RichParagraph textColor="secondary" >{description}</RichParagraph>
          )}

          {/* BUTTON */}
          {showButton && buttonText && (
            <SecondaryButton link={link} label={buttonText} />
          )}
        </div>
      </div>
    </section>
  );
}
