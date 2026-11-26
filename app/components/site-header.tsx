import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-end px-6 sm:px-12">
        <nav aria-label="Navegação principal">
          <Link
            href="/blog"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 transition-colors duration-200 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
