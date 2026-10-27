import { ArrowRightIcon, GoogleIcon, StarIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n/config";
import { fill, type Dictionary } from "@/lib/i18n";
import { GOOGLE_REVIEWS, reviews } from "@/lib/reviews";

type ReviewStrings = Pick<Dictionary, "reviews">;

function formatRating(locale: Locale) {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(GOOGLE_REVIEWS.rating);
}

function Stars({ value, label, className = "" }: { value: number; label: string; className?: string }) {
  const filled = Math.round(value);
  return (
    <span role="img" aria-label={label} className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} className={index < filled ? "text-gold-400" : "text-current opacity-20"} />
      ))}
    </span>
  );
}

/** Compact "5.0 ★★★★★ 33 Google reviews" pill linking to the Google listing. */
export function GoogleRating({ locale, t, tone, className = "" }: { locale: Locale; t: ReviewStrings; tone: "dark" | "light"; className?: string }) {
  const rating = formatRating(locale);
  const tones = {
    dark: "bg-white/10 text-white ring-white/15 hover:bg-white/15",
    light: "bg-white text-ink ring-sand-200 hover:ring-sea-300",
  };
  return (
    <a
      href={GOOGLE_REVIEWS.url}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2 rounded-full py-2 pl-2 pr-4 text-sm ring-1 transition ${tones[tone]} ${className}`}
    >
      <span className="grid size-6 place-items-center rounded-full bg-white">
        <GoogleIcon className="text-sm" />
      </span>
      <span className="font-extrabold">{rating}</span>
      <Stars value={GOOGLE_REVIEWS.rating} label={fill(t.reviews.outOf, { rating })} className="text-[0.8rem]" />
      <span className="font-semibold opacity-70">{fill(t.reviews.count, { n: GOOGLE_REVIEWS.count })}</span>
    </a>
  );
}

export default function GoogleReviews({ locale, t }: { locale: Locale; t: ReviewStrings }) {
  const rating = formatRating(locale);
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{t.reviews.eyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t.reviews.title}</h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink/65">{t.reviews.text}</p>
        </div>
        <a
          href={GOOGLE_REVIEWS.url}
          target="_blank"
          rel="noopener"
          className="flex shrink-0 items-center gap-4 self-start rounded-3xl border border-sand-200 bg-white p-4 pr-6 transition hover:border-sea-300 hover:shadow-soft md:self-auto"
        >
          <span className="grid size-12 place-items-center rounded-2xl bg-sand-50 text-2xl ring-1 ring-sand-200">
            <GoogleIcon />
          </span>
          <span>
            <span className="flex items-center gap-2">
              <span className="text-3xl font-extrabold leading-none text-ink">{rating}</span>
              <Stars value={GOOGLE_REVIEWS.rating} label={fill(t.reviews.outOf, { rating })} className="text-lg" />
            </span>
            <span className="mt-1 block text-sm font-semibold text-ink/60">{fill(t.reviews.count, { n: GOOGLE_REVIEWS.count })}</span>
          </span>
        </a>
      </div>

      <ul className="no-scrollbar mx-auto mt-10 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {reviews.map((review) => (
          <li key={review.author} className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
            <figure className="flex h-full flex-col rounded-3xl border border-sand-200 bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <Stars value={5} label={fill(t.reviews.outOf, { rating: 5 })} />
                <GoogleIcon className="text-lg" />
              </div>
              <blockquote lang="en" className="mt-4 flex-1 text-pretty leading-relaxed text-ink/75">
                <p>&ldquo;{review.text}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-sea-800 font-extrabold text-gold-300">
                  {review.author[0]}
                </span>
                <span>
                  <span className="block font-bold text-ink">{review.author}</span>
                  <span className="block text-sm text-ink/55">{t.reviews.source}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap gap-3 px-4 sm:px-6">
        <a
          href={GOOGLE_REVIEWS.url}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-sea-300"
        >
          {t.reviews.readAll} <ArrowRightIcon />
        </a>
        <a
          href={GOOGLE_REVIEWS.writeUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-sea-700 transition hover:text-sea-900"
        >
          <StarIcon className="text-gold-500" /> {t.reviews.write}
        </a>
      </div>
    </section>
  );
}
