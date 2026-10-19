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
      className={`sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <nav className="flex h-16 w-full items-center justify-between px-6 sm:px-10 lg:px-16">
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
                className="block rounded-full px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
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
          className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
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

      {menuOpen && (
        <div className="border-t border-zinc-200/70 bg-white md:hidden">
          <ul className="px-6 py-2 sm:px-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
