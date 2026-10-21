"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface StageConfig {
  id: string;
  badge: string;
  label: string;
  headline: string;
  statement: string;
  phrase: string;
}

const STAGES: StageConfig[] = [
  {
    id: "ficar-na-mesma",
    badge: "01 // O RISCO REAL",
    label: "Ficar na mesma",
    headline: "Mais do mesmo.",
    statement: "Ficar na mesma é ficar para trás.",
    phrase: "Pilhas de papéis, notas perdidas e retrabalho manual travando sua operação.",
  },
  {
    id: "mudar",
    badge: "02 // A VIRADA",
    label: "Mudar & Estruturar",
    headline: "Construir a base certa.",
    statement: "Estratégia clara e presença digital consistente.",
    phrase: "Telas e sistemas Gambit integrados operando juntos sem nenhuma fricção.",
  },
  {
    id: "avancar",
    badge: "03 // ESCALAR",
    label: "Avançar",
    headline: "Crescer com previsibilidade.",
    statement: "Decisões guiadas por dados, tração contínua.",
    phrase: "Dinheiro no caixa aumentando com tração comprovada em tempo real.",
  },
];

export default function DecisaoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const deviceFrameRef = useRef<HTMLDivElement>(null);

  // Sub-elementos
  const topBarRef = useRef<HTMLDivElement>(null);
  const stage1ContentRef = useRef<HTMLDivElement>(null);
  const stage2ContentRef = useRef<HTMLDivElement>(null);
  const stage3ContentRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const pillIndicatorRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState<number>(0);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);
  const lenisInstanceRef = useRef<Lenis | null>(null);

  useGSAP(
    () => {
      // 1. Lenis Smooth Scroll apenas no Desktop (sem touch hijacking no celular)
      const isTouchDevice =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);

      let lenis: Lenis | null = null;
      let tickerUpdate: ((time: number) => void) | null = null;

      if (!isTouchDevice && window.innerWidth >= 1024) {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
        });

        lenisInstanceRef.current = lenis;

        tickerUpdate = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(tickerUpdate);
        gsap.ticker.lagSmoothing(0);
        lenis.on("scroll", ScrollTrigger.update);
      }

      // 2. Responsive & Reduced Motion via MatchMedia
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          isReducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context: gsap.Context) => {
          const { isDesktop, isReducedMotion } = (context.conditions || {}) as {
            isDesktop?: boolean;
            isReducedMotion?: boolean;
          };

          if (isReducedMotion) return;

          const device = deviceFrameRef.current;
          const topBar = topBarRef.current;
          const s1 = stage1ContentRef.current;
          const s2 = stage2ContentRef.current;
          const s3 = stage3ContentRef.current;
          const dock = dockRef.current;
          const pill = pillIndicatorRef.current;

          if (!device || !containerRef.current || !pinSectionRef.current) return;

          // NO MOBILE (< 1024px): SEM PINNING! Rolagem 100% natural, transição rápida pelas abas
          if (!isDesktop) {
            scrollTriggerInstanceRef.current = null;
            return;
          }

          // NO DESKTOP: Timeline mestre vinculada à rolagem com hold real para cada estágio
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=2600",
              pin: pinSectionRef.current,
              pinSpacing: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self: globalThis.ScrollTrigger) => {
                const p = self.progress;
                let stage = 0;
                if (p < 0.35) {
                  stage = 0;
                } else if (p < 0.70) {
                  stage = 1;
                } else {
                  stage = 2;
                }
                setActiveStage(stage);

                if (pill) {
                  const percentTranslate = p * 200;
                  gsap.set(pill, { xPercent: percentTranslate });
                }
              },
            },
          });

          scrollTriggerInstanceRef.current = tl.scrollTrigger as ScrollTrigger;

          const dim1 = { width: 480, height: 440, borderRadius: 24, padding: "20px" };
          const dim2 = { width: 680, height: 440, borderRadius: 20, padding: "18px" };
          const dim3 = { width: 680, height: 460, borderRadius: 24, padding: "22px" };

          // Estado inicial Desktop explícito (Garante s1 100% visível)
          gsap.set(device, {
            width: dim1.width,
            height: dim1.height,
            borderRadius: dim1.borderRadius,
            padding: dim1.padding,
            boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.07), 0 0 1px rgba(0,0,0,0.1)",
          });
          gsap.set(s1, { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto" });
          gsap.set(s2, { opacity: 0, scale: 0.95, filter: "blur(6px)", pointerEvents: "none" });
          gsap.set(s3, { opacity: 0, scale: 0.95, filter: "blur(6px)", pointerEvents: "none" });
          gsap.set(topBar, { opacity: 0, y: -10, display: "none" });
          gsap.set(dock, { opacity: 0, y: 15, display: "none" });

          // 1. ESTÁGIO 1 (Ficar na mesma): Visível e com tempo de permanência real (0.0s até 1.2s)
          tl.addLabel("stage1", 0);

          // 2. TRANSIÇÃO 1 -> 2: Mudar (Morfose para a tela do Sistema Gambit) (1.2s até 2.4s)
          tl.addLabel("toStage2", 1.2);

          tl.to(
            device,
            {
              width: dim2.width,
              height: dim2.height,
              borderRadius: dim2.borderRadius,
              padding: dim2.padding,
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.12)",
              ease: "power2.inOut",
              duration: 1.2,
            },
            "toStage2"
          );

          tl.to(
            s1,
            {
              opacity: 0,
              scale: 0.95,
              filter: "blur(6px)",
              pointerEvents: "none",
              duration: 0.6,
              ease: "power2.inOut",
            },
            "toStage2"
          );

          tl.fromTo(
            topBar,
            { opacity: 0, y: -10, display: "none" },
            { opacity: 1, y: 0, display: "flex", duration: 0.6, ease: "power2.out" },
            "toStage2+=0.3"
          );

          tl.fromTo(
            s2,
            { opacity: 0, scale: 0.95, filter: "blur(6px)", pointerEvents: "none" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              duration: 0.7,
              ease: "power2.out",
            },
            "toStage2+=0.4"
          );

          tl.fromTo(
            dock,
            { opacity: 0, y: 15, display: "none" },
            {
              opacity: 1,
              y: 0,
              display: "flex",
              duration: 0.7,
              ease: "power2.out",
            },
            "toStage2+=0.4"
          );

          // 3. ESTÁGIO 2 (Mudar & Estruturar): Visível com permanência real (2.4s até 3.6s)
          tl.addLabel("stage2", 2.4);

          // 4. TRANSIÇÃO 2 -> 3: Avançar (Morfose para painel financeiro / escala) (3.6s até 4.8s)
          tl.addLabel("toStage3", 3.6);

          tl.to(
            device,
            {
              width: dim3.width,
              height: dim3.height,
              borderRadius: dim3.borderRadius,
              padding: dim3.padding,
              boxShadow: "0 30px 70px -15px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0,0,0,0.12)",
              ease: "power2.inOut",
              duration: 1.2,
            },
            "toStage3"
          );

          tl.to(
            topBar,
            { opacity: 0, y: -6, duration: 0.4, ease: "power2.in" },
            "toStage3"
          );

          tl.to(
            s2,
            {
              opacity: 0,
              scale: 0.96,
              filter: "blur(6px)",
              pointerEvents: "none",
              duration: 0.5,
              ease: "power2.inOut",
            },
            "toStage3"
          );

          tl.to(
            dock,
            { y: 20, opacity: 0, duration: 0.4, ease: "power2.in" },
            "toStage3"
          );

          tl.fromTo(
            s3,
            { opacity: 0, scale: 1.04, filter: "blur(6px)", pointerEvents: "none" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              duration: 0.7,
              ease: "power2.out",
            },
            "toStage3+=0.4"
          );

          // 5. ESTÁGIO 3 (Avançar): Visível com permanência real até o final da seção (4.8s até 6.0s)
          tl.addLabel("stage3", 4.8);
          tl.to({}, { duration: 1.2 });
        }
      );

      return () => {
        mm.revert();
        if (tickerUpdate) {
          gsap.ticker.remove(tickerUpdate);
        }
        if (lenis) {
          lenis.destroy();
        }
        lenisInstanceRef.current = null;
        ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  // Troca no mobile (Instantânea e sem corte)
  const switchMobileStage = (targetIdx: number) => {
    setActiveStage(targetIdx);

    const s1 = stage1ContentRef.current;
    const s2 = stage2ContentRef.current;
    const s3 = stage3ContentRef.current;
    const pill = pillIndicatorRef.current;

    if (pill) {
      gsap.to(pill, {
        xPercent: targetIdx * 100,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (targetIdx === 0) {
      gsap.to(s1, { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto", duration: 0.3 });
      gsap.to(s2, { opacity: 0, scale: 0.96, filter: "blur(6px)", pointerEvents: "none", duration: 0.2 });
      gsap.to(s3, { opacity: 0, scale: 0.96, filter: "blur(6px)", pointerEvents: "none", duration: 0.2 });
    } else if (targetIdx === 1) {
      gsap.to(s1, { opacity: 0, scale: 0.96, filter: "blur(6px)", pointerEvents: "none", duration: 0.2 });
      gsap.to(s2, { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto", duration: 0.3 });
      gsap.to(s3, { opacity: 0, scale: 0.96, filter: "blur(6px)", pointerEvents: "none", duration: 0.2 });
    } else {
      gsap.to(s1, { opacity: 0, scale: 0.96, filter: "blur(6px)", pointerEvents: "none", duration: 0.2 });
      gsap.to(s2, { opacity: 0, scale: 0.96, filter: "blur(6px)", pointerEvents: "none", duration: 0.2 });
      gsap.to(s3, { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto", duration: 0.3 });
    }
  };

  const handleTabClick = (index: number) => {
    if (scrollTriggerInstanceRef.current) {
      const st = scrollTriggerInstanceRef.current;
      const progressMap = [0.08, 0.50, 0.92];
      const targetScroll = st.start + (st.end - st.start) * progressMap[index];

      if (lenisInstanceRef.current) {
        lenisInstanceRef.current.scrollTo(targetScroll, { duration: 0.9 });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
    } else {
      switchMobileStage(index);
    }
  };

  const current = STAGES[activeStage];

  return (
    <section
      id="decisao"
      ref={containerRef}
      className="relative w-full bg-white text-zinc-900 border-t border-zinc-200/70 overflow-hidden font-sans scroll-mt-24"
    >
      {/* Luz ambiente limpa e sutil em tons neutros */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-zinc-100 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-zinc-100 blur-[130px]"
        aria-hidden="true"
      />

      <div
        ref={pinSectionRef}
        className="w-full lg:h-screen lg:max-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-14 py-8 lg:py-6"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          
          {/* ============================================================== */}
          {/* 1. SELETOR DE ABAS ESTILO PILL MINIMALISTA                     */}
          {/* ============================================================== */}
          <div className="w-full max-w-lg mb-4">
            <div className="p-1.5 bg-zinc-100 border border-zinc-200/80 rounded-2xl relative flex items-center shadow-xs">
              <div
                ref={pillIndicatorRef}
                className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc((100%-12px)/3)] bg-white border border-zinc-200/90 rounded-xl shadow-xs pointer-events-none transition-shadow"
              />

              {STAGES.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => handleTabClick(idx)}
                  className={`relative z-10 flex-1 py-2 text-xs sm:text-sm font-medium tracking-tight rounded-xl transition-colors duration-200 text-center select-none ${
                    activeStage === idx
                      ? "text-zinc-900 font-semibold"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* 2. FRASE DIRETA E CONCISA (Sem textos longos para não poluir)  */}
          {/* ============================================================== */}
          <div className="w-full text-center px-4 my-2 min-h-[50px] flex items-center justify-center z-10">
            <p className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug max-w-xl transition-all duration-300">
              {current?.phrase}
            </p>
          </div>

          {/* ============================================================== */}
          {/* 3. PALCO DA ANIMAÇÃO: TOTALMENTE VISÍVEL E LIVRE               */}
          {/* ============================================================== */}
          {/* No mobile: Container leve 100% visível sem wrapper rígido      */}
          {/* No desktop: Frame com morphing cinematográfico                 */}
          <div className="w-full flex items-center justify-center relative min-h-[300px] sm:min-h-[340px] lg:min-h-[470px]">
            <div
              ref={deviceFrameRef}
              className="relative w-full max-w-[420px] lg:max-w-none bg-white lg:border lg:border-zinc-200/90 lg:shadow-xl rounded-2xl lg:rounded-3xl flex flex-col justify-between overflow-hidden"
              style={{
                minHeight: 280,
              }}
            >
              {/* Topbar exclusiva desktop no sistema Gambit */}
              <div
                ref={topBarRef}
                className="hidden lg:flex w-full items-center justify-between pb-2.5 pt-0.5 border-b border-zinc-200 px-1 opacity-0"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500 font-medium">
                  gambit://workspace-os
                </span>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>online</span>
                </div>
              </div>

              {/* ÁREA PRINCIPAL DAS ANIMAÇÕES */}
              <div className="relative flex-1 w-full h-full min-h-[260px] sm:min-h-[300px] overflow-hidden">
                
                {/* ----------------------------------------------------------- */}
                {/* 1. PAPÉIS ACUMULADOS & GARGALOS (SVG LIVRE)                 */}
                {/* ----------------------------------------------------------- */}
                <div
                  ref={stage1ContentRef}
                  className="absolute inset-0 flex flex-col justify-between py-1"
                >
                  <div className="flex items-center justify-between px-2 pb-1 border-b border-zinc-100">
                    <span className="text-[11px] font-mono font-bold text-rose-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      GARGALO OPERACIONAL
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      processos manuais
                    </span>
                  </div>

                  {/* Ilustração SVG de Pilhas de Papéis */}
                  <div className="relative flex-1 flex items-center justify-center py-1">
                    <svg
                      viewBox="0 0 340 180"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-h-48 select-none"
                    >
                      <defs>
                        <filter id="pShadow" x="-10%" y="-10%" width="130%" height="130%">
                          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.08" />
                        </filter>
                      </defs>

                      {/* Base mesa */}
                      <ellipse cx="170" cy="165" rx="140" ry="14" fill="#f4f4f5" />

                      {/* Pasta de Trás */}
                      <g transform="translate(60, 25) rotate(-8)">
                        <rect width="105" height="120" rx="5" fill="#e4e4e7" stroke="#d4d4d8" strokeWidth="1.5" />
                        <rect x="10" y="14" width="55" height="5" rx="2.5" fill="#a1a1aa" />
                        <rect x="10" y="26" width="80" height="3" rx="1.5" fill="#d4d4d8" />
                        <rect x="10" y="34" width="75" height="3" rx="1.5" fill="#d4d4d8" />
                        <rect x="10" y="42" width="65" height="3" rx="1.5" fill="#d4d4d8" />
                      </g>

                      {/* Relatório do Meio com Post-it */}
                      <g transform="translate(150, 20) rotate(7)" filter="url(#pShadow)">
                        <rect width="115" height="130" rx="5" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1.5" />
                        <rect x="12" y="16" width="45" height="6" rx="2" fill="#f43f5e" fillOpacity="0.4" />
                        <rect x="12" y="30" width="85" height="3" rx="1.5" fill="#e4e4e7" />
                        <rect x="12" y="38" width="80" height="3" rx="1.5" fill="#e4e4e7" />
                        <rect x="12" y="46" width="70" height="3" rx="1.5" fill="#e4e4e7" />
                        
                        {/* Post-it amarelo */}
                        <g transform="translate(55, 60) rotate(-10)">
                          <rect width="48" height="44" rx="3" fill="#fef08a" stroke="#fde047" strokeWidth="1" />
                          <line x1="6" y1="10" x2="40" y2="10" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
                          <line x1="6" y1="18" x2="35" y2="18" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
                          <text x="6" y="32" fill="#854d0e" fontSize="8" fontFamily="monospace" fontWeight="bold">URGENTE!</text>
                        </g>
                      </g>

                      {/* Nota fiscal Frente com Carimbo */}
                      <g transform="translate(95, 35) rotate(-2)" filter="url(#pShadow)">
                        <rect width="135" height="120" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                        <rect x="12" y="14" width="28" height="4" rx="2" fill="#64748b" />
                        <rect x="12" y="22" width="110" height="1" fill="#e2e8f0" />
                        
                        <rect x="12" y="30" width="110" height="12" rx="2" fill="#f8fafc" stroke="#f1f5f9" />
                        <line x1="16" y1="36" x2="60" y2="36" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                        <line x1="95" y1="36" x2="115" y2="36" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />

                        <rect x="12" y="46" width="110" height="12" rx="2" fill="#f8fafc" stroke="#f1f5f9" />
                        <line x1="16" y1="52" x2="50" y2="52" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                        <line x1="95" y1="52" x2="115" y2="52" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />

                        {/* Carimbo Pendente */}
                        <g transform="translate(60, 68) rotate(-12)">
                          <rect width="64" height="22" rx="3" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
                          <text x="6" y="15" fill="#be123c" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                            PENDENTE
                          </text>
                        </g>

                        {/* Clipe */}
                        <path d="M18 4 V18 C18 21 24 21 24 18 V6 C24 3 14 3 14 6 V20" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                      </g>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200/90 text-xs">
                    <span className="text-zinc-600">Tempo perdido com burocracia</span>
                    <span className="font-mono font-bold text-rose-600">~25h /semana</span>
                  </div>
                </div>

                {/* ----------------------------------------------------------- */}
                {/* 2. MUDAR (SISTEMAS GAMBIT & TELAS ENCAIXANDO)               */}
                {/* ----------------------------------------------------------- */}
                <div
                  ref={stage2ContentRef}
                  className="absolute inset-0 opacity-0 pointer-events-none flex flex-col justify-between py-1"
                >
                  <div className="flex items-center justify-between px-2 pb-1 border-b border-zinc-100">
                    <span className="text-[11px] font-mono font-bold text-amber-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-sm bg-amber-500" />
                      SISTEMA GAMBIT ATIVO
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                      100% Integrado
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2.5 my-auto py-1">
                    {/* Peças integradas */}
                    <div className="col-span-12 sm:col-span-7 p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="p-2 bg-white rounded-lg border border-amber-300 shadow-xs flex flex-col items-center justify-center text-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 text-amber-600 mb-1"
                          >
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <line x1="12" y1="18" x2="12.01" y2="18" />
                          </svg>
                          <span className="text-[10px] font-bold text-zinc-800">Mobile CRM</span>
                          <span className="text-[8px] font-mono text-emerald-600">Conectado</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-amber-300 shadow-xs flex flex-col items-center justify-center text-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 text-amber-500 mb-1"
                          >
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                          </svg>
                          <span className="text-[10px] font-bold text-zinc-800">IA & Flow</span>
                          <span className="text-[8px] font-mono text-emerald-600">Ativo</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-amber-300 shadow-xs flex flex-col items-center justify-center text-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 text-amber-600 mb-1"
                          >
                            <rect x="3" y="4" width="18" height="12" rx="2" />
                            <line x1="2" y1="20" x2="22" y2="20" />
                          </svg>
                          <span className="text-[10px] font-bold text-zinc-800">Site & Web</span>
                          <span className="text-[8px] font-mono text-emerald-600">Sincronizado</span>
                        </div>
                      </div>

                      <div className="mt-2 p-1.5 rounded-lg bg-zinc-900 text-white flex items-center justify-between text-[10px] font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Pipeline Automatizado</span>
                        </span>
                        <span className="text-zinc-400">0 retrabalho</span>
                      </div>
                    </div>

                    {/* Telas Responsivas */}
                    <div className="col-span-12 sm:col-span-5 p-3 rounded-xl bg-zinc-900 text-white flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="p-1.5 rounded bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-200 flex items-center gap-1.5">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-3.5 h-3.5 text-zinc-400"
                            >
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                              <line x1="12" y1="18" x2="12.01" y2="18" />
                            </svg>
                            App Mobile
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400">Pronto</span>
                        </div>
                        <div className="p-1.5 rounded bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-200 flex items-center gap-1.5">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-3.5 h-3.5 text-zinc-400"
                            >
                              <rect x="2" y="3" width="20" height="14" rx="2" />
                              <line x1="8" y1="21" x2="16" y2="21" />
                              <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                            Web Dashboard
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400">Ao Vivo</span>
                        </div>
                      </div>
                      <div className="text-[9px] text-amber-300 font-mono pt-1 text-right">
                        ✓ Sem gargalos manuais
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex justify-center w-full pt-1">
                    <div
                      ref={dockRef}
                      className="w-full max-w-[200px] h-9 px-3 bg-zinc-100/90 border border-zinc-200/90 rounded-xl flex items-center justify-around shadow-xs"
                    >
                      {[true, false, false, false].map((active, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            active ? "bg-zinc-900 text-white" : "bg-white text-zinc-400"
                          }`}
                        >
                          <span className="w-1 h-1 rounded-full bg-current" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------------- */}
                {/* 3. AVANÇAR (CIFRÃO CRESCENDO & MINI DASHBOARD)              */}
                {/* ----------------------------------------------------------- */}
                <div
                  ref={stage3ContentRef}
                  className="absolute inset-0 opacity-0 pointer-events-none flex flex-col justify-between py-1"
                >
                  <div className="flex items-center justify-between px-2 pb-1 border-b border-zinc-100">
                    <span className="text-[11px] font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      ESCALA & FATURAMENTO
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      R$ EM ALTA
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2.5 my-auto py-1">
                    {/* Card Cifrão */}
                    <div className="col-span-12 sm:col-span-5 p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 via-zinc-50 to-white border border-emerald-300 shadow-xs flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-semibold text-zinc-600">RECEITA ATIVA</span>
                        <span className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-sm shadow-xs animate-bounce">
                          $
                        </span>
                      </div>
                      <div className="my-1">
                        <div className="text-2xl font-black font-serif text-emerald-950">
                          R$ 148.500
                        </div>
                        <div className="text-[10px] text-emerald-700 font-mono font-semibold">
                          ▲ +38.2% este mês
                        </div>
                      </div>
                      <div className="text-[9px] font-mono text-zinc-500">
                        Fluxo contínuo no caixa
                      </div>
                    </div>

                    {/* Mini Dashboard de Barras */}
                    <div className="col-span-12 sm:col-span-7 p-3 rounded-xl bg-zinc-50 border border-zinc-200/90 flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-zinc-200/70 pb-1">
                        <span className="text-[10px] font-semibold text-zinc-800">Tração Contínua</span>
                        <span className="text-[9px] font-mono text-emerald-600 font-bold">+240%</span>
                      </div>

                      <div className="flex items-end gap-1.5 h-14 pt-2">
                        {[20, 30, 42, 55, 68, 78, 88, 100].map((val, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xs"
                            style={{ height: `${val}%` }}
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-zinc-200/70 text-[9px] font-mono">
                        <div>
                          <span className="text-zinc-400 block text-[8px]">CAC</span>
                          <span className="font-bold text-zinc-900">-45%</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[8px]">LTV</span>
                          <span className="font-bold text-emerald-600">3.8x</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200/90 text-xs">
                    <span className="text-zinc-600">Operação previsível e escalável</span>
                    <span className="font-semibold text-emerald-700 font-mono">100% no controle</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 4. BOTÃO CTA CENTRALIZADO LOGO ABAIXO DA ANIMAÇÃO              */}
          {/* ============================================================== */}
          <div className="w-full flex justify-center mt-5 sm:mt-6 z-20 relative">
            <a
              href="#contato"
              className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm sm:text-base font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Quero evoluir
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
