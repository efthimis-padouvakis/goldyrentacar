export const SITE_URL = "https://goldyrentacar.gr";

export const COMPANY = {
  name: "Goldy Rent a Car",
  legalName: "Goldy Rent a Car",
  phone: "+30 694 900 8675",
  phoneHref: "tel:+306949008675",
  whatsapp: "306949008675",
  email: "info@goldyrentacar.gr",
  address: {
    street: "Irodotou 96",
    locality: "Nea Alikarnassos",
    region: "Heraklion, Crete",
    postalCode: "71408",
    country: "GR",
  },
  mapUrl: "https://maps.app.goo.gl/54jdTCbjUhQ1SPSx9",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61559447309941",
    instagram: "https://www.instagram.com/goldyrentacar",
  },
  priceFrom: 15,
  transferFrom: 20,
} as const;

export const KARPADU_URL = "https://www.karpadu.com";

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${COMPANY.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
