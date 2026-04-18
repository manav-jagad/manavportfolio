"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const isMenuVisible = menuOpen && menuPath === pathname;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const openMenu = () => {
    setMenuPath(pathname);
    setMenuOpen(true);
  };

  const toggleMenu = () => {
    if (isMenuVisible) {
      setMenuOpen(false);
      return;
    }

    openMenu();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <nav className="surface-card surface-card-static px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--line-strong)] bg-[radial-gradient(circle_at_30%_30%,rgba(242,192,120,0.36),rgba(255,255,255,0.08)_58%,rgba(9,14,29,0.9))] text-sm font-semibold tracking-[0.28em] text-white transition duration-300 group-hover:scale-105 group-hover:border-[rgba(242,192,120,0.5)]">
                MS
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.72rem] uppercase tracking-[0.32em] text-[var(--teal)] transition duration-300 group-hover:text-[var(--accent)]">
                  Manav
                </p>
                <p className="truncate text-sm text-white/86 transition duration-300 group-hover:text-white">
                  Design and development studio
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 lg:flex">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-[color:var(--muted)] hover:-translate-y-0.5 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/#process"
                className="px-3 py-2 text-sm text-[color:var(--muted)] transition hover:-translate-y-0.5 hover:text-white"
              >
                Process
              </Link>
              <Link href="/contact" className="button-primary">
                Start a project
              </Link>
            </div>

            <button
              type="button"
              aria-expanded={isMenuVisible}
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-[var(--line-strong)] lg:hidden"
            >
              <span className="flex flex-col gap-1.5">
                <span
                  className={`h-0.5 w-5 rounded-full bg-current transition ${
                    isMenuVisible ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 rounded-full bg-current transition ${
                    isMenuVisible ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 rounded-full bg-current transition ${
                    isMenuVisible ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          <div
            className={`grid overflow-hidden transition-all duration-300 lg:hidden ${
              isMenuVisible
                ? "mt-5 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-white/10 pt-5">
                <div className="grid gap-3">
                  {navLinks.map((link) => {
                    const active = isActive(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={`rounded-2xl px-4 py-3 text-sm transition ${
                          active
                            ? "bg-white/10 text-white"
                            : "text-[color:var(--muted)] hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="button-primary mt-2"
                  >
                    Start a project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
