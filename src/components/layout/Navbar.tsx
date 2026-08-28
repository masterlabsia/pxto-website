"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navigation, cta } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Client leaf: it owns the mobile menu state and nothing else.
 *
 * PRD 10.1: five items plus the CTA, no mega menu, the four solutions are not
 * exposed as a dropdown. Height stays inside the 64 to 72px band.
 * The CTA remains reachable on mobile without opening the menu.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-ground/95 backdrop-blur-none">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Link
            href="/"
            aria-label="PXTO, página inicial"
            className="inline-flex items-center transition-opacity duration-fast hover:opacity-80"
          >
            <Logo decorative className="h-10 w-10" />
          </Link>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        // py-2 lifts the target past the 24px minimum (WCAG 2.5.8).
                        "inline-block py-2 text-sm transition-colors duration-fast",
                        active ? "text-ink" : "text-ink-secondary hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Visible at every width: the primary CTA must never require
                opening the menu (DESIGN_SYSTEM Part II, Navbar). */}
            <div>
              <ButtonLink href={cta.primary.href} size="md" analyticsLocation="navbar">
                {cta.primary.label}
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="inline-flex h-10 items-center rounded-sm px-3 font-mono text-2xs uppercase text-ink md:hidden"
            >
              {open ? "Fechar" : "Menu"}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div
          id="menu-mobile"
          ref={panelRef}
          className="border-t border-rule bg-ground md:hidden"
        >
          <Container width="wide">
            <ul className="flex flex-col py-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-base text-ink"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="py-3 sm:hidden">
                <ButtonLink href={cta.primary.href} size="md" analyticsLocation="navbar-mobile">
                  {cta.primary.label}
                </ButtonLink>
              </li>
            </ul>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
