
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
  overlay = false,

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
        relative w-full overflow-hidden bg-primary py-8 md:py-12 lg:py-16
        ${className}
      `}
    >
      {/* BACK BUTTON */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30">
        <BackButton variant="default" label="Go Back" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 pt-10 md:pt-4">
        {/* 50 / 50 GRID */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2
            gap-8 lg:gap-12
            items-center
          "
        >
          {/* TEXT CONTENT AREA */}
          <div className="order-2 lg:order-1 text-white space-y-4">
            {/* SLOGAN */}
            {slogan && (
              <div>
                <span className="inline-flex items-center font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.28em] text-secondary border-l-2 border-secondary pl-3 py-0.5">
                  {slogan}
                </span>
              </div>
            )}

            {/* LABOR DAY OFFER */}
            <div className="flex items-center gap-3 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />

              <span className="font-ui text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-red-400">
                Labor Day Special · Save $9,999
              </span>

              <span className="hidden sm:block h-px flex-1 max-w-16 bg-white/20" />
            </div>

            {/* TITLE */}
            {title && (
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight text-white">
                <Heading1 text={title} />
              </div>
            )}

            {/* DESCRIPTION */}
            {description && (
              <div className="max-w-xl">
                <RichParagraph textColor="secondary">
                  {description}
                </RichParagraph>
              </div>
            )}

            {/* BUTTON */}
            {showButton && buttonText && (
              <div className="pt-2">
                <SecondaryButton link={link} label={buttonText} />
              </div>
            )}
          </div>

          {/* IMAGE AREA — 50% WIDTH + SQUARE */}
          <div className="order-1 lg:order-2 w-full">
            <div
              className="
                relative w-full
                aspect-square
                rounded-xl
                overflow-hidden
                bg-primary/50
                shadow-2xl
              "
            >
              {/* MOBILE IMAGE */}
              <Image
                src={mobileImage || finalImage}
                alt={alt}
                fill
                priority={priority}
                fetchPriority={priority ? "high" : "auto"}
                loading={priority ? "eager" : "lazy"}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="/images/blackLogo.webp"
                style={{ objectPosition: imagePosition }}
                className="block md:hidden object-contain"
              />

              {/* DESKTOP IMAGE */}
              <Image
                src={finalImage}
                alt={alt}
                fill
                priority={priority}
                fetchPriority={priority ? "high" : "auto"}
                loading={priority ? "eager" : "lazy"}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="/images/blackLogo.webp"
                style={{ objectPosition: imagePosition }}
                className="hidden md:block object-contain"
              />

              {/* OPTIONAL OVERLAY */}
              {overlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACCENT LINE */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-secondary z-20" />
    </section>
  );
}

