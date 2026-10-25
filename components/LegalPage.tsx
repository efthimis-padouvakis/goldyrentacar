import PageHero, { type Crumb } from "@/components/PageHero";

export default function LegalPage({
  title,
  updated,
  sections,
  crumbs,
}: {
  title: string;
  updated: string;
  sections: { h: string; p: string }[];
  crumbs: Crumb[];
}) {
  return (
    <>
      <PageHero title={title} lead={updated} crumbs={crumbs} />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <article className="prose-goldy rounded-[2rem] border border-sand-200 bg-white p-6 sm:p-12">
          {sections.map((section) => (
            <section key={section.h}>
              <h2>{section.h}</h2>
              <p>{section.p}</p>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
