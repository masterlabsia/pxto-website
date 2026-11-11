import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/sections/shared/PageHero";
import { Heading } from "@/components/ui/Heading";
import { ContactForm } from "@/components/form/ContactForm";
import { buildMetadata } from "@/lib/metadata";
import { contactChannels } from "@/content/site";
import { contatoPage } from "@/content/pages/contato";

export const metadata: Metadata = buildMetadata({ ...contatoPage.meta, path: "/contato" });

/**
 * Reduces the friction of starting a commercial conversation (PRD 28).
 *
 * Terminal page: no competing exits beyond the footer. The controlling message
 * is that describing the problem is enough, which resolves the "I do not know
 * what to ask for" barrier at the exact point of action (NARRATIVE 11.3).
 *
 * BLOCKED: direct contact channels are undefined. The block is omitted rather
 * than rendered with a placeholder address, because a non-functioning address
 * is worse than no address.
 */
export default function ContatoPage() {
  const hasChannels = Boolean(contactChannels.email ?? contactChannels.phone);

  return (
    <>
      <PageHero heading={contatoPage.hero.heading} />

      <section aria-labelledby="formulario" className="px-4 pb-24 pt-5 md:px-5 md:pb-32">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="pxto-reveal-stagger lg:col-span-4">
              <Heading level={2} size="sub" id="formulario">
                {contatoPage.mensagem.heading}
              </Heading>
              <div className="mt-5 space-y-4 text-base text-ink-secondary">
                {contatoPage.mensagem.body.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
              </div>

              {hasChannels ? (
                <div className="pxto-rule-top mt-10 pt-6">
                  <p className="font-mono text-2xs uppercase text-ink-secondary">
                    {contatoPage.channelsLabel}
                  </p>
                  <ul className="mt-3 space-y-1 text-base text-ink">
                    {contactChannels.email ? <li>{contactChannels.email}</li> : null}
                    {contactChannels.phone ? <li>{contactChannels.phone}</li> : null}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="pxto-reveal rounded-xl border border-rule bg-ground-subtle p-6 md:p-10 lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
