"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";

const navLinks = [
  { href: "/#decisao", label: "A decisão" },
  { href: "/#produtos", label: "Produtos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/blog", label: "Blog" },
  { href: "/#contato", label: "Contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out pointer-events-none ${
        scrolled ? "pt-3 sm:pt-4" : "pt-0"
      }`}
    >
      <div
        className={`pointer-events-auto mx-auto transition-all duration-300 ease-out ${
          scrolled ? "max-w-4xl px-3 sm:px-4" : "max-w-full px-0"
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
            <Link
              href="/"
              aria-label="Gambit — início"
              className="flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    {link.label}
                  </Link>
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

        {menuOpen && (
          <div
            className={`mt-2 overflow-hidden border border-zinc-200/80 bg-white/95 backdrop-blur-md transition-all md:hidden ${
              scrolled ? "rounded-2xl shadow-xl shadow-zinc-900/5" : "border-t"
            }`}
          >
            <ul className="p-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
