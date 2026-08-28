/** First element in the tab order. Visible only on focus. WCAG 2.4.1. */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-contrast"
    >
      Pular para o conteúdo
    </a>
  );
}
