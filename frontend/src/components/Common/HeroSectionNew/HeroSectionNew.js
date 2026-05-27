"use client";

import Image from "next/image";
import { Heading1, RichParagraph, SecondaryButton } from "../Common";
import BackButton from "../BackButton/BackButton";

export default function HeroImage({
  image,
  mobileImage,
  alt = "Big Bear Vans",

  // CONTENT
  title,
  slogan,
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
}) {
  // FALLBACK IMAGE
  const finalImage =
    image && image.trim() !== "" ? image : "/images/blackLogo.jpg";

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
        sizes="100vw"
        placeholder="blur"
        blurDataURL="/images/blackLogo.jpg"
        className="
object-cover
md
"
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
        sizes="100vw"
        placeholder="blur"
        blurDataURL="/images/blackLogo.jpg"
        className="
hidden
md:block
object-cover object-center
"
      />

      {/* OVERLAY */}
      {overlay && (
        <div className={`absolute inset-0 z-[1] ${overlayOpacity}`} />
      )}

      {/* CONTENT */}
      <div className="relative z-[2] h-full flex items-center">
        <div className="container px-6 md:px-12 lg:px-20 max-w-4xl text-white space-y-6">
          {/* TITLE */}
          {title && <Heading1 text={title} />}
          {slogan && (
            <p className="text-hover text-lg md:text-xl font-semibold italic mt-4 mb-4 tracking-wide">
              {slogan}
            </p>
          )}

          {/* DESCRIPTION */}
          {description && (
            <RichParagraph textColor="secondary">{description}</RichParagraph>
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
