"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Registro oficial dos plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Configuração estruturada dos estágios
interface StageConfig {
  id: string;
  badge: string;
  label: string;
  title: string;
  description: string;
  specs: {
    resolution: string;
    focus: string;
    mode: string;
  };
}

const STAGES: StageConfig[] = [
  {
    id: "stage-mobile",
    badge: "01 // ULTRA-COMPACT",
    label: "Mobile / Phone",
    title: "Foco absoluto na palma da sua mão.",
    description:
      "Interface verticalizada e gestual com viewport imersivo. Uma janela ativa prioritária com stack minimizado e dock tátil na base para navegação ultra-rápida de polegar.",
    specs: {
      resolution: "390 × 844 px",
      focus: "Single-Task Focus",
      mode: "Touch & Haptics",
    },
  },
  {
    id: "stage-laptop",
    badge: "02 // MULTI-WINDOW WORKSPACE",
    label: "Laptop / Desktop",
    title: "Multitarefa espacial de alta performance.",
    description:
      "A moldura se expande horizontalmente em proporção widescreen de trabalho. Revela status bar superior, múltiplas janelas flutuantes com tiling dinâmico e dock completa de apps com analytics em tempo real.",
    specs: {
      resolution: "2560 × 1600 px",
      focus: "Split View & Floating",
      mode: "Keyboard & Precision",
    },
  },
  {
    id: "stage-tv",
    badge: "03 // BIG PICTURE THEATER",
    label: "Smart TV / Big Picture",
    title: "Painel cinematográfico para salas de comando.",
    description:
      "Expansão cinematográfica para telas grandes. Os elementos se reorganizam em cartões de alto contraste com tipografia ampliada, métricas globais e foco para controle remoto / D-pad a 3 metros de distância.",
    specs: {
      resolution: "3840 × 2160 (4K)",
      focus: "Remote & Glanceable",
      mode: "10ft UI & Telemetry",
    },
  },
];

export default function DeviceMorphShowcase() {
  // Contêiner principal para scoping do useGSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const deviceFrameRef = useRef<HTMLDivElement>(null);

  // Elementos do Mockup
  const notchRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const tvContentRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const pillIndicatorRef = useRef<HTMLDivElement>(null);

  // Estados reativos
  const [activeStage, setActiveStage] = useState<number>(0);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  // Hook oficial useGSAP com escopo automático e limpeza segura no React Strict Mode
  useGSAP(
    () => {
      // 1. Inicializa Smooth Scroll via Lenis
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Conecta Lenis ao GSAP Ticker para eliminar qualquer micro-trepidação no pinning
      const tickerUpdate = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerUpdate);
      gsap.ticker.lagSmoothing(0);

      lenis.on("scroll", ScrollTrigger.update);

      // 2. Responsividade e acessibilidade via gsap.matchMedia()
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          isReducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context: gsap.Context) => {
          const { isDesktop, isMobile, isReducedMotion } = (context.conditions || {}) as {
            isDesktop?: boolean;
            isMobile?: boolean;
            isReducedMotion?: boolean;
          };

          if (isReducedMotion) return;

          const device = deviceFrameRef.current;
          const notch = notchRef.current;
          const topBar = topBarRef.current;
          const mobileContent = mobileContentRef.current;
          const desktopContent = desktopContentRef.current;
          const tvContent = tvContentRef.current;
          const dock = dockRef.current;
          const pillIndicator = pillIndicatorRef.current;

          if (!device || !containerRef.current || !pinSectionRef.current) return;

          // Timeline mestre vinculada à rolagem
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: isMobile ? "+=1800" : "+=2600",
              pin: pinSectionRef.current,
              pinSpacing: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self: globalThis.ScrollTrigger) => {
                const p = self.progress;

                let stage = 0;
                if (p < 0.33) {
                  stage = 0;
                } else if (p < 0.75) {
                  stage = 1;
                } else {
                  stage = 2;
                }
                setActiveStage(stage);

                // Desliza a pill indicadora dinamicamente ao longo das 3 abas (0% a 200%)
                if (pillIndicator) {
                  const percentTranslate = p * 200;
                  gsap.set(pillIndicator, { xPercent: percentTranslate });
                }
              },
            },
          });

          scrollTriggerInstanceRef.current = tl.scrollTrigger as ScrollTrigger;

          // Dimensões interpoladas por tela
          const stage1Dim = isDesktop
            ? { width: 310, height: 580, borderRadius: 44, padding: "16px" }
            : { width: 280, height: 460, borderRadius: 36, padding: "12px" };

          const stage2Dim = isDesktop
            ? { width: 700, height: 440, borderRadius: 18, padding: "16px" }
            : { width: 340, height: 460, borderRadius: 16, padding: "12px" };

          const stage3Dim = isDesktop
            ? { width: 800, height: 480, borderRadius: 12, padding: "20px" }
            : { width: 350, height: 480, borderRadius: 10, padding: "14px" };

          // -------------------------------------------------------------
          // ESTÁGIO 1 -> ESTÁGIO 2 (Transição de Phone para Laptop)
          // -------------------------------------------------------------
          tl.addLabel("stage1", 0);

          // Estado inicial do frame (Phone)
          gsap.set(device, {
            width: stage1Dim.width,
            height: stage1Dim.height,
            borderRadius: stage1Dim.borderRadius,
            padding: stage1Dim.padding,
          });

          // 1. Morphing contínuo da moldura externa
          tl.to(
            device,
            {
              width: stage2Dim.width,
              height: stage2Dim.height,
              borderRadius: stage2Dim.borderRadius,
              padding: stage2Dim.padding,
              boxShadow:
                "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.12)",
              ease: "power2.inOut",
              duration: 1.5,
            },
            "toStage2"
          );

          // 2. Elementos internos: fade/collapse da notch e tela mobile
          tl.to(
            notch,
            { scaleX: 0, opacity: 0, ease: "power2.inOut", duration: 0.8 },
            "toStage2"
          );

          tl.to(
            mobileContent,
            {
              opacity: 0,
              scale: 0.94,
              filter: "blur(6px)",
              pointerEvents: "none",
              duration: 0.7,
              ease: "power2.inOut",
            },
            "toStage2"
          );

          // 3. Revelação da TopBar do sistema e janelas flutuantes
          tl.fromTo(
            topBar,
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "toStage2+=0.4"
          );

          tl.fromTo(
            desktopContent,
            { opacity: 0, scale: 0.94, filter: "blur(6px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              duration: 0.9,
              ease: "power2.out",
            },
            "toStage2+=0.4"
          );

          // 4. A Dock expande para o modo desktop
          tl.to(
            dock,
            {
              maxWidth: isDesktop ? 380 : 260,
              paddingLeft: 20,
              paddingRight: 20,
              duration: 1.2,
              ease: "power2.inOut",
            },
            "toStage2"
          );

          tl.addLabel("stage2", 1.8);

          // -------------------------------------------------------------
          // ESTÁGIO 2 -> ESTÁGIO 3 (Laptop para Smart TV Big Picture)
          // -------------------------------------------------------------
          tl.to(
            device,
            {
              width: stage3Dim.width,
              height: stage3Dim.height,
              borderRadius: stage3Dim.borderRadius,
              padding: stage3Dim.padding,
              boxShadow:
                "0 35px 80px -20px rgba(0, 0, 0, 0.85), 0 0 60px rgba(168, 85, 247, 0.16)",
              ease: "power2.inOut",
              duration: 1.5,
            },
            "toStage3"
          );

          tl.to(
            topBar,
            { opacity: 0, y: -8, duration: 0.6, ease: "power2.in" },
            "toStage3"
          );

          tl.to(
            desktopContent,
            {
              opacity: 0,
              scale: 0.95,
              filter: "blur(6px)",
              pointerEvents: "none",
              duration: 0.7,
              ease: "power2.inOut",
            },
            "toStage3"
          );

          tl.to(
            dock,
            { y: 40, opacity: 0, duration: 0.6, ease: "power2.in" },
            "toStage3"
          );

          tl.fromTo(
            tvContent,
            { opacity: 0, scale: 1.05, filter: "blur(8px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              duration: 1,
              ease: "power2.out",
            },
            "toStage3+=0.3"
          );

          tl.addLabel("stage3", 3.2);
        }
      );

      // Limpeza segura executada automaticamente pelo useGSAP ao desmontar
      return () => {
        mm.revert();
        gsap.ticker.remove(tickerUpdate);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
      };
    },
    { scope: containerRef } // Ativa escopo de seletores isolado no contêiner
  );

  // Rolagem suave com clique direto nas abas
  const handleTabClick = (index: number) => {
    if (!scrollTriggerInstanceRef.current) return;
    const st = scrollTriggerInstanceRef.current;
    const progressMap = [0, 0.5, 1];
    const targetScroll = st.start + (st.end - st.start) * progressMap[index];

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const currentData = STAGES[activeStage];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#090A0F] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden font-sans"
    >
      {/* Luz ambiente de fundo (Glows radiais decorativos) */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-purple-600/10 blur-[160px]"
        aria-hidden="true"
      />

      {/* Conteúdo Fixo durante o Scroll Pinning */}
      <div
        ref={pinSectionRef}
        className="min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-14 py-12"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ============================================================== */}
          {/* COLUNA ESQUERDA (~40%): Painel de Contexto, Títulos e Tabs     */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-7 z-10">
            {/* Tag / Eyebrow com Dot Pulsante */}
            <div className="inline-flex items-center gap-2.5 self-start px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-cyan-300">
                {currentData.badge}
              </span>
            </div>

            {/* Título de Impacto Fixo */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                Uma interface.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
                  Três telas.
                </span>{" "}
                Zero fricção.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
                Experiência contínua que transcende dimensões físicas através do
                motor de renderização adaptativo.
              </p>
            </div>

            {/* Seletor de Abas Estilo "Pill" com Indicador Deslizante */}
            <div className="p-1.5 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl relative flex items-center shadow-2xl">
              {/* O Pill Deslizante controlado via transformX no scroll */}
              <div
                ref={pillIndicatorRef}
                className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc((100%-12px)/3)] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-xl transition-shadow duration-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] pointer-events-none"
              />

              {STAGES.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => handleTabClick(idx)}
                  className={`relative z-10 flex-1 py-2.5 text-xs sm:text-sm font-medium tracking-wide rounded-xl transition-colors duration-200 text-center select-none ${
                    activeStage === idx
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Card com Descrição Dinâmica sincronizada */}
            <div className="relative min-h-[160px] p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-md">
              <div className="transition-all duration-500 transform translate-y-0 opacity-100">
                <h3 className="text-lg font-semibold text-white tracking-wide mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {currentData.title}
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {currentData.description}
                </p>

                {/* Grid de Especificações Rápidas */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2">
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-slate-500">
                      Resolução
                    </span>
                    <span className="text-xs font-mono text-slate-200 font-medium">
                      {currentData.specs.resolution}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-slate-500">
                      Arquitetura
                    </span>
                    <span className="text-xs font-mono text-cyan-300 font-medium">
                      {currentData.specs.focus}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-slate-500">
                      Controle
                    </span>
                    <span className="text-xs font-mono text-purple-300 font-medium">
                      {currentData.specs.mode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUNA DIREITA (~60%): Palco Central do Mockup com Morphing    */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[520px] lg:min-h-[640px]">
            {/* Grid de mira espacial ao fundo */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
              aria-hidden="true"
            >
              <div className="w-[95%] h-[95%] border border-dashed border-cyan-500/40 rounded-3xl" />
              <div className="absolute w-[75%] h-[75%] border border-white/20 rounded-2xl" />
            </div>

            {/* O ÚNICO CONTÊINER QUE SOFRE O MORPHING CONTÍNUO */}
            <div
              ref={deviceFrameRef}
              className="relative bg-[#0c0e17]/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
              style={{
                width: 310,
                height: 580,
                borderRadius: 44,
                boxShadow:
                  "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 35px rgba(56,189,248,0.1)",
              }}
            >
              {/* Brilho de reflexo de vidro na borda superior */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* ---------------------------------------------------------- */}
              {/* 1. MOLDURA TOPO: NOTCH (MOBILE) OU TOPBAR (LAPTOP)         */}
              {/* ---------------------------------------------------------- */}
              <div className="relative z-20 flex flex-col items-center justify-center w-full">
                {/* Dynamic Notch do Mobile */}
                <div
                  ref={notchRef}
                  className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 mx-auto shadow-md"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-900/80 border border-cyan-400/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-cyan-400" />
                  </div>
                </div>

                {/* Topbar do Laptop/Desktop */}
                <div
                  ref={topBarRef}
                  className="w-full flex items-center justify-between pb-3 pt-1 border-b border-white/[0.08] px-1 opacity-0"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="px-3 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-[11px] font-mono text-slate-300 tracking-wider">
                    workspace://quantum-core
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>99.98% OPS</span>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* 2. ÁREA INTERNA PRINCIPAL: MORPHING DE CONTEÚDO             */}
              {/* ---------------------------------------------------------- */}
              <div className="relative flex-1 w-full h-full my-auto overflow-hidden">
                
                {/* --- A. CONTEÚDO ESTÁGIO 1: MOBILE (Single-Task & Feed) --- */}
                <div
                  ref={mobileContentRef}
                  className="absolute inset-0 flex flex-col justify-between py-2 transition-transform duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-200">
                        TIMELINE ATIVA
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                        LIVE SYNC
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-lg space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-sm">
                          TG
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">
                            Operação Alpha
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Cluster São Paulo · 14ms
                          </div>
                        </div>
                      </div>

                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-3/4 rounded-full" />
                      </div>

                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>74.2% concluído</span>
                        <span>4.8 GB / 6.2 GB</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-xs text-slate-300">
                          Sessão sincronizada
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        agora
                      </span>
                    </div>
                  </div>
                </div>

                {/* --- B. CONTEÚDO ESTÁGIO 2: LAPTOP (Multi-Window Workspace) --- */}
                <div
                  ref={desktopContentRef}
                  className="absolute inset-0 opacity-0 pointer-events-none flex flex-col justify-between py-1"
                >
                  <div className="grid grid-cols-12 gap-3 h-[85%]">
                    <div className="col-span-7 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                        <span className="text-xs font-mono font-semibold text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Realtime Throughput
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          4.2k req/s
                        </span>
                      </div>

                      <div className="flex items-end gap-1.5 h-24 pt-2">
                        {[45, 62, 35, 88, 70, 95, 60, 80, 50, 92, 100, 78].map(
                          (val, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-400/80 rounded-t-sm transition-all duration-300 hover:to-purple-400"
                              style={{ height: `${val}%` }}
                            />
                          )
                        )}
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-2 border-t border-white/[0.06]">
                        <span>Edge CDN Latency: 8ms</span>
                        <span className="text-emerald-400 font-medium">Optimal</span>
                      </div>
                    </div>

                    <div className="col-span-5 p-4 rounded-xl bg-black/40 border border-white/[0.08] font-mono flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-300 border-b border-white/[0.06] pb-2">
                        <span>system.log</span>
                        <span className="text-[10px] text-purple-400">v3.4.1</span>
                      </div>

                      <div className="space-y-1.5 text-[10px] text-slate-400 overflow-hidden py-1">
                        <p className="text-cyan-300">
                          &gt; deploy --cluster global
                        </p>
                        <p className="text-slate-500">
                          [0.02s] Handshake OK (tls1.3)
                        </p>
                        <p className="text-emerald-400">
                          ✓ Syncing 3 nodes (US, EU, BR)
                        </p>
                        <p className="text-slate-400">
                          &gt; morphing: 60fps unlocked
                        </p>
                      </div>

                      <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04] text-[10px] text-slate-300 flex items-center justify-between">
                        <span>Cluster Status</span>
                        <span className="text-emerald-400 font-bold">READY</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- C. CONTEÚDO ESTÁGIO 3: SMART TV (Cinematic Big Picture) --- */}
                <div
                  ref={tvContentRef}
                  className="absolute inset-0 opacity-0 pointer-events-none flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center font-bold text-white text-xs">
                        TV
                      </div>
                      <div>
                        <div className="text-sm font-bold tracking-wider text-white">
                          MISSION CONTROL · 4K DISPLAY
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Navegação via D-Pad / Controle Remoto
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-mono font-semibold">
                        HDR 10+
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3.5 my-auto">
                    {[
                      {
                        title: "Performance",
                        val: "99.9%",
                        sub: "Zero frame drop",
                        gradient: "from-cyan-500/20 to-blue-500/5",
                        borderColor: "border-cyan-400/40",
                      },
                      {
                        title: "Distribuição",
                        val: "142 Edges",
                        sub: "Baixa latência",
                        gradient: "from-purple-500/20 to-pink-500/5",
                        borderColor: "border-purple-400/40",
                        focused: true,
                      },
                      {
                        title: "Segurança",
                        val: "E2E Encrypted",
                        sub: "Hardware token",
                        gradient: "from-emerald-500/20 to-teal-500/5",
                        borderColor: "border-emerald-400/40",
                      },
                    ].map((card, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl bg-gradient-to-b ${card.gradient} border ${
                          card.focused
                            ? "border-cyan-400 ring-2 ring-cyan-400/30 shadow-[0_0_25px_rgba(56,189,248,0.25)] scale-[1.03]"
                            : card.borderColor
                        } transition-all duration-300 flex flex-col justify-between h-36`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                            {card.title}
                          </span>
                          {card.focused && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                          )}
                        </div>
                        <div>
                          <div className="text-2xl font-black text-white tracking-tight">
                            {card.val}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {card.sub}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">
                          ENTER
                        </kbd>{" "}
                        Selecionar
                      </span>
                      <span className="flex items-center gap-1.5">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">
                          ESC
                        </kbd>{" "}
                        Voltar
                      </span>
                    </div>
                    <span className="text-cyan-400 font-medium">
                      Modo Cinema Ativado
                    </span>
                  </div>
                </div>

              </div>

              {/* ---------------------------------------------------------- */}
              {/* 3. DOCK FLUTUANTE DA BASE: MORPHING ADAPTATIVO             */}
              {/* ---------------------------------------------------------- */}
              <div className="relative z-20 flex justify-center w-full pt-2">
                <div
                  ref={dockRef}
                  className="w-full max-w-[210px] h-11 px-3 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-xl flex items-center justify-around shadow-2xl transition-all"
                >
                  {[
                    { color: "bg-cyan-400", active: true },
                    { color: "bg-purple-400", active: false },
                    { color: "bg-emerald-400", active: false },
                    { color: "bg-amber-400", active: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group relative flex flex-col items-center cursor-pointer"
                    >
                      <div
                        className={`w-6 h-6 rounded-lg ${
                          item.active
                            ? "bg-cyan-500/30 border border-cyan-400 text-cyan-200"
                            : "bg-white/[0.08] border border-white/10 text-slate-400"
                        } flex items-center justify-center transition-all duration-200 group-hover:scale-110`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${item.color} opacity-80`}
                        />
                      </div>
                      {item.active && (
                        <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-cyan-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
