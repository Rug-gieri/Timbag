"use client";

// Peças de xadrez em perspectiva isométrica 3D com facetas de luz e dither shading pontilhado
// Padrão dither em SVG patterns (Bayer/Checkerboard) para efeito autêntico 1-bit retro 3D
export function ChessDitherPatterns() {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        {/* Dither denso / Sombra profunda (75% preto) */}
        <pattern id="dither-dark" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#000000" />
          <rect x="0" y="0" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="2" width="1" height="1" fill="#ffffff" />
        </pattern>

        {/* Dither médio / Meio-tom (50% checkerboard) */}
        <pattern id="dither-med" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="#000000" />
          <rect x="1" y="0" width="1" height="1" fill="#ffffff" />
          <rect x="0" y="1" width="1" height="1" fill="#ffffff" />
        </pattern>

        {/* Dither leve / Penumbra (25% pontilhado) */}
        <pattern id="dither-light" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#ffffff" />
          <rect x="0" y="0" width="1" height="1" fill="#000000" />
          <rect x="2" y="2" width="1" height="1" fill="#000000" />
        </pattern>
      </defs>
    </svg>
  );
}

// 6 Peças desenhadas com volume 3D: Face Frontal (Luz / Branca com borda), Face Lateral (Sombra Dither) e Face Topo
const ISOMETRIC_3D_PIECES = [
  // 0: Rei 3D (King)
  (
    <svg viewBox="0 0 64 80" className="w-full h-full" shapeRendering="crispEdges">
      {/* --- Base 3D --- */}
      {/* Topo base */}
      <polygon points="12,68 32,58 52,68 32,76" fill="#ffffff" stroke="#000" strokeWidth="2" />
      {/* Lateral sombra dither base */}
      <polygon points="32,76 52,68 52,72 32,80" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />
      {/* Face frontal base */}
      <polygon points="12,68 32,76 32,80 12,72" fill="#ffffff" stroke="#000" strokeWidth="2" />

      {/* --- Corpo Cônico 3D --- */}
      {/* Face esquerda iluminada */}
      <polygon points="20,44 32,48 32,64 16,68" fill="#ffffff" stroke="#000" strokeWidth="2" />
      {/* Face direita dither sombra */}
      <polygon points="32,48 44,44 48,68 32,64" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />

      {/* --- Anel Central --- */}
      <polygon points="18,44 32,40 46,44 32,48" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <polygon points="32,48 46,44 46,47 32,51" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />

      {/* --- Cúpula / Ombros do Rei --- */}
      <polygon points="16,30 32,36 32,42 18,44" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,36 48,30 46,44 32,42" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />
      {/* Topo da cabeça */}
      <polygon points="18,24 32,18 46,24 32,28" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,28 46,24 48,30 32,36" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />
      <polygon points="18,24 32,28 32,36 16,30" fill="#ffffff" stroke="#000" strokeWidth="2" />

      {/* --- Cruz 3D no Topo --- */}
      {/* Haste Vertical */}
      <polygon points="30,8 34,8 34,18 30,18" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <polygon points="34,8 36,10 36,18 34,18" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
      {/* Haste Horizontal */}
      <polygon points="26,11 38,11 38,14 26,14" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <polygon points="38,11 40,13 40,15 38,14" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),

  // 1: Rainha 3D (Queen)
  (
    <svg viewBox="0 0 64 80" className="w-full h-full" shapeRendering="crispEdges">
      {/* Base 3D */}
      <polygon points="14,68 32,60 50,68 32,76" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,76 50,68 50,73 32,80" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />
      <polygon points="14,68 32,76 32,80 14,73" fill="#ffffff" stroke="#000" strokeWidth="2" />

      {/* Tronco 3D */}
      <polygon points="22,46 32,50 32,66 18,68" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,50 42,46 46,68 32,66" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />

      {/* Coroa Facetada 3D */}
      <polygon points="16,32 32,38 32,48 20,46" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,38 48,32 44,46 32,48" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />

      {/* Pontas da Coroa 3D (5 Pontas com profundidade) */}
      {/* Ponta Centro */}
      <polygon points="30,12 34,12 33,26 31,26" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <polygon points="34,12 36,15 35,26 33,26" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
      {/* Ponta Esquerda Média */}
      <polygon points="22,16 26,16 30,30 26,30" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      {/* Ponta Direita Média (Sombra Dither) */}
      <polygon points="38,16 42,16 38,30 34,30" fill="url(#dither-med)" stroke="#000" strokeWidth="1.5" />
      {/* Ponta Extrema Esquerda */}
      <polygon points="14,22 18,22 22,34 18,34" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      {/* Ponta Extrema Direita (Dither Escuro) */}
      <polygon points="46,22 50,22 46,34 42,34" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />

      {/* Esferas das pontas */}
      <circle cx="32" cy="11" r="2.5" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <circle cx="24" cy="15" r="2.5" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <circle cx="40" cy="15" r="2.5" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
      <circle cx="16" cy="21" r="2.5" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <circle cx="48" cy="21" r="2.5" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),

  // 2: Torre 3D (Rook)
  (
    <svg viewBox="0 0 64 80" className="w-full h-full" shapeRendering="crispEdges">
      {/* Base 3D */}
      <polygon points="14,68 32,60 50,68 32,76" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,76 50,68 50,74 32,80" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />
      <polygon points="14,68 32,76 32,80 14,74" fill="#ffffff" stroke="#000" strokeWidth="2" />

      {/* Coluna Central 3D */}
      <polygon points="20,38 32,42 32,66 20,64" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,42 44,38 44,64 32,66" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />

      {/* Parapeito / Ameias 3D */}
      {/* Face frontal clara */}
      <polygon points="16,22 32,27 32,38 18,36" fill="#ffffff" stroke="#000" strokeWidth="2" />
      {/* Face lateral sombra dither */}
      <polygon points="32,27 48,22 46,36 32,38" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />

      {/* 3 Ameias no topo 3D */}
      {/* Esquerda */}
      <polygon points="16,14 22,16 22,22 16,20" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <polygon points="22,16 24,14 24,20 22,22" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
      {/* Centro */}
      <polygon points="28,18 34,18 34,26 28,24" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <polygon points="34,18 36,16 36,24 34,26" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
      {/* Direita */}
      <polygon points="40,16 46,14 46,20 40,22" fill="url(#dither-med)" stroke="#000" strokeWidth="1.5" />
      <polygon points="46,14 48,16 48,22 46,20" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),

  // 3: Cavalo 3D (Knight)
  (
    <svg viewBox="0 0 64 80" className="w-full h-full" shapeRendering="crispEdges">
      {/* Base 3D */}
      <polygon points="14,68 32,60 50,68 32,76" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,76 50,68 50,74 32,80" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />
      <polygon points="14,68 32,76 32,80 14,74" fill="#ffffff" stroke="#000" strokeWidth="2" />

      {/* Peito e Pescoço frontal */}
      <polygon points="18,48 30,46 32,64 18,66" fill="#ffffff" stroke="#000" strokeWidth="2" />
      {/* Lateral posterior com dither pesado */}
      <polygon points="30,46 44,40 46,65 32,64" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />

      {/* Focinho e Cabeça angular 3D */}
      <polygon points="10,34 26,30 28,44 14,46" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="26,30 38,24 40,38 28,44" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />

      {/* Orelha Esquerda (Luz) */}
      <polygon points="26,18 30,16 32,26 28,26" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      {/* Orelha Direita (Sombra Dither) */}
      <polygon points="34,16 38,14 38,24 34,24" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />

      {/* Crina geométrica dither degrau */}
      <polygon points="38,24 48,28 46,36 38,32" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
      <polygon points="40,36 48,40 46,48 38,44" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),

  // 4: Bispo 3D (Bishop)
  (
    <svg viewBox="0 0 64 80" className="w-full h-full" shapeRendering="crispEdges">
      {/* Base 3D */}
      <polygon points="14,68 32,60 50,68 32,76" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,76 50,68 50,74 32,80" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />
      <polygon points="14,68 32,76 32,80 14,74" fill="#ffffff" stroke="#000" strokeWidth="2" />

      {/* Tronco cônico 3D */}
      <polygon points="22,46 32,50 32,66 20,66" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,50 42,46 44,66 32,66" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />

      {/* Mitra / Cabeça oval 3D */}
      <polygon points="16,30 32,36 32,46 18,44" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,36 48,30 46,44 32,46" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />

      {/* Cúpula superior com corte chanfrado */}
      <polygon points="20,16 32,22 32,34 16,30" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,22 44,16 48,30 32,34" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />

      {/* Rasgo chanfrado característico do bispo */}
      <polygon points="26,20 30,22 28,28 24,26" fill="#000000" stroke="#000" strokeWidth="1" />

      {/* Pomo do topo */}
      <circle cx="32" cy="13" r="3" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <path d="M32,10 A3,3 0 0,1 35,13 L32,13 Z" fill="url(#dither-dark)" />
    </svg>
  ),

  // 5: Peão 3D (Pawn)
  (
    <svg viewBox="0 0 64 80" className="w-full h-full" shapeRendering="crispEdges">
      {/* Base 3D */}
      <polygon points="16,68 32,62 48,68 32,76" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,76 48,68 48,74 32,80" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />
      <polygon points="16,68 32,76 32,80 16,74" fill="#ffffff" stroke="#000" strokeWidth="2" />

      {/* Tronco piramidal 3D */}
      <polygon points="24,46 32,50 32,66 20,66" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,50 40,46 44,66 32,66" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />

      {/* Colar anelar */}
      <polygon points="22,42 32,44 42,42 32,46" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <polygon points="32,46 42,42 42,45 32,49" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />

      {/* Cabeça esférica 3D facetada com dither */}
      <polygon points="20,24 32,30 32,42 20,38" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,30 44,24 44,38 32,42" fill="url(#dither-med)" stroke="#000" strokeWidth="2" />
      <polygon points="24,14 32,18 32,30 20,24" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <polygon points="32,18 40,14 44,24 32,30" fill="url(#dither-dark)" stroke="#000" strokeWidth="2" />
      {/* Topo cúpula */}
      <polygon points="26,10 32,8 38,10 32,16" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <polygon points="32,16 38,10 40,14 32,18" fill="url(#dither-dark)" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
];

// Peças de xadrez fotorrealistas em 3D com iluminação Phong e padrão Bayer Dither clássico
const DITHER_PIECES = [
  { src: "/chess-dither/king.png", alt: "Rei 3D Dither" },
  { src: "/chess-dither/queen.png", alt: "Rainha 3D Dither" },
  { src: "/chess-dither/rook.png", alt: "Torre 3D Dither" },
  { src: "/chess-dither/knight.png", alt: "Cavalo 3D Dither" },
  { src: "/chess-dither/bishop.png", alt: "Bispo 3D Dither" },
  { src: "/chess-dither/pawn.png", alt: "Peão 3D Dither" },
];

// 13 peças maiores (140px a 310px), mantendo o raio central, dispersas em alturas e ângulos 3D.
// Rotação hiperlenta (720s).
const ORBIT_PIECES = [
  { piece: 0, size: 300, duration: 720, delay: -0.0, radiusX: 530, radiusY: 165, tiltX: 24, tiltY: -18, opacity: 0.95 },
  { piece: 5, size: 140, duration: 720, delay: -48.0, radiusX: 420, radiusY: 80, tiltX: -28, tiltY: 30, opacity: 0.82 },
  { piece: 1, size: 280, duration: 720, delay: -104.0, radiusX: 490, radiusY: 195, tiltX: 15, tiltY: -22, opacity: 0.92 },
  { piece: 4, size: 200, duration: 720, delay: -170.0, radiusX: 520, radiusY: 110, tiltX: -20, tiltY: 16, opacity: 0.86 },
  { piece: 3, size: 310, duration: 720, delay: -224.0, radiusX: 430, radiusY: 220, tiltX: 26, tiltY: -15, opacity: 0.95 },
  { piece: 2, size: 220, duration: 720, delay: -276.0, radiusX: 500, radiusY: 95, tiltX: -18, tiltY: 24, opacity: 0.88 },
  { piece: 5, size: 150, duration: 720, delay: -338.0, radiusX: 540, radiusY: 185, tiltX: 30, tiltY: -28, opacity: 0.82 },
  { piece: 4, size: 240, duration: 720, delay: -392.0, radiusX: 410, radiusY: 130, tiltX: -22, tiltY: 18, opacity: 0.9 },
  { piece: 3, size: 280, duration: 720, delay: -444.0, radiusX: 505, radiusY: 210, tiltX: 18, tiltY: -25, opacity: 0.94 },
  { piece: 5, size: 155, duration: 720, delay: -502.0, radiusX: 530, radiusY: 75, tiltX: -26, tiltY: 28, opacity: 0.82 },
  { piece: 2, size: 260, duration: 720, delay: -556.0, radiusX: 425, radiusY: 175, tiltX: 16, tiltY: -26, opacity: 0.9 },
  { piece: 1, size: 250, duration: 720, delay: -612.0, radiusX: 495, radiusY: 105, tiltX: -16, tiltY: 20, opacity: 0.92 },
  { piece: 5, size: 160, duration: 720, delay: -668.0, radiusX: 525, radiusY: 215, tiltX: 22, tiltY: -16, opacity: 0.84 },
];

export function OrbitChessPieces() {
  return (
    <>
      <ChessDitherPatterns />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-visible select-none [perspective:1200px]"
      >
        {ORBIT_PIECES.map((p, idx) => {
          const piece = DITHER_PIECES[p.piece];
          return (
            <div
              key={idx}
              className="chess-orbit absolute drop-shadow-2xl"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
                animationName: "chessOrbit",
                ["--radius-x" as string]: `${p.radiusX}px`,
                ["--radius-y" as string]: `${p.radiusY}px`,
                ["--base-scale" as string]: 1,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotateX(${p.tiltX}deg) rotateY(${p.tiltY}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={piece.src}
                  alt={piece.alt}
                  className="w-full h-full object-contain pointer-events-none select-none filter contrast-125 brightness-95"
                  style={{ imageRendering: "pixelated" }}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
