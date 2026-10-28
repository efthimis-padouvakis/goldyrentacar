import type { ReactNode } from "react";
import PageHero, { type Crumb } from "@/components/PageHero";
import type { LegalDoc } from "@/lib/legal";
import { COMPANY } from "@/lib/site";

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Emails, bare www. domains and our phone number become links
const LINKS = new RegExp(`([\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+|www\\.[\\w-]+(?:\\.[\\w-]+)+|${escape(COMPANY.phone)})`);

function linkify(text: string): ReactNode[] {
  return text.split(LINKS).map((part, index) => {
    if (index % 2 === 0) return part;
    if (part === COMPANY.phone) return <a key={index} href={COMPANY.phoneHref}>{part}</a>;
    if (part.includes("@")) return <a key={index} href={`mailto:${part}`}>{part}</a>;
    return (
      <a key={index} href={`https://${part}`} target="_blank" rel="noopener">
        {part}
      </a>
    );
  });
}

export default function LegalPage({
  title,
  doc,
  contents,
  crumbs,
}: {
  title: string;
  doc: LegalDoc;
  contents: string;
  crumbs: Crumb[];
}) {
  return (
    <>
      <PageHero title={title} lead={doc.updated} crumbs={crumbs} />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-10">
        <nav aria-label={contents} className="mb-8 rounded-4xl border border-sand-200 bg-white p-6 lg:sticky lg:top-28 lg:mb-0">
          <p className="text-xs font-bold uppercase tracking-wider text-ink/50">{contents}</p>
          <ol className="mt-3 space-y-2 text-sm">
            {doc.sections.map((section, index) => (
              <li key={section.h}>
                <a href={`#s${index + 1}`} className="flex gap-2 text-ink/70 transition hover:text-sea-700">
                  <span className="w-5 shrink-0 tabular-nums text-ink/35">{index + 1}.</span>
                  {section.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="prose-goldy min-w-0 rounded-4xl border border-sand-200 bg-white p-6 sm:p-12">
          <p className="text-lg">{linkify(doc.intro)}</p>
          {doc.sections.map((section, index) => (
            <section key={section.h}>
              <h2 id={`s${index + 1}`}>
                {index + 1}. {section.h}
              </h2>
              {section.body.map((block, blockIndex) =>
                typeof block === "string" ? (
                  <p key={blockIndex}>{linkify(block)}</p>
                ) : (
                  <ul key={blockIndex}>
                    {block.map((item) => (
                      <li key={item}>{linkify(item)}</li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
