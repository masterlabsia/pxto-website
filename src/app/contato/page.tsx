import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ContactForm } from "@/components/form/ContactForm";
import { buildMetadata } from "@/lib/metadata";
import { contactChannels } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description:
    "Descreva o problema que precisa resolver. Não é preciso ter a especificação pronta nem saber qual tecnologia usar.",
  path: "/contato",
});

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
      <section className="border-b border-rule pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-16 lg:pt-16">
        <Container width="wide">
          <Heading level={1} size="display" className="max-w-[18ch]">
            Vamos conversar sobre o seu problema.
          </Heading>
        </Container>
      </section>

      <section aria-labelledby="formulario" className="py-14 md:py-16 lg:py-20">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading level={2} size="sub" id="formulario">
                Descreva o problema. Não é preciso ter a solução.
              </Heading>
              <div className="mt-5 space-y-4 text-base text-ink-secondary">
                <p>
                  Você não precisa chegar com uma especificação pronta, um escopo
                  fechado ou uma tecnologia definida. Entender o problema é a
                  primeira etapa do nosso trabalho de qualquer forma.
                </p>
                <p>
                  Conte o que não está funcionando, o que já foi tentado e o que
                  precisaria acontecer. A partir daí a conversa fica concreta.
                </p>
              </div>

              {hasChannels ? (
                <div className="pxto-rule-top mt-10 pt-6">
                  <p className="font-mono text-2xs uppercase text-ink-secondary">
                    Prefere falar direto?
                  </p>
                  <ul className="mt-3 space-y-1 text-base text-ink">
                    {contactChannels.email ? <li>{contactChannels.email}</li> : null}
                    {contactChannels.phone ? <li>{contactChannels.phone}</li> : null}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
