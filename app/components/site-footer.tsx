import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-zinc-500 sm:flex-row">
        <Link href="/" className="font-serif text-xl font-semibold text-zinc-900">
          Gambit
        </Link>
        <p>
          © 2026 Gambit · Porto Velho, Rondônia. Estratégias digitais para
          evoluir seu negócio.
        </p>
      </div>
    </footer>
  );
}
