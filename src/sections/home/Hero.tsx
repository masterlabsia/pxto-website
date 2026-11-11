import { ButtonLink } from "@/components/ui/Button";
import { GlowField } from "@/components/ui/GlowField";
import { hero } from "@/content/home";
import { cta } from "@/content/site";

/**
 * Composição do protótipo H612: um contêiner arredondado, com o título leve
 * centralizado e o botão de vidro. **Largura total da página**, com 20px de
 * margem lateral (decidido em 10/11/2026). É a única seção fora dos 1200px do
 * `Container wide`: o protótipo usa 1200px, mas aqui o Hero ocupa a borda inteira
 * para dar espaço à luz do mouse. O texto fica centralizado e em `max-w-5xl`. No protótipo o fundo do contêiner é uma
 * fotografia. Aqui é a luz do mouse (`GlowField`), porque o PXTO não tem foto
 * própria e a regra é só imagem real.
 *
 * Quatro elementos de texto no máximo: headline, subheadline, dois CTAs. Sem
 * eyebrow, sem faixa de confiança, sem indicador de rolagem.
 *
 * A headline tem três linhas porque o PRD 12 a fixa assim. Peso leve (300) e
 * 72px a partir de lg, o único uso de text-7xl no site.
 *
 * O secundário rola até Soluções, na própria página.
 *
 * ALTURA. A partir de `lg` o Hero não tem altura fixa: ele é `flex-1` dentro do bloco
 * `.pxto-first-screen` (page.tsx), que tem a altura da tela, e ocupa o que a faixa de
 * parcerias deixa. Assim o Hero e a faixa cabem juntos numa tela só, em cada computador.
 * O padding vertical é menor (`lg:py-10`) e, em janela baixa, o título desce um degrau da
 * escala (`.pxto-hero-title` em globals.css), para o conjunto caber em notebook.
 */
export function Hero() {
  return (
    <section className="px-4 pb-10 pt-5 md:px-5 lg:flex lg:flex-1 lg:flex-col lg:pb-6">
      <div className="relative isolate flex min-h-150 items-center justify-center overflow-hidden rounded-xl border border-rule bg-ground-subtle px-6 py-24 text-center lg:min-h-0 lg:flex-1 lg:py-10 pxto-hero-box">
        <GlowField />
        <div className="relative z-10 mx-auto max-w-5xl">
          <h1 className="pxto-hero-title text-4xl font-light tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {hero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-ink md:text-xl">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={cta.primary.href} size="lg" analyticsLocation="home-hero">
              {cta.primary.label}
            </ButtonLink>
            <ButtonLink href={cta.solutions.href} size="lg" variant="secondary" analyticsLocation="home-hero-secondary">
              {cta.solutions.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
