import Rich from "@/components/Rich";
import { PlusIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n/config";
import { karpaduHref } from "@/lib/karpaduLinks";

export default function FaqList({
  items,
  locale,
  name = "faq",
  headingLevel = 3,
}: {
  items: { q: string; a: string }[];
  locale: Locale;
  name?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.q}
          name={name}
          className="group rounded-2xl border border-sand-200 bg-white transition open:border-sea-200 open:shadow-soft"
          open={index === 0}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-semibold text-ink sm:px-6 sm:py-5">
            <Heading>{item.q}</Heading>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand-100 text-ink/60 transition duration-300 group-open:rotate-45 group-open:bg-sea-800 group-open:text-white">
              <PlusIcon />
            </span>
          </summary>
          <p className="-mt-1 px-5 pb-5 leading-relaxed text-ink/70 sm:px-6 sm:pb-6">
            <Rich
              text={item.a}
              values={{
                karpadu: (
                  <a href={karpaduHref("home", locale, "goldyrentacar-faq")} className="font-semibold text-sea-700 underline decoration-gold-400 underline-offset-4">
                    Karpadu
                  </a>
                ),
              }}
            />
          </p>
        </details>
      ))}
    </div>
  );
}
