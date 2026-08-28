import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { TextLink, ArrowLink } from "@/components/ui/TextLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { DefinitionList } from "@/components/content/DefinitionList";
import { ContactForm } from "@/components/form/ContactForm";
import { CTA } from "@/components/ui/CTA";
import { solutions } from "@/content/solutions";
import type { Project } from "@/content/schemas";

/**
 * Internal design system reference. Not a site page.
 *
 * noindex, and excluded from the sitemap. It exists so the system can be
 * reviewed as a whole rather than inferred from the pages that consume it.
 */
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

/**
 * Neutral component-gallery data. This is placeholder UI text for a component
 * demo, not project content: no client, no result, no claim. Real projects are
 * never previewed here, because neither has disclosure clearance.
 */
const demoProject: Project = {
  slug: "exemplo",
  title: "Título do projeto",
  category: "Categoria técnica",
  solutions: ["software"],
  summary:
    "Resumo do projeto em uma ou duas frases, começando pelo problema que ele resolveu e não pela tecnologia utilizada.",
  problem: "Bloco descritivo de exemplo.",
  coverImage: {
    src: "/images/placeholder.png",
    alt: "Exemplo de imagem de capa de projeto.",
    width: 1600,
    height: 1200,
  },
  published: true,
  featured: false,
};

const colorTokens = [
  ["ground", "bg-ground"],
  ["ground-subtle", "bg-ground-subtle"],
  ["surface", "bg-surface"],
  ["rule", "bg-rule"],
  ["rule-strong", "bg-rule-strong"],
  ["ink-secondary", "bg-ink-secondary"],
  ["ink", "bg-ink"],
  ["accent", "bg-accent"],
  ["success", "bg-success"],
  ["danger", "bg-danger"],
] as const;

const typeScale = [
  ["text-6xl", "text-6xl", "56"],
  ["text-5xl", "text-5xl", "48"],
  ["text-4xl", "text-4xl", "38"],
  ["text-3xl", "text-3xl", "30"],
  ["text-2xl", "text-2xl", "24"],
  ["text-xl", "text-xl", "20"],
  ["text-lg", "text-lg", "18"],
  ["text-base", "text-base", "16"],
  ["text-sm", "text-sm", "14"],
  ["text-xs", "text-xs", "12"],
  ["text-2xs", "text-2xs", "11"],
] as const;

const spacing = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32] as const;

function Block({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pxto-rule-top py-10 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 className="font-mono text-2xs uppercase text-ink-secondary">{title}</h2>
          {note ? (
            <p className="mt-2 max-w-prose text-xs text-ink-secondary">{note}</p>
          ) : null}
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <Container width="wide">
        <div className="py-12 md:py-16">
          <Heading level={1} size="display">
            Design System
          </Heading>
          <p className="mt-4 max-w-prose text-base text-ink-secondary">
            Referência interna. Todos os valores de cor e tipografia são
            candidatos e serão substituídos quando a marca for definida.
          </p>
        </div>

        <Block title="Cor" note="Tokens semânticos. Nenhum componente lê um valor bruto.">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {colorTokens.map(([name, cls]) => (
              <div key={name}>
                <div className={`h-16 w-full border border-rule ${cls}`} />
                <p className="mt-2 font-mono text-2xs uppercase text-ink-secondary">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Tipografia" note="Escala de 11 passos. Título máximo 3,5x o corpo.">
          <div className="space-y-3">
            {typeScale.map(([name, cls, px]) => (
              <div key={name} className="flex items-baseline gap-6">
                <span className="w-24 shrink-0 font-mono text-2xs uppercase text-ink-secondary">
                  {name} / {px}
                </span>
                <span className={`${cls} truncate font-semibold text-ink`}>
                  Conectamos sistemas
                </span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Espaçamento" note="Base 4px. Todo espaço vem da escala.">
          <div className="flex flex-wrap items-end gap-3">
            {spacing.map((n) => (
              <div key={n} className="flex flex-col items-center gap-2">
                <div
                  className="bg-accent"
                  style={{ width: n * 4, height: n * 4 }}
                />
                <span className="font-mono text-2xs text-ink-secondary">{n}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Raio" note="Estrutura reta, interação suavizada, nada arredondado.">
          <div className="flex flex-wrap gap-6">
            {[
              ["radius-none", "rounded-none"],
              ["radius-sm", "rounded-sm"],
              ["radius-md", "rounded-md"],
            ].map(([name, cls]) => (
              <div key={name}>
                <div className={`h-16 w-24 border border-rule-strong bg-ground-subtle ${cls}`} />
                <p className="mt-2 font-mono text-2xs uppercase text-ink-secondary">{name}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Button" note="Três variantes, dois tamanhos. Rótulo sempre em uma linha.">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">Fale com a PXTO</Button>
              <Button size="lg" variant="secondary">Ver projetos</Button>
              <Button size="lg" variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Fale com a PXTO</Button>
              <Button variant="secondary">Ver projetos</Button>
              <Button disabled>Desabilitado</Button>
            </div>
          </div>
        </Block>

        <Block title="Link">
          <div className="space-y-4">
            <p className="text-base text-ink">
              Texto corrido com um <TextLink href="/design-system">link inline</TextLink> dentro
              da frase.
            </p>
            <ArrowLink href="/design-system">Ver integrações</ArrowLink>
          </div>
        </Block>

        <Block title="Badge" note="Somente texto. Sem preenchimento, sem ponto de status.">
          <div className="flex flex-wrap gap-2">
            <Badge>Integração</Badge>
            <Badge>Automação</Badge>
            <Badge>Software</Badge>
            <Badge>Site</Badge>
          </div>
        </Block>

        <Block title="Card" note="Somente onde a elevação comunica hierarquia real.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-medium text-ink">Bordered</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Borda define o limite. Nunca sombra.
              </p>
            </Card>
            <Card tone="subtle">
              <h3 className="text-lg font-medium text-ink">Subtle</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Mudança de plano em vez de elevação.
              </p>
            </Card>
          </div>
        </Block>

        <Block title="ServiceCard" note="As quatro instâncias são visualmente idênticas.">
          <ul className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <ServiceCard key={s.slug} solution={s} />
            ))}
          </ul>
        </Block>

        <Block
          title="ProjectCard"
          note="Dados neutros de demonstração. Nenhum projeto real é pré-visualizado aqui: nenhum tem liberação."
        >
          <div className="max-w-md">
            <ProjectCard project={demoProject} />
          </div>
        </Block>

        <Block title="ImageSlot" note="Espaço reservado honesto enquanto não há imagem liberada.">
          <div className="max-w-md">
            <ImageSlot ratio="16 / 11" label="Imagem de exemplo. 1600x1100." />
          </div>
        </Block>

        <Block title="DefinitionList" note="A assinatura do sistema: o termo definido.">
          <DefinitionList
            items={[
              { term: "Sistemas desconectados", description: "Duas ferramentas guardam a mesma informação." },
              { term: "Processos manuais", description: "Trabalho que só existe porque nada se conecta." },
            ]}
          />
        </Block>

        <Block
          title="Formulário"
          note="Todos os estados. O envio reporta que o destino ainda não está configurado, em vez de simular sucesso."
        >
          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </Block>
      </Container>

      <div className="mt-16">
        <CTA
          headingId="ds-cta"
          heading="Descreva o problema. A solução é o nosso trabalho."
          body="Componente CTA reutilizável. Uma única ação primária, sempre depois do argumento."
        />
      </div>
    </>
  );
}
