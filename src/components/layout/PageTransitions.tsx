"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Transição entre páginas, com a API nativa `document.startViewTransition`. Decidida
 * pelo responsável em 11/11/2026. O visual está em globals.css (`::view-transition-*`).
 *
 * SEM DEPENDÊNCIA NOVA. Existem bibliotecas para isso, mas são ~40 linhas, e a regra 0.7
 * do projeto pede que dependência nova diga o que substitui. Aqui nada substitui.
 *
 * COMO. A navegação do Next é no cliente: o `Link` chama `router.push` e o DOM novo
 * chega depois, de forma assíncrona. Para a transição pegar o antes e o depois, esta
 * função intercepta o clique em link interno, envolve `router.push` num
 * `startViewTransition` e só resolve a promessa quando o `pathname` muda, que é o
 * sinal de que a página nova foi renderizada.
 *
 * CAPTURA, não borbulhamento: o `Link` do Next trata o clique num handler do React, que
 * roda ANTES de um listener no `document` em fase de borbulha. Só em captura dá para
 * chegar primeiro e cancelar.
 *
 * NÃO INTERCEPTA, e deixa o navegador ou o Next agirem como sempre: clique com
 * modificador (nova aba), botão que não seja o principal, `target` diferente de
 * `_self`, `download`, link externo, mesma página (âncora `#`), e o botão voltar.
 *
 * NÃO FAZ NADA sem suporte a `startViewTransition` ou com reduced-motion. Sem
 * JavaScript, a navegação é a de sempre. Um tempo-limite de 2s garante que a página
 * nunca fica presa esperando.
 *
 * É um componente de cliente (CLAUDE.md 8.1), e não renderiza nada.
 */
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const settle = useRef<(() => void) | null>(null);

  // A página nova chegou: libera a transição que estava esperando.
  useEffect(() => {
    settle.current?.();
    settle.current = null;
  }, [pathname]);

  useEffect(() => {
    if (typeof document.startViewTransition !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      event.stopPropagation();

      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            settle.current = resolve;
            router.push(url.pathname + url.search + url.hash);
            window.setTimeout(resolve, 2000);
          }),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
