"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PartnerCarousel } from "./components/partner-carousel";
import { Logo } from "./components/logo";
import { Reveal } from "./components/reveal";

const navLinks = [
  { href: "#decisao", label: "A decisão" },
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

const products = [
  {
    title: "Consultoria, integração e implementação do Claude e outras ferramentas de IA",
    description: "Automação inteligente e soluções com IA sob medida para otimizar os processos da sua empresa.",
    icon: (
      <div className="flex items-center -space-x-2">
        {/* Claude */}
        <span
          title="Anthropic Claude"
          className="relative z-30 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 p-1.5 text-[#d97706] ring-2 ring-white shadow-xs"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
          </svg>
        </span>
        {/* OpenAI GPT */}
        <span
          title="OpenAI ChatGPT"
          className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1.5 text-zinc-700 ring-2 ring-white shadow-xs border border-zinc-200/80"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
          </svg>
        </span>
        {/* Google Gemini */}
        <span
          title="Google Gemini"
          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1.5 ring-2 ring-white shadow-xs border border-zinc-200/80"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <defs>
              <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1ba1e3" />
                <stop offset="50%" stopColor="#5b7cf6" />
                <stop offset="100%" stopColor="#9b51e0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#geminiGradient)"
              d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"
            />
          </svg>
        </span>
      </div>
    ),
  },
  {
    title: "Retenha seus clientes",
    description: "Não importa o seu mercado: no fim, todo negócio é de pessoas para pessoas. Por isso, invista em práticas avançadas de CS e UX",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
        <line x1="9" y1="9.5" x2="9.01" y2="9.5" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="9.5" x2="15.01" y2="9.5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Tecnologia de verdade (sites e automação para seu negócio)",
    description: "Soluções claras que resolvem o seu problema, sem rodeios. Processos que funcionam sozinhos enquanto você foca no negócio.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 6h.01" strokeLinecap="round" />
      </svg>
    ),
  },
];

const pillars = [
  "Estratégia clara",
  "Execução rápida",
  "Resultado mensurável",
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out pointer-events-none ${
          scrolled ? "pt-3 sm:pt-4" : "pt-0"
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto transition-all duration-300 ease-out ${
            scrolled
              ? "max-w-4xl px-3 sm:px-4"
              : "max-w-full px-0"
          }`}
        >
          <div
            className={`transition-all duration-300 ease-out ${
              scrolled
                ? "rounded-full border border-zinc-200/80 bg-white/80 shadow-lg shadow-zinc-900/5 backdrop-blur-md"
                : "border-b border-zinc-200/70 bg-white/80 backdrop-blur-md"
            }`}
          >
            <nav
              className={`flex w-full items-center justify-between transition-all duration-300 ${
                scrolled
                  ? "h-14 px-4 sm:px-6"
                  : "h-16 px-6 sm:px-10 lg:px-16"
              }`}
            >
              <a
                href="#inicio"
                aria-label="Gambit — início"
                className="flex items-center"
                onClick={() => setMenuOpen(false)}
              >
                <Logo />
              </a>

              <ul className="hidden items-center gap-1 md:flex">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
              >
                {menuOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </nav>
          </div>

          {/* Mobile dropdown menu */}
          {menuOpen && (
            <div
              className={`mt-2 overflow-hidden border border-zinc-200/80 bg-white/95 backdrop-blur-md transition-all md:hidden ${
                scrolled ? "rounded-2xl shadow-xl shadow-zinc-900/5" : "border-t"
              }`}
            >
              <ul className="p-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <section
          id="inicio"
          className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-32"
        >

          <h1
            className="load-reveal mt-6 font-display text-8xl font-bold tracking-tight text-zinc-900 sm:text-9xl lg:text-[20rem]"
            style={{ animationDelay: "0.4s" }}
          >
            Gambit
          </h1>

          <p
            className="load-reveal mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg"
            style={{ animationDelay: "0.7s" }}
          >
            Sua próxima <em className="font-serif italic">jogada</em> começa
            aqui. Ficar na mesma é ficar para trás.
          </p>
          <div
            className="load-reveal mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.9s" }}
          >
            <a
              href="#contato"
              className="inline-flex h-12 min-h-12 items-center justify-center rounded-full bg-zinc-900 px-7 text-base font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Quero avançar
            </a>
            <a
              href="#produtos"
              className="inline-flex h-12 min-h-12 items-center justify-center rounded-full border border-zinc-300 px-7 text-base font-medium text-zinc-900 transition-colors hover:border-zinc-900 hover:bg-zinc-100"
            >
              Ver produtos
            </a>
          </div>
        </section>

        <section
          id="decisao"
          className="scroll-mt-24 border-t border-zinc-200/70 bg-zinc-50"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <Reveal>
              <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                A decisão
              </p>
              <h2 className="mx-auto mt-3 max-w-xl text-center font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Escolha ficar na mesma — ou mudar e avançar
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <Reveal>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-8 opacity-80">
                  <div>
                    <h3 className="font-serif text-2xl">Ficar na mesma</h3>
                    <p className="mt-3 text-zinc-600">
                      Mais do mesmo. Os mesmos processos, os mesmos resultados
                      e, ano após ano, mais distante do que os concorrentes
                      estão fazendo.
                    </p>
                  </div>
                  <ul className="mt-8 space-y-2 text-sm text-zinc-500">
                    <li>Sem novos clientes</li>
                    <li>Sem visibilidade digital</li>
                    <li>Sem plano para crescer</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="flex h-full flex-col justify-between rounded-2xl bg-zinc-900 p-8 text-white">
                  <div>
                    <h3 className="font-serif text-2xl">Evoluir</h3>
                    <p className="mt-3 text-zinc-300">
                      Um plano digital simples e executável: posicionar,
                      atrair, converter e medir — para crescer com
                      previsibilidade.
                    </p>
                  </div>
                  <div className="mt-8">
                    <ul className="space-y-2 text-sm text-zinc-300">
                      <li>Mais clientes chegando até você</li>
                      <li>Presença digital consistente</li>
                      <li>Decisões guiadas por dados</li>
                    </ul>
                    <a
                      href="#contato"
                      className="mt-8 inline-flex h-12 min-h-12 items-center justify-center rounded-full bg-white px-6 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
                    >
                      Quero evoluir
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="produtos" className="scroll-mt-24">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <Reveal>
              <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Produtos
              </p>
              <h2 className="mx-auto mt-3 max-w-xl text-center font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                O que a Gambit faz
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.title} delay={index * 100}>
                  <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md">
                    <div
                      className={`flex h-11 items-center rounded-xl ${
                        index === 0
                          ? "bg-transparent text-zinc-900 justify-start"
                          : index === 1
                          ? "w-11 justify-center bg-amber-100 text-amber-950"
                          : "w-11 justify-center bg-zinc-100 text-zinc-900"
                      }`}
                    >
                      {product.icon}
                    </div>
                    <h3 className="mt-5 font-serif text-xl">{product.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {product.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={150}>
              <ul className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-4 text-sm font-medium text-zinc-600 sm:flex-row sm:gap-10">
                {pillars.map((pillar) => (
                  <li key={pillar} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
                    {pillar}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <PartnerCarousel />

        <section
          id="sobre"
          className="scroll-mt-24 border-t border-zinc-200/70 bg-zinc-50"
        >
          <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-28 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
                <Image
                  src="/meig.jpg"
                  alt="Foto de Rafael Ruggieri"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Sobre
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Quem está por trás da Gambit
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                Ajudo empresas a darem o próximo passo: estratégia, presença
                digital e tecnologia trabalhando juntas para gerar crescimento
                real. Sem fórmula mágica — plano claro, execução rápida e
                resultado que dá para medir.
              </p>
              <p className="mt-6 font-serif text-xl font-semibold">
                Rafael Ruggieri
              </p>
              <p className="text-sm text-zinc-500">Fundador · Gambit</p>
            </Reveal>
          </div>
        </section>

        <section
          id="contato"
          className="scroll-mt-24 border-t border-zinc-200/70 bg-zinc-50"
        >
          <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Contato
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Entre em contato
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-600">
                Conte sobre o seu negócio e receba um caminho claro para evoluir.
                Sem enrolação, sem jargão.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://wa.me/5569992418704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 min-h-12 items-center justify-center gap-2.5 rounded-full bg-zinc-900 px-8 text-base font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-md"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-emerald-400"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3" />
                  </svg>
                  <span>Entrar em contato</span>
                </a>

                <a
                  href="mailto:rafaelruggieri.ti@gmail.com"
                  className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 text-base font-medium text-zinc-800 transition-colors hover:border-zinc-900 hover:bg-zinc-100"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4 text-zinc-500"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  <span>rafaelruggieri.ti@gmail.com</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200/70">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-zinc-500 sm:flex-row">
          <a href="#inicio" className="font-serif text-xl font-semibold text-zinc-900">
            Gambit
          </a>
          <p>
            © 2026 Gambit · Porto Velho, Rondônia. Estratégias digitais para
            evoluir seu negócio.
          </p>
        </div>
      </footer>
    </div>
  );
}
