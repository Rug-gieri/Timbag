import Image from "next/image";

export function HeroKnight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-4 sm:right-8 md:right-12 lg:right-16 xl:right-24 bottom-6 sm:bottom-10 md:bottom-14 z-30 select-none transition-all duration-500"
    >
      <div className="relative w-28 sm:w-36 md:w-48 lg:w-60 xl:w-72 drop-shadow-[0_25px_40px_rgba(0,0,0,0.22)] knight-l-move">
        <Image
          src="/chess_1.svg"
          alt=""
          width={192}
          height={288}
          priority
          sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 192px, 288px"
          className="w-full h-auto object-contain pointer-events-none select-none contrast-[1.15]"
          style={{ imageRendering: "pixelated" }}
          draggable={false}
        />
      </div>
    </div>
  );
}

// Mantido para compatibilidade retroativa
export const OrbitChessPieces = HeroKnight;
