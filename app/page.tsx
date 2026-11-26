import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { KnightToGambitMorph } from "./components/knight-to-gambit-morph";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-between bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <SiteHeader />

      <main className="flex flex-1 flex-col justify-center">
        <section
          aria-label="Gambit — Metamorfose Cavalo e Palavra"
          className="relative isolate mx-auto flex w-full flex-1 flex-col items-center justify-center text-center"
        >
          <KnightToGambitMorph />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
