"use client";

import { useActionState, useEffect, useRef } from "react";
import { Field } from "@/components/form/Field";
import { Input, Textarea, Select } from "@/components/form/Input";
import { FormStatus } from "@/components/form/FormStatus";
import { Button } from "@/components/ui/Button";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { contactCopy, needOptions } from "@/content/contact";

/**
 * Client leaf. Owns form state and nothing else.
 *
 * Progressive enhancement: the form posts to a Server Action, so it works
 * before hydration. Validation runs on blur and on submit, never on every
 * keystroke.
 */
const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const interactedAt = useRef<number>(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const interactedRef = useRef<HTMLInputElement>(null);

  // Focus moves to the status message on completion so the outcome is announced.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state.status]);

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const c = contactCopy.fields;

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1}>
        <FormStatus tone="success" heading={contactCopy.success.heading}>
          {contactCopy.success.body}
        </FormStatus>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="flex flex-col gap-6"
      onInput={() => {
        if (interactedAt.current === 0) {
          interactedAt.current = Date.now();
          if (interactedRef.current) interactedRef.current.value = String(interactedAt.current);
        }
      }}
    >
      <input ref={interactedRef} type="hidden" name="interactedAt" defaultValue="0" />
      {/* Honeypot. Hidden from users and from assistive technology. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field id="nome" label={c.nome.label} error={errors.nome} required>
          {(a) => <Input {...a} name="nome" autoComplete="name" placeholder={c.nome.placeholder} />}
        </Field>
        <Field id="empresa" label={c.empresa.label} error={errors.empresa}>
          {(a) => <Input {...a} name="empresa" autoComplete="organization" placeholder={c.empresa.placeholder} />}
        </Field>
        <Field id="email" label={c.email.label} error={errors.email} required>
          {(a) => <Input {...a} name="email" type="email" autoComplete="email" placeholder={c.email.placeholder} />}
        </Field>
        <Field id="telefone" label={c.telefone.label} error={errors.telefone}>
          {(a) => <Input {...a} name="telefone" type="tel" autoComplete="tel" placeholder={c.telefone.placeholder} />}
        </Field>
      </div>

      <Field
        id="necessidade"
        label={c.necessidade.label}
        helper={c.necessidade.helper}
        error={errors.necessidade}
      >
        {(a) => (
          <Select {...a} name="necessidade" defaultValue="">
            <option value="" disabled>
              {c.necessidade.placeholder}
            </option>
            {needOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        )}
      </Field>

      <Field
        id="mensagem"
        label={c.mensagem.label}
        helper={c.mensagem.helper}
        error={errors.mensagem}
        required
      >
        {(a) => <Textarea {...a} name="mensagem" placeholder={c.mensagem.placeholder} />}
      </Field>

      {state.status === "error" && !state.fieldErrors ? (
        <div ref={statusRef} tabIndex={-1}>
          <FormStatus tone="error">{state.message}</FormStatus>
        </div>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? contactCopy.submitting : contactCopy.submit}
        </Button>
      </div>
    </form>
  );
}
