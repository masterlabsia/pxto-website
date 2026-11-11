import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { navigation, site, contactChannels } from "@/content/site";
import { solutions } from "@/content/solutions";

/**
 * Rodapé de informação, no espírito do rodapé da Apple: colunas com títulos
 * pequenos e links discretos, e uma barra legal embaixo separada por uma linha.
 * Largura total da página, com 20px de margem, como o Hero (decidido em
 * 11/11/2026), dentro de um cartão arredondado.
 *
 * O que NÃO entra, porque não existe e não pode ser inventado: links de política
 * de privacidade e termos (o texto está bloqueado, `CLAUDE.md` Estado atual),
 * seletor de país, redes sociais e qualquer selo. A coluna de contato é omitida
 * por inteiro enquanto os canais não existem, e não renderizada vazia.
 *
 * No social proof of any kind, no placeholder social icons, no version stamp
 * (POSITIONING 13.6).
 */
const linkClass =
  "inline-block py-1.5 text-sm text-ink-secondary transition-colors duration-fast hover:text-ink hover:underline hover:underline-offset-4";

export function Footer() {
  const hasChannels = Boolean(contactChannels.email ?? contactChannels.phone);

  return (
    <footer className="px-4 pb-5 pt-2 md:px-5">
      <div className="rounded-xl border border-rule bg-ground-subtle p-6 md:p-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo label={site.name} className="h-10 w-auto" />
            <p className="mt-5 max-w-xs text-sm text-ink-secondary">
              {site.descriptor}
            </p>
          </div>

          <nav aria-label="Soluções" className="md:col-span-2 md:col-start-6">
            <p className="text-sm font-medium text-ink">Soluções</p>
            <ul className="mt-3">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solucoes/${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navegação" className="md:col-span-2">
            <p className="text-sm font-medium text-ink">Navegação</p>
            <ul className="mt-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {hasChannels ? (
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-ink">Contato</p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
                {contactChannels.email ? <li>{contactChannels.email}</li> : null}
                {contactChannels.phone ? <li>{contactChannels.phone}</li> : null}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-12 border-t border-rule pt-6">
          <p className="text-xs text-ink-secondary">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
