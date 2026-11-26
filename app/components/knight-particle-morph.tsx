"use client";

import { useEffect, useRef, useState } from "react";
import { KNIGHT_DOTS, KNIGHT_WIDTH, KNIGHT_HEIGHT } from "./knight-particles-data";

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scatterX: number;
  scatterY: number;
  isWhite: boolean;
  size: number;
  seed: number;
}

export function KnightParticleMorph({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScattered, setIsScattered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Dimensões internas de alta resolução
    const scale = 2.2;
    const paddingX = 140;
    const paddingY = 120;
    const targetW = Math.round(KNIGHT_WIDTH * scale + paddingX * 2);
    const targetH = Math.round(KNIGHT_HEIGHT * scale + paddingY * 2);

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = targetW * dpr;
    canvas.height = targetH * dpr;
    canvas.style.width = `${targetW}px`;
    canvas.style.height = `${targetH}px`;
    ctx.scale(dpr, dpr);

    const offsetX = paddingX;
    const offsetY = paddingY;

    // Inicializa as 5.218 partículas com suas posições de repouso e alvos de dispersão
    const particles: Particle[] = KNIGHT_DOTS.map(([x, y, color]) => {
      const targetOriginX = offsetX + x * scale;
      const targetOriginY = offsetY + y * scale;

      // Posição de dispersão estelar orgânica ao redor do cavalo
      const angle = Math.random() * Math.PI * 2;
      const distance = 90 + Math.random() * 220;
      const scatterX = targetOriginX + Math.cos(angle) * distance;
      const scatterY = targetOriginY + Math.sin(angle) * distance;

      return {
        originX: targetOriginX,
        originY: targetOriginY,
        x: targetOriginX,
        y: targetOriginY,
        vx: 0,
        vy: 0,
        scatterX,
        scatterY,
        isWhite: color === 1,
        size: color === 1 ? scale * 0.95 : scale * 1.05,
        seed: Math.random() * 10,
      };
    });

    let animationFrameId: number;
    let localScattered = false;
    let lastToggleTime = performance.now();
    const cycleDuration = 3600; // Tempo em ms entre ciclos automáticos (se não interagido)

    const render = (time: number) => {
      ctx.clearRect(0, 0, targetW, targetH);

      // Alterna o ciclo suavemente de tempos em tempos
      if (time - lastToggleTime > cycleDuration) {
        localScattered = !localScattered;
        setIsScattered(localScattered);
        lastToggleTime = time;
      }

      // Parâmetros de física (Spring dynamics)
      const spring = localScattered ? 0.035 : 0.055;
      const friction = localScattered ? 0.88 : 0.84;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const targetX = localScattered ? p.scatterX : p.originX;
        const targetY = localScattered ? p.scatterY : p.originY;

        // Se estiver disperso, adiciona uma micro-deriva flutuante (ruído de poeira cósmica)
        const driftX = localScattered ? Math.sin(time * 0.002 + p.seed) * 0.8 : 0;
        const driftY = localScattered ? Math.cos(time * 0.002 + p.seed) * 0.8 : 0;

        const ax = (targetX + driftX - p.x) * spring;
        const ay = (targetY + driftY - p.y) * spring;

        p.vx = (p.vx + ax) * friction;
        p.vy = (p.vy + ay) * friction;

        p.x += p.vx;
        p.y += p.vy;

        // Desenho do pixel dither
        if (p.isWhite) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.96)";
          ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        } else {
          ctx.fillStyle = "rgba(10, 10, 12, 0.96)";
          ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleCanvasClick = () => {
      localScattered = !localScattered;
      setIsScattered(localScattered);
      lastToggleTime = performance.now();
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <canvas
        ref={canvasRef}
        aria-label="Cavalo de xadrez em partículas que se desintegram e remontam"
        title="Clique para desmanchar / remontar manualmente"
        className="cursor-pointer drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-[1.02]"
      />
      <span className="mt-1 font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
        {isScattered ? "✦ dispersando partículas..." : "♟ remontado (clique para dispersar)"}
      </span>
    </div>
  );
}
