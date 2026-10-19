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
  description: string;
  points: string[];
}

const STAGES: StageConfig[] = [
  {
    id: "ficar-na-mesma",
    badge: "01 // O RISCO REAL",
    label: "Ficar na mesma",
    headline: "Mais do mesmo.",
    statement: "Ficar na mesma é ficar para trás.",
    description:
      "Os mesmos processos manuais, os mesmos gargalos e, ano após ano, mais distante do que seus concorrentes já estão automatizando.",
    points: ["Sem novos canais de clientes", "Processos dependentes de esforço braçal", "Sem previsibilidade ou dados reais"],
  },
  {
    id: "mudar",
    badge: "02 // A VIRADA",
    label: "Mudar & Estruturar",
    headline: "Construir a base certa.",
    statement: "Estratégia clara e presença digital consistente.",
    description:
      "Alinhar posicionamento, infraestrutura moderna e automação para eliminar atritos operacionais e atrair oportunidades qualificadas.",
    points: ["Interface ágil em todos os dispositivos", "Automação de rotinas e atendimento", "Arquitetura fluida e escalável"],
  },
  {
    id: "avancar",
    badge: "03 // ESCALAR",
    label: "Avançar",
    headline: "Crescer com previsibilidade.",
    statement: "Decisões guiadas por dados, tração contínua.",
    description:
      "Sua empresa operando em alto nível: captação ativa, métricas em tempo real e inteligência artificial aplicada onde gera lucro.",
    points: ["Clientes chegando até você", "Operação rodando no piloto automático", "Retorno mensurável sobre o investimento"],
  },
];

export default function DecisaoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const deviceFrameRef = useRef<HTMLDivElement>(null);

  // Sub-elementos do Mockup
  const notchRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const stage1ContentRef = useRef<HTMLDivElement>(null);
  const stage2ContentRef = useRef<HTMLDivElement>(null);
  const stage3ContentRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const pillIndicatorRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState<number>(0);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      // 1. Lenis Smooth Scroll
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const tickerUpdate = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerUpdate);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      // 2. Responsive & Reduced Motion via MatchMedia
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
          const s1 = stage1ContentRef.current;
          const s2 = stage2ContentRef.current;
          const s3 = stage3ContentRef.current;
          const dock = dockRef.current;
          const pill = pillIndicatorRef.current;

          if (!device || !containerRef.current || !pinSectionRef.current) return;

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

                if (pill) {
                  const percentTranslate = p * 200;
                  gsap.set(pill, { xPercent: percentTranslate });
                }
              },
            },
          });

          scrollTriggerInstanceRef.current = tl.scrollTrigger as ScrollTrigger;

          const dim1 = isDesktop
            ? { width: 320, height: 570, borderRadius: 42, padding: "16px" }
            : { width: 280, height: 460, borderRadius: 36, padding: "12px" };

          const dim2 = isDesktop
            ? { width: 680, height: 430, borderRadius: 20, padding: "18px" }
            : { width: 340, height: 460, borderRadius: 16, padding: "12px" };

          const dim3 = isDesktop
            ? { width: 780, height: 460, borderRadius: 16, padding: "20px" }
            : { width: 350, height: 470, borderRadius: 12, padding: "14px" };

          // Estado inicial (Ficar na mesma - Phone compacto e estagnado)
          tl.addLabel("stage1", 0);
          gsap.set(device, {
            width: dim1.width,
            height: dim1.height,
            borderRadius: dim1.borderRadius,
            padding: dim1.padding,
          });

          // Transição 1 -> 2: Mudar (Expansão para tela ampla de trabalho)
          tl.to(
            device,
            {
              width: dim2.width,
              height: dim2.height,
              borderRadius: dim2.borderRadius,
              padding: dim2.padding,
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.12)",
              ease: "power2.inOut",
              duration: 1.5,
            },
            "toStage2"
          );

          tl.to(
            notch,
            { scaleX: 0, opacity: 0, ease: "power2.inOut", duration: 0.8 },
            "toStage2"
          );

          tl.to(
            s1,
            {
              opacity: 0,
              scale: 0.95,
              filter: "blur(6px)",
              pointerEvents: "none",
              duration: 0.7,
              ease: "power2.inOut",
            },
            "toStage2"
          );

          tl.fromTo(
            topBar,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "toStage2+=0.3"
          );

          tl.fromTo(
            s2,
            { opacity: 0, scale: 0.95, filter: "blur(6px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              duration: 0.9,
              ease: "power2.out",
            },
            "toStage2+=0.3"
          );

          tl.to(
            dock,
            {
              maxWidth: isDesktop ? 360 : 250,
              paddingLeft: 20,
              paddingRight: 20,
              duration: 1.2,
              ease: "power2.inOut",
            },
            "toStage2"
          );

          tl.addLabel("stage2", 1.8);

          // Transição 2 -> 3: Avançar (Painel de controle / escala)
          tl.to(
            device,
            {
              width: dim3.width,
              height: dim3.height,
              borderRadius: dim3.borderRadius,
              padding: dim3.padding,
              boxShadow: "0 30px 70px -15px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0,0,0,0.12)",
              ease: "power2.inOut",
              duration: 1.5,
            },
            "toStage3"
          );

          tl.to(
            topBar,
            { opacity: 0, y: -6, duration: 0.5, ease: "power2.in" },
            "toStage3"
          );

          tl.to(
            s2,
            {
              opacity: 0,
              scale: 0.96,
              filter: "blur(6px)",
              pointerEvents: "none",
              duration: 0.6,
              ease: "power2.inOut",
            },
            "toStage3"
          );

          tl.to(
            dock,
            { y: 35, opacity: 0, duration: 0.6, ease: "power2.in" },
            "toStage3"
          );

          tl.fromTo(
            s3,
            { opacity: 0, scale: 1.04, filter: "blur(6px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              duration: 0.9,
              ease: "power2.out",
            },
            "toStage3+=0.3"
          );

          tl.addLabel("stage3", 3.2);
        }
      );

      return () => {
        mm.revert();
        gsap.ticker.remove(tickerUpdate);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

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

      {/* Conteúdo Fixo durante o Scroll Pinning */}
      <div
        ref={pinSectionRef}
        className="min-h-screen w-full flex items-center justify-center px-6 sm:px-8 lg:px-14 py-16"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ============================================================== */}
          {/* COLUNA ESQUERDA: Controles e Conteúdo dos Estágios             */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-7 z-10">
            {/* Seletor de Abas Estilo Pill Minimalista */}
            <div className="p-1.5 bg-zinc-100 border border-zinc-200/80 rounded-2xl relative flex items-center shadow-xs">
              {/* Indicador deslizante suave */}
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

            {/* Card com Descrição Dinâmica dos estágios */}
            <div className="relative min-h-[190px] p-6 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 backdrop-blur-xs">
              <div className="transition-all duration-300">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
                  {current.badge}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-zinc-900 mb-2">
                  {current.headline}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {current.description}
                </p>

                {/* Pontos de impacto */}
                <ul className="mt-4 pt-4 border-t border-zinc-200/80 space-y-2">
                  {current.points.map((pt, i) => (
                    <li
                      key={i}
                      className="text-xs font-medium text-zinc-700 flex items-center gap-2"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          activeStage === 0
                            ? "bg-zinc-400"
                            : activeStage === 1
                            ? "bg-zinc-700"
                            : "bg-emerald-600"
                        }`}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA de Ação */}
            <div>
              <a
                href="#contato"
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                Quero evoluir
              </a>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUNA DIREITA: Palco de Morphing Clean Branco                  */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[500px] lg:min-h-[620px]">
            {/* Contornos arquitetônicos sutis de fundo */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40"
              aria-hidden="true"
            >
              <div className="w-[96%] h-[96%] border border-dashed border-zinc-300/80 rounded-3xl" />
            </div>

            {/* O DISPOSITIVO QUE SOFRE O MORPHING CONTÍNUO */}
            <div
              ref={deviceFrameRef}
              className="relative bg-white border border-zinc-200/90 shadow-xl flex flex-col justify-between overflow-hidden transition-colors"
              style={{
                width: 320,
                height: 570,
                borderRadius: 42,
                boxShadow:
                  "0 20px 45px -10px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.12)",
              }}
            >
              {/* Brilho de borda superior */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

              {/* 1. MOLDURA TOPO: NOTCH OU TOPBAR */}
              <div className="relative z-20 flex flex-col items-center justify-center w-full">
                {/* Notch Mobile */}
                <div
                  ref={notchRef}
                  className="w-24 h-4 bg-zinc-900 rounded-full flex items-center justify-between px-2.5 mx-auto shadow-xs"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-950 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-600" />
                  </div>
                </div>

                {/* Topbar Desktop */}
                <div
                  ref={topBarRef}
                  className="w-full flex items-center justify-between pb-2.5 pt-0.5 border-b border-zinc-200 px-1 opacity-0"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    gambit://workflow-hub
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>ativo</span>
                  </div>
                </div>
              </div>

              {/* 2. CONTEÚDO MORPHING INTERNO */}
              <div className="relative flex-1 w-full h-full my-auto overflow-hidden">
                
                {/* ESTÁGIO 1: Ficar na mesma (Lento, estagnado, tela única) */}
                <div
                  ref={stage1ContentRef}
                  className="absolute inset-0 flex flex-col justify-between py-2 transition-transform duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-zinc-900">
                        STATUS ATUAL
                      </span>
                      <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        ESTAGNADO
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-xs space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-zinc-200 text-zinc-700 font-serif font-bold flex items-center justify-center text-sm">
                          01
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-zinc-900">
                            Processos Manuais
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            Sem integração de sistemas
                          </div>
                        </div>
                      </div>

                      <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-400 w-1/4 rounded-full" />
                      </div>

                      <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                        <span>Eficiência baixa</span>
                        <span>25% capacidade</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-between">
                      <span className="text-xs text-zinc-600">
                        Novos clientes este mês
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-800">
                        0
                      </span>
                    </div>
                  </div>
                </div>

                {/* ESTÁGIO 2: Mudar (Interface expandida, janelas lado a lado) */}
                <div
                  ref={stage2ContentRef}
                  className="absolute inset-0 opacity-0 pointer-events-none flex flex-col justify-between py-1"
                >
                  <div className="grid grid-cols-12 gap-3 h-[85%]">
                    <div className="col-span-7 p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
                        <span className="text-xs font-semibold text-zinc-900 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                          Atração & Conversão
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          +184%
                        </span>
                      </div>

                      <div className="flex items-end gap-1.5 h-24 pt-2">
                        {[25, 40, 32, 55, 68, 60, 75, 82, 70, 88, 95, 100].map(
                          (val, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-zinc-900 rounded-t-xs hover:bg-zinc-700 transition-colors"
                              style={{ height: `${val}%` }}
                            />
                          )
                        )}
                      </div>

                      <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-2 border-t border-zinc-200/80">
                        <span>Fluxo contínuo</span>
                        <span className="text-zinc-900 font-medium">Validado</span>
                      </div>
                    </div>

                    <div className="col-span-5 p-4 rounded-xl bg-zinc-900 text-white flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2 font-mono">
                        <span>automacao.ts</span>
                        <span className="text-emerald-400 text-[10px]">rodando</span>
                      </div>
                      <div className="space-y-1.5 text-[10px] font-mono text-zinc-400 py-1">
                        <p className="text-zinc-200">&gt; lead capturado</p>
                        <p>✓ qualificação via IA</p>
                        <p>✓ agendamento direto</p>
                        <p className="text-emerald-400">✓ notificação enviada</p>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        0 esforço braçal
                      </div>
                    </div>
                  </div>
                </div>

                {/* ESTÁGIO 3: Avançar (Painel de escala / visão executiva) */}
                <div
                  ref={stage3ContentRef}
                  className="absolute inset-0 opacity-0 pointer-events-none flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                        PAINEL EXECUTIVO
                      </div>
                      <div className="text-base font-serif font-bold text-zinc-900">
                        Operação Escalável & Inteligente
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
                      Alto Impacto
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-auto">
                    {[
                      {
                        label: "Tempo Poupado",
                        val: "18h /sem",
                        desc: "rotinas automatizadas",
                      },
                      {
                        label: "Conversão",
                        val: "3.4x",
                        desc: "presença digital sólida",
                      },
                      {
                        label: "Retorno",
                        val: "100%",
                        desc: "resultado mensurável",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/90 flex flex-col justify-between h-32"
                      >
                        <span className="text-[11px] uppercase font-mono text-zinc-500">
                          {item.label}
                        </span>
                        <div>
                          <div className="text-2xl font-bold font-serif text-zinc-900">
                            {item.val}
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono pt-2 border-t border-zinc-200">
                    <span>Crescimento com previsibilidade</span>
                    <span className="font-semibold text-zinc-900">
                      Gambit Engine
                    </span>
                  </div>
                </div>

              </div>

              {/* 3. DOCK MINIMALISTA */}
              <div className="relative z-20 flex justify-center w-full pt-2">
                <div
                  ref={dockRef}
                  className="w-full max-w-[200px] h-10 px-3 bg-zinc-100/90 border border-zinc-200/90 rounded-2xl flex items-center justify-around shadow-xs transition-all"
                >
                  {[true, false, false, false].map((active, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                        active
                          ? "bg-zinc-900 text-white"
                          : "bg-white border border-zinc-200/80 text-zinc-400"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
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
