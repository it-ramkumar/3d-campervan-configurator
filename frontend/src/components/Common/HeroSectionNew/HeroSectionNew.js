"use client";

import Image from "next/image";
import {
  Heading1,
  RichParagraph,
  SecondaryButton,
} from "../Common";

export default function HeroImage({
  image,
  alt = "Big Bear Vans",
  title,
  description,
  buttonText,
  buttonLink = "/",
  showButton = true,

  overlay = true,
  overlayOpacity = "bg-black/40",

  priority = true,
  className = "",
}) {

  // FALLBACK IMAGE
  const finalImage =
    image && image.trim() !== ""
      ? image
      : "/images/blackLogo.jpg";

  return (
    <section
      className={`
        relative w-full overflow-hidden
        h-[60vh] sm:h-[70vh] lg:h-screen
        ${className}
      `}
    >

      {/* HERO IMAGE */}
      <Image
        src={finalImage}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        quality={75}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* OVERLAY */}
      {overlay && (
        <div
          className={`absolute inset-0 z-[1] ${overlayOpacity}`}
        />
      )}

      {/* CONTENT */}
      <div className="relative z-[2] h-full flex items-center">
        <div className="container px-6 md:px-12 lg:px-20 max-w-4xl text-white space-y-6">

          {/* TITLE */}
          {title && (
            <Heading1 text={title} />
          )}

          {/* DESCRIPTION */}
          {description && (
            <RichParagraph textColor="secondary">
              {description}
            </RichParagraph>
          )}

          {/* BUTTON */}
          {showButton && buttonText && (
            <SecondaryButton
              link={buttonLink}
              label={buttonText}
            />
          )}

        </div>
      </div>

    </section>
  );
}