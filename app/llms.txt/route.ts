import { locationPages } from "@/lib/locations";
import { COMPANY, KARPADU_URL, SITE_URL } from "@/lib/site";

export function GET() {
  const lines = [
    `# ${COMPANY.name}`,
    "",
    `> Local car rental company in Heraklion, Crete, Greece. Pick-up at Heraklion Airport (HER), Chania Airport (CHQ), ports and resorts across Crete. Unlimited kilometres, theft & damage cover included, no cancellation fees, 24/7 road assistance. Rates from €${COMPANY.priceFrom}/day. Airport transfers from €${COMPANY.transferFrom} per way.`,
    "",
    `Office: ${COMPANY.address.street}, ${COMPANY.address.locality} ${COMPANY.address.postalCode}, ${COMPANY.address.region}, Greece`,
    `Phone / WhatsApp: ${COMPANY.phone}`,
    `Email: ${COMPANY.email}`,
    `Languages: English, Greek, German, French, Italian, Dutch, Polish`,
    `Live availability and online bookings: powered by Karpadu (${KARPADU_URL}), a Greek car rental platform.`,
    "",
    "## Pages",
    `- [Home](${SITE_URL}/en): search live availability`,
    `- [Fleet](${SITE_URL}/en/fleet): hybrid, electric and automatic cars`,
    `- [Locations](${SITE_URL}/en/locations): pick-up points in Crete`,
    ...locationPages.map((page) => `- [Car rental ${page.copy.en.name}](${SITE_URL}/en/locations/${page.slug})`),
    `- [Driving in Crete guide](${SITE_URL}/en/crete-driving-guide)`,
    `- [FAQ](${SITE_URL}/en/faq)`,
    `- [Contact](${SITE_URL}/en/contact)`,
    "",
    "## Related",
    `- [Karpadu: car rental in Crete](${KARPADU_URL}/en/car-rental/greece/crete)`,
    `- [Karpadu: car rental in Greece](${KARPADU_URL}/en/car-rental/greece)`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
