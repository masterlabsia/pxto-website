import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navigation, site, contactChannels } from "@/content/site";
import { solutions } from "@/content/solutions";

/**
 * No social proof of any kind, no placeholder social icons, no version stamp
 * (POSITIONING 13.6). The contact column is omitted entirely while the
 * channels are undefined, rather than rendered empty.
 */
export function Footer() {
  const hasChannels = Boolean(contactChannels.email ?? contactChannels.phone);

  return (
    <footer className="border-t border-rule">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <Logo label={site.name} className="h-9" />
            <p className="mt-4 max-w-prose text-sm text-ink-secondary">
              {site.descriptor}
            </p>
          </div>

          <nav aria-label="Soluções" className="md:col-span-3">
            <p className="font-mono text-2xs uppercase text-ink-secondary">Soluções</p>
            <ul className="mt-4 space-y-2">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solucoes/${s.slug}`}
                    className="inline-block py-1 text-sm text-ink transition-colors duration-fast hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navegação" className="md:col-span-2">
            <p className="font-mono text-2xs uppercase text-ink-secondary">Navegação</p>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1 text-sm text-ink transition-colors duration-fast hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {hasChannels ? (
            <div className="md:col-span-2">
              <p className="font-mono text-2xs uppercase text-ink-secondary">Contato</p>
              <ul className="mt-4 space-y-2 text-sm text-ink">
                {contactChannels.email ? <li>{contactChannels.email}</li> : null}
                {contactChannels.phone ? <li>{contactChannels.phone}</li> : null}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="pxto-rule-top py-6">
          <p className="font-mono text-2xs uppercase text-ink-secondary">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
