import Image from "next/image";
import { ContactForm } from "./components/contact-form";
import { PartnerCarousel } from "./components/partner-carousel";
import { Reveal } from "./components/reveal";

const navLinks = [
  { href: "#decisao", label: "A decisão" },
  { href: "#produtos", label: "Produtos" },
  { href: "#contato", label: "Contato" },
];

const products = [
  {
    title: "SEO & Tráfego",
    description: "Sua empresa encontrada quando alguém procura pelo que você faz.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Social Media",
    description: "Presença consistente que transforma seguidores em clientes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M4 4h16v12H7l-3 3z" strokeLinejoin="round" />
        <path d="M8 9h8M8 13h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Landing Pages",
    description: "Páginas claras que convertem visitantes em contatos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 6h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Automação",
    description: "Processos que funcionam sozinhos enquanto você foca no negócio.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 3v4m0 10v4M3 12h4m10 0h4" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" />
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
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a
            href="#inicio"
            className="load-reveal inline-flex items-center"
            aria-label="Gambit"
          >
            <Image
              src="/gambit_logo.png"
              alt="Gambit"
              width={128}
              height={36}
              priority
              className="h-auto w-auto"
            />
          </a>
          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-full px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              className="ml-2 inline-flex h-10 min-h-10 items-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Fale conosco
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section
          id="inicio"
          className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-32"
        >
          <p className="load-reveal rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-600">
            Estratégias digitais para evoluir seu negócio
          </p>
          <h1 className="mt-8 w-full" aria-label="Gambit">
            <svg
              viewBox="0 0 400 92"
              className="mx-auto w-full max-w-md"
              role="img"
              aria-hidden="true"
            >
              <defs>
                <clipPath id="gambit-reveal">
                  <rect x="55" y="0" width="290" height="92" className="wordmark-mask" />
                </clipPath>
              </defs>
              <text
                className="wordmark-text"
                x="200"
                y="66"
                fontSize="72"
                fontWeight="600"
                textAnchor="middle"
                clipPath="url(#gambit-reveal)"
              >
                Gambit
              </text>
              <circle className="wordmark-pen" cx="55" cy="79" r="3" fill="#101010" />
              <line
                className="wordmark-line"
                x1="55"
                y1="83"
                x2="345"
                y2="83"
                stroke="#101010"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={290}
              />
            </svg>
          </h1>
          <p
            className="load-reveal mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl"
            style={{ animationDelay: "0.7s" }}
          >
            Ficar na mesma é ficar para trás. Mudar e avançar é a sua próxima
            jogada.
          </p>
          <div
            className="load-reveal mt-10 flex flex-col gap-3 sm:flex-row"
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
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, index) => (
                <Reveal key={product.title} delay={index * 100}>
                  <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
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
          id="contato"
          className="scroll-mt-24 border-t border-zinc-200/70 bg-zinc-50"
        >
          <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:py-28 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Contato
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Entre em contato
              </h2>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-zinc-600">
                Conte sobre o seu negócio e receba um caminho claro para
                evoluir. Sem enrolação, sem jargão.
              </p>
              <div className="mt-8 flex flex-col gap-2 text-sm">
                <a
                  href="mailto:contato@gambit.digital"
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-zinc-900 transition-colors hover:bg-zinc-200/70"
                >
                  contato@gambit.digital
                </a>
                <a
                  href="#contato"
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-zinc-900 transition-colors hover:bg-zinc-200/70"
                >
                  @gambit.digital
                </a>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200/70">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-zinc-500 sm:flex-row">
          <a href="#inicio" className="font-serif text-xl font-semibold text-zinc-900">
            Gambit
          </a>
          <p>© 2026 Gambit. Estratégias digitais para evoluir seu negócio.</p>
        </div>
      </footer>
    </div>
  );
}
