"use client";

import { useEffect, useRef } from "react";
import {
  MORPH_PARTICLES,
  KNIGHT_W,
  KNIGHT_H,
  GAMBIT_W,
  GAMBIT_H,
} from "./knight-morph-data";

interface MorphParticle {
  knightRelX: number;
  knightRelY: number;
  textRelX: number;
  textRelY: number;
  // Posição base dispersa por toda a tela (0 a 1)
  scatterRatioX: number;
  scatterRatioY: number;
  // Parâmetros de rotação / órbita suave em torno do centro cobrindo toda a tela
  baseRadiusRatio: number;
  baseAngle: number;
  orbitAngularSpeed: number;
  waveFreq: number;
  waveAmp: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isWhite: boolean;
  baseSize: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isStarShining: boolean;
  delayRatio: number;
}

// ============================================================================
// PARÂMETROS DE CONTROLE DA ANIMAÇÃO (Ajuste aqui facilmente)
// ============================================================================
// VELOCIDADE DO GIRO: Multiplicador geral da velocidade orbital.
// Exemplo: 1.0 (atual), 2.0 (dobro da velocidade), 0.5 (metade da velocidade).
const ORBIT_SPEED_MULTIPLIER = 0.2;

export function KnightToGambitMorph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      targets = calculateTargets();
    };

    const calculateTargets = () => {
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      // Escala do Cavalo: perfeitamente calibrada para a proporção vertical da tela
      // No mobile (~375px a 430px), 1.25x gera ~318px de altura, centralizando perfeitamente entre header e footer
      const knightScale = isMobile ? Math.min(1.3, (height * 0.45) / KNIGHT_H) : isTablet ? 1.75 : 2.2;

      // Escala do Texto Gambit: garante margem segura lateral de no mínimo 10% em qualquer celular
      const maxTextWidth = isMobile ? width * 0.84 : isTablet ? width * 0.75 : 840;
      const textScale = Math.min(maxTextWidth / GAMBIT_W, isMobile ? 0.7 : isTablet ? 1.3 : 1.7);

      const knightCenterX = (width - KNIGHT_W * knightScale) / 2;
      const knightCenterY = (height - KNIGHT_H * knightScale) / 2;

      const textCenterX = (width - GAMBIT_W * textScale) / 2;
      const textCenterY = (height - GAMBIT_H * textScale) / 2;

      // Diagonal pré-calculada para evitar Math.hypot em cada partícula
      const diagonal = Math.hypot(width, height);

      // Tamanho do pixel de renderização proporcional à tela
      const dotSize = isMobile ? 1.8 : 2.2;

      return {
        knightScale,
        textScale,
        knightCenterX,
        knightCenterY,
        textCenterX,
        textCenterY,
        diagonal,
        dotSize,
        isMobile,
      };
    };

    let targets = calculateTargets();
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const particles: MorphParticle[] = MORPH_PARTICLES.map(([kx, ky, tx, ty, color]) => {
      const targetKnightX = targets.knightCenterX + kx * targets.knightScale;
      const targetKnightY = targets.knightCenterY + ky * targets.knightScale;
      const isStarShining = Math.random() < 0.16;

      // Dispersão natural com raios circulares perfeitos (isotrópicos), sem forçar aspecto retangular
      // Raios vão desde próximo ao centro até bem além das bordas (raio máximo até 85% da diagonal da tela)
      // Isso permite que várias partículas escapem e atravessem as bordas da tela naturalmente
      const radiusRatio = Math.pow(Math.random(), 0.7) * 0.85; // de 0 até 0.85 da diagonal da tela
      const baseAngle = Math.random() * Math.PI * 2;

      // Velocidade angular de rotação suave em torno do centro multiplicada pelo controle global
      const baseSpeed = 0.00018 + (1 - Math.min(1, radiusRatio / 0.85)) * 0.00028 + (Math.random() - 0.5) * 0.00006;
      const orbitAngularSpeed = baseSpeed * ORBIT_SPEED_MULTIPLIER;

      // Micro ondulações cósmicas orgânicas
      const waveFreq = 0.001 + Math.random() * 0.002;
      const waveAmp = 4 + Math.random() * 12;

      return {
        knightRelX: kx,
        knightRelY: ky,
        textRelX: tx,
        textRelY: ty,
        scatterRatioX: 0,
        scatterRatioY: 0,
        baseRadiusRatio: radiusRatio,
        baseAngle,
        orbitAngularSpeed,
        waveFreq,
        waveAmp,
        startX: targetKnightX,
        startY: targetKnightY,
        currentX: targetKnightX,
        currentY: targetKnightY,
        isWhite: color === 1,
        baseSize: isStarShining ? 2.4 : 1.6 + Math.random() * 1.0,
        twinkleSpeed: 0.002 + Math.random() * 0.006,
        twinklePhase: Math.random() * Math.PI * 2,
        isStarShining,
        delayRatio: Math.random() * 0.22,
      };
    });

    let animationFrameId: number;

    // Estados acionados SOMENTE por clique:
    // 0 = Cavalo (estável e imponente)
    // 1 = Céu Estrelado / Partículas ocupando toda a tela com movimento orbital cósmico
    // 2 = Palavra Gambit (estável e montada)
    let currentStep: 0 | 1 | 2 = 0;
    let transitionStartTime = performance.now();
    const TRANSITION_DURATION = 1400; // Tempo de expansão explosiva

    // Curva cúbica suave e explosiva para expansão limpa (ease-out)
    const easeOutCubic = (x: number): number => {
      const t = Math.max(0, Math.min(1, x));
      return 1 - Math.pow(1 - t, 3);
    };

    // Posição calculada com raios circulares reais (sem compressão/achatamento e permitindo escapar das bordas)
    const getOrbitPosition = (p: MorphParticle, time: number) => {
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      const r = p.baseRadiusRatio * targets.diagonal;

      // Ângulo contínuo no tempo
      const orbitTime = time - transitionStartTime;
      const angle = p.baseAngle + orbitTime * p.orbitAngularSpeed;

      // Pequena ondulação radial cósmica
      const wave = Math.sin(time * p.waveFreq + p.twinklePhase) * p.waveAmp;

      return {
        x: centerX + Math.cos(angle) * (r + wave),
        y: centerY + Math.sin(angle) * (r + wave),
      };
    };

    const getTargetPos = (step: number, p: MorphParticle, time: number) => {
      if (step === 0) {
        return {
          x: targets.knightCenterX + p.knightRelX * targets.knightScale,
          y: targets.knightCenterY + p.knightRelY * targets.knightScale,
        };
      } else if (step === 2) {
        return {
          x: targets.textCenterX + p.textRelX * targets.textScale,
          y: targets.textCenterY + p.textRelY * targets.textScale,
        };
      } else {
        // Passo 1: Partículas ocupando a tela inteira em órbita suave ao redor do centro
        return getOrbitPosition(p, time);
      }
    };

    // Tabela pré-calculada de strings de cor para evitar garbage collection a 60fps
    const COLOR_WHITE = "rgba(255, 255, 255, 0.98)";
    const COLOR_BLACK = "rgba(10, 10, 12, 0.98)";
    const ALPHA_TABLE: string[] = [];
    for (let a = 0; a <= 100; a++) {
      ALPHA_TABLE.push(`rgba(20, 20, 24, ${(a / 100).toFixed(2)})`);
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = time - transitionStartTime;
      const isMoving = elapsed < TRANSITION_DURATION;
      const progressRaw = Math.min(1, elapsed / TRANSITION_DURATION);

      const isOrbiting = currentStep === 1;

      // Otimização de lote (batching) no modo estável do Cavalo / Gambit
      if (!isOrbiting && !isMoving) {
        const dotSize = targets.dotSize;
        ctx.fillStyle = COLOR_BLACK;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!p.isWhite || currentStep === 2) {
            ctx.fillRect(p.currentX | 0, p.currentY | 0, dotSize, dotSize);
          }
        }
        if (currentStep === 0) {
          ctx.fillStyle = COLOR_WHITE;
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.isWhite) {
              ctx.fillRect(p.currentX | 0, p.currentY | 0, dotSize, dotSize);
            }
          }
        }
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const target = getTargetPos(currentStep, p, time);

        if (isMoving) {
          const pProgress = Math.max(0, (progressRaw - p.delayRatio) / (1 - p.delayRatio));
          const eased = easeOutCubic(pProgress);
          p.currentX = p.startX + (target.x - p.startX) * eased;
          p.currentY = p.startY + (target.y - p.startY) * eased;
        } else {
          // Quando atinge o estado final:
          // Se for órbita (passo 1), acompanha fluidamente a trajetória contínua ao redor do centro
          p.currentX = target.x;
          p.currentY = target.y;
        }

        // Renderização dos pontos
        if (isOrbiting) {
          // Descarta partículas que estejam muito fora da viewport para aliviar o desenho
          if (p.currentX < -60 || p.currentX > width + 60 || p.currentY < -60 || p.currentY > height + 60) {
            continue;
          }

          // Efeito estelar cintilante
          const twinkle = Math.sin(time * p.twinkleSpeed + p.twinklePhase);
          const alphaNorm = Math.min(1, Math.max(0, 0.35 + (twinkle + 1) * 0.3));
          const alphaIndex = Math.min(100, Math.max(0, (alphaNorm * 100) | 0));
          const starSize = p.isStarShining ? p.baseSize * (1 + twinkle * 0.25) : p.baseSize;

          if (p.isStarShining && twinkle > 0.45) {
            ctx.fillStyle = ALPHA_TABLE[Math.max(0, alphaIndex - 20)];
            const crossLen = starSize * 1.7;
            ctx.fillRect((p.currentX - crossLen * 0.5) | 0, p.currentY | 0, crossLen, 1);
            ctx.fillRect(p.currentX | 0, (p.currentY - crossLen * 0.5) | 0, 1, crossLen);
          }

          ctx.fillStyle = ALPHA_TABLE[alphaIndex];
          ctx.fillRect(p.currentX | 0, p.currentY | 0, starSize, starSize);
        } else {
          // Forma em transição (Cavalo / Gambit)
          ctx.fillStyle = currentStep === 0 && p.isWhite ? COLOR_WHITE : COLOR_BLACK;
          ctx.fillRect(p.currentX | 0, p.currentY | 0, targets.dotSize, targets.dotSize);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // O AVANÇO ACONTECE ESTRITAMENTE QUANDO O USUÁRIO CLICA OU TOCA NA TELA
    const handleCanvasInteraction = (e: MouseEvent | TouchEvent) => {
      // Grava onde cada partícula está neste milissegundo para transicionar suavemente a partir dali
      for (let i = 0; i < particles.length; i++) {
        particles[i].startX = particles[i].currentX;
        particles[i].startY = particles[i].currentY;
      }

      // Cicla entre: 0 (Cavalo) -> 1 (Estrelas) -> 2 (Gambit) -> 1 (Estrelas) -> 0 (Cavalo)
      if (currentStep === 0) currentStep = 1;
      else if (currentStep === 1) currentStep = 2;
      else currentStep = 0;

      transitionStartTime = performance.now();
    };

    canvas.addEventListener("click", handleCanvasInteraction);
    canvas.addEventListener("touchend", handleCanvasInteraction, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateCanvasSize);
      canvas.removeEventListener("click", handleCanvasInteraction);
      canvas.removeEventListener("touchend", handleCanvasInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        aria-label="Metamorfose manual: Clique para alternar entre o Cavalo, o Céu Estrelado e o nome Gambit"
        className="pointer-events-auto h-full w-full cursor-pointer"
      />
    </div>
  );
}
