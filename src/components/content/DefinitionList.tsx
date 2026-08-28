import { cn } from "@/lib/cn";

export type Definition = { term: string; description: string };

/**
 * The defined term, expressed as layout rather than as an interaction.
 *
 * This is the signature of Direction A prime (VISUAL_DIRECTION.md Part VI):
 * a specification defines its terms. A hanging definition list carries that
 * without a hover affordance, which suits MOTION_INTENSITY 3 and works
 * identically on touch.
 *
 * Two columns, not a card grid: the skill bans a default divide-y list above
 * five items and a card grid would repeat a layout family used elsewhere.
 */
export function DefinitionList({
  items,
  className,
}: {
  items: readonly Definition[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.term}
          className="pxto-rule-top py-5 md:py-6"
        >
          <dt className="font-medium text-ink">{item.term}</dt>
          <dd className="mt-1 max-w-prose text-sm text-ink-secondary">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
