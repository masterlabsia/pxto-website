"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
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
            className="font-mono text-base font-medium tracking-tight text-ink"
          >
            {/* BLOCKED: no logo exists. A wordmark in the utility face is the
                honest stand-in and is replaced when the mark is supplied. */}
            PXTO
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
                        "text-sm transition-colors duration-fast",
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
            <div className="hidden sm:block">
              <ButtonLink href={cta.primary.href} size="md">
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
                <ButtonLink href={cta.primary.href} size="md">
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
