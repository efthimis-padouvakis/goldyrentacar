# Goldy Rent a Car

Website for goldyrentacar.gr. Next.js 16 App Router, Tailwind v4, Cache Components. Live availability comes from the Karpadu backend (`api.karpadu.com`), the same API CarRentalNext uses.

## Run

```bash
cp .env.example .env.local   # fill SUB_KEY
npm install
npm run dev                  # http://localhost:3000 → redirects to /en (or the browser language)
npm run check                # lint + typecheck
npm run build && npm start
```

## Environment

| Variable | Purpose |
|---|---|
| `KARPADU_BACKEND` | Backend base URL |
| `SUB_KEY` | Azure APIM subscription key |
| `KARPADU_CHANNEL` | `channel` sent to the backend (default `karpadu`) |
| `GOLDY_COMPANY_IDS` | Comma-separated `companyId` list to keep. Empty shows every supplier |
| `RESERVATIONS_ENABLED` | `true` takes bookings online: Viva Wallet payment, then `MakeReservation`. Anything else hands the booking off to WhatsApp / email |
| `VIVA_ENV` | `demo` (sandbox, default) or `live` |
| `VIVA_CLIENT_ID`, `VIVA_CLIENT_SECRET` | Viva Smart Checkout credentials (OAuth) |
| `VIVA_SOURCE_CODE` | 4-digit Viva payment source code |
| `VIVA_MERCHANT_ID`, `VIVA_API_KEY` | Viva Basic-auth credentials, used for the webhook key and refunds |

## How the booking flow works

1. Search form (`components/SearchForm.tsx`) → `/{lang}/search?pickup&dropoff&start&end&age`.
2. Results (`components/SearchResults.tsx`) call `/api/availability`, which calls `GetAvailability` with a 20s timeout and one retry when the first attempt failed fast. Commission and company fields are stripped before the response leaves the server.
3. Booking (`components/BookingForm.tsx`) re-fetches the one car with `car=<carID>`, then posts to `/api/checkout`. The server re-prices from the backend (the client price is never trusted) and creates a Viva payment order for the full total. The booking travels inside the order (`merchantTrns`).
4. The customer pays on Viva Smart Checkout and returns to `/api/viva/success` (verifies the transaction, then shows `/{lang}/booking-confirmed`) or `/api/viva/failure` (back to the filled booking form).
5. Viva's "Transaction Payment Created" webhook hits `/api/viva/webhook`. The server reads the transaction back from Viva, re-prices, and calls `MakeReservation` with `ExternalReference = goldy|<orderCode>|<transactionId>`. If the car is gone, the price changed, or the backend rejects the booking, the payment is refunded through Viva. Every paid order ends as a reservation or a refund; failures are logged with `[viva-webhook]`.

### Viva Wallet setup (once per environment)

1. Payment source (Sales > Online payments > Websites/apps): domain `goldyrentacar.gr`, success URL `/api/viva/success`, failure URL `/api/viva/failure`. Put its code in `VIVA_SOURCE_CODE`.
2. Settings > API Access: copy the Smart Checkout client ID/secret and the Merchant ID/API key; tick "Allow refunds".
3. Settings > API Access > Webhooks: URL `https://goldyrentacar.gr/api/viva/webhook`, click Verify, event "Transaction Payment Created", Active.

Local testing needs a public HTTPS URL (for example a Cloudflare tunnel) as the source domain and webhook URL. Demo test cards: Viva developer portal, "Test cards and environments".

Dates travel as naive `yyyy-MM-ddTHH:mm:ss` strings (station time, Europe/Athens).

## Content

- Languages: `lib/i18n/config.ts`. Strings: `lib/i18n/dictionaries/*.ts` (`en.ts` is the type every other language must match).
- Pick-up stations: `lib/data/stations.json`, regenerated from `GetStations` with `npm run sync:stations`.
- SEO location pages: `lib/locations.ts`. Fleet showcase: `lib/fleet.ts`.
- Links to karpadu.com: `lib/data/karpadu-links.json` (localized paths copied from CarRentalNext) via `karpaduHref()`, tagged with `utm_source=goldyrentacar*`.

## Design

- Tokens live in `app/globals.css` (`@theme`): `sea-*` (primary teal), `sand-*` (neutrals, page background), `gold-*` (taken from the logo, used for CTAs), `coral-*` (errors, discounts). Font: Commissioner (Latin + Greek).
- Search widget: `SearchForm` → `LocationPicker` (grouped, accent-insensitive search) + `DateRangeCalendar` (keyboard navigable). It uses container queries, so the same component works as a hero card or a results bar.
- Crete map: `lib/creteMap.ts` holds the outline (Natural Earth 10m, simplified) and `projectToMap(lat, lng)`; `components/CreteMap.tsx` draws every station, with links on the SEO location pages.
- Booking steps UI: `components/Steps.tsx`. Shared page hero and breadcrumbs: `components/PageHero.tsx`.

## SEO

Per-page `generateMetadata` with canonical and hreflang (`lib/seo.ts`), `sitemap.xml` with language alternates, `robots.txt`, `llms.txt`, generated OG image, JSON-LD (`AutoRental`, `WebSite`, `BreadcrumbList`, `FAQPage`, `ItemList` of cars, `Article`). Old WordPress URLs (`/product/*`, `/search-your-car`, `/privacy-policy`) 301 to the new pages in `next.config.ts`.
