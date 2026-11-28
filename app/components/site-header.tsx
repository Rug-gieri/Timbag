"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme-inverted") === "true";
    if (saved) {
      document.documentElement.classList.add("theme-inverted");
      setInverted(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !inverted;
    setInverted(next);
    document.documentElement.classList.toggle("theme-inverted", next);
    localStorage.setItem("theme-inverted", String(next));
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div
        className={`flex h-20 w-full items-center px-6 ${
          isBlog ? "justify-start" : "justify-end"
        }`}
      >
        {isBlog ? (
          <Link
            href="/"
            aria-label="Voltar para a página inicial"
            className="inline-flex items-center transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
          >
            <Image
              src="/chess_1-cropped.svg"
              alt="Gambit"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          </Link>
        ) : (
          <nav aria-label="Navegação principal" className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-xs font-mono uppercase tracking-widest text-zinc-500 transition-colors duration-200 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
            >
              Blog
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Inverter tema de cores"
              aria-pressed={inverted}
              title="Inverter tema de cores"
              className="inline-flex cursor-pointer items-center justify-center text-zinc-500 transition-colors duration-200 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18a9 9 0 0 0 0-18Z" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
