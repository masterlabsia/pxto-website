import { cn } from "@/lib/cn";

/**
 * An honest placeholder for a required image that does not exist yet.
 *
 * The taste skill requires real images and treats a pure-text page as
 * incomplete work. PRD 53 forbids stock photography or generated mockups
 * standing in for real work. Where both apply, the skill's own last resort is
 * a clearly-labelled slot plus an explicit list handed to the client
 * (VISUAL_DIRECTION.md Part V.2).
 *
 * This renders as a specification frame rather than as a broken image, which
 * keeps it on-concept for Direction A prime and makes the missing asset
 * visible instead of papered over.
 */
export function ImageSlot({
  label,
  ratio = "4 / 3",
  className,
}: {
  /** What belongs here. Written for PXTO to action, not for a visitor. */
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-start border border-rule bg-ground-subtle p-4",
        className,
      )}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Espaço reservado para imagem. ${label}`}
    >
      <p className="max-w-[36ch] font-mono text-2xs uppercase leading-relaxed text-ink-secondary">
        {label}
      </p>
    </div>
  );
}
