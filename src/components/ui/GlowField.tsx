"use client";

import { useEffect, useRef } from "react";

/**
 * Camadas de luz suave dentro de um contêiner arredondado, que seguem o mouse com
 * inércias diferentes, como uma nuvem. Substitui a fotografia do protótipo H612,
 * que o PXTO não pode usar (só imagem real, e não há). Decidido pelo responsável
 * em 10/11/2026, e levada do Hero ao Modelo de trabalho e ao CTA em 11/11/2026.
 *
 * Presa ao contêiner pai, que precisa ser `relative` e `overflow-hidden`. Fica
 * atrás do conteúdo, que precisa ser `relative z-10`. O Hero usa a escala cheia.
 * Os demais usam `scale` menor e `intensity` mais baixa, porque o texto de apoio
 * deles é `ink-secondary`, que no tema claro só passa em AA com a luz mais fraca.
 *
 * SEM PONTEIRO FINO OU COM reduced-motion: a luz fica parada na posição inicial,
 * como atmosfera. Nenhum listener é registrado.
 *
 * BARATO. Só `transform`, resolvido na GPU. O laço dorme quando as camadas
 * alcançam o mouse e acorda no próximo movimento. Sem listener de scroll
 * (CLAUDE.md 9.9), e todo listener tem limpeza (9.10).
 *
 * CONTRASTE. No claro a força cai à metade (`--pxto-glow-strength`), porque o
 * texto secundário não passa em AA sobre o tom cheio. O subtítulo do herói usa a
 * tinta primária pelo mesmo motivo.
 */
const LAYERS = [
  { size: 520, ease: 0.06, strength: 0.34, blur: 90 },
  { size: 320, ease: 0.11, strength: 0.24, blur: 70 },
  { size: 150, ease: 0.2, strength: 0.42, blur: 38 },
] as const;

export function GlowField({
  scale = 1,
  intensity = 1,
}: {
  /** Multiplica o tamanho e o desfoque das camadas. 1 é a escala do Hero. */
  scale?: number;
  /** Multiplica a opacidade. Abaixo de 1 enfraquece a luz. */
  intensity?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const host = root?.parentElement;
    if (!root || !host) return;

    const layers = Array.from(root.children) as HTMLElement[];
    const sizes = LAYERS.map((layer) => layer.size * scale);
    const target = { x: host.clientWidth * 0.72, y: host.clientHeight * 0.4 };
    const pos = LAYERS.map(() => ({ ...target }));

    /** Desenha um quadro e informa se alguma camada ainda está a caminho. */
    const paint = () => {
      let moving = false;
      LAYERS.forEach((layer, i) => {
        const p = pos[i];
        const el = layers[i];
        if (!p || !el) return;
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        p.x += dx * layer.ease;
        p.y += dy * layer.ease;
        if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) moving = true;
        const half = (sizes[i] ?? layer.size) / 2;
        el.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0)`;
      });
      return moving;
    };

    // Estado inicial, sem animação: a luz já está no lugar.
    LAYERS.forEach((layer, i) => {
      const p = pos[i];
      const el = layers[i];
      const half = (sizes[i] ?? layer.size) / 2;
      if (p && el) el.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0)`;
    });

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || calm) return;

    let frame = 0;
    const tick = () => {
      frame = paint() ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [scale]);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {LAYERS.map((layer) => (
        <div
          key={layer.size}
          className="absolute left-0 top-0 rounded-full bg-glow will-change-transform"
          style={{
            width: layer.size * scale,
            height: layer.size * scale,
            opacity: `calc(var(--pxto-glow-strength) * ${layer.strength * intensity})`,
            filter: `blur(${layer.blur * scale}px)`,
          }}
        />
      ))}
    </div>
  );
}
