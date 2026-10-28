import { COMPANY } from "@/lib/site";
import type { LegalSet } from "./index";

const ADDRESS = `${COMPANY.address.street}, ${COMPANY.address.locality}, ${COMPANY.address.postalCode} Heraklion, Crete, Greece`;

const en: LegalSet = {
  contents: "On this page",
  terms: {
    updated: "Last updated: 28 October 2026",
    intro:
      "These terms apply when you use goldyrentacar.gr and when you rent a car from Goldy Rent a Car. Please read them before you book. When you book, you accept these terms together with the rental agreement you sign at pick-up.",
    sections: [
      {
        h: "Who we are",
        body: [
          `${COMPANY.name}, ${ADDRESS}. Phone and WhatsApp ${COMPANY.phone}, email ${COMPANY.email}.`,
          "Our live availability and online bookings run on Karpadu, a Greek car rental reservation platform. Karpadu provides the booking technology only. Your rental contract is always with Goldy Rent a Car.",
        ],
      },
      {
        h: "Booking and confirmation",
        body: [
          [
            "You book by choosing a car, a cover and any extras, entering the driver's details and paying online.",
            "Your booking is confirmed when we email you a confirmation with your booking reference.",
            "If the car is no longer available, or its price changed between your search and your payment, we do not confirm the booking and we refund the full amount automatically.",
            "Cars are shown as examples of their category. We guarantee the category, not the exact make, model or colour. If your category is not available, we give you a car of the same or a higher category at no extra cost.",
            "Please check the details in your confirmation and tell us straight away if anything is wrong.",
          ],
        ],
      },
      {
        h: "Price and payment",
        body: [
          [
            "The price shown when you book is the total for your dates, pick-up and return points, cover and extras. It includes VAT, unlimited kilometres, theft and damage cover and 24/7 road assistance.",
            "You pay the full amount online by debit or credit card through Viva Wallet, a licensed payment provider. We never see or store your card details.",
            "The price does not include fuel or charging, tolls, parking, traffic fines or ferry tickets. Costs you cause, such as missing fuel, a late return, special cleaning or damage the cover does not pay for, are charged separately as described below.",
            "All prices are in euros (€).",
          ],
        ],
      },
      {
        h: "Cover, excess and deposit",
        body: [
          [
            "Every rental includes theft and damage cover. The excess is the most you pay towards damage to the car or its theft.",
            "For each car we show the excess and the deposit of every cover before you book. The cover you choose is stated in your confirmation.",
            "With Full or Premium cover the deposit is €0. With Basic cover a refundable deposit is paid at pick-up and returned when the car comes back on time, without new damage and with the agreed fuel or charge level.",
            "No credit card is needed for any cover.",
          ],
        ],
      },
      {
        h: "When the cover does not apply",
        body: [
          "Whatever cover you choose, you pay the full cost of any damage, loss or theft, beyond the excess, when it is caused by:",
          [
            "driving under the influence of alcohol, drugs or medicines that affect driving;",
            "a driver who is not named in the rental agreement;",
            "taking the car on a ferry or off Crete, or driving it on unpaved roads, without our written agreement;",
            "putting the wrong fuel in the car;",
            "deliberate damage, reckless driving or serious breaches of the traffic code;",
            "losing the keys, or leaving them or the car documents in the car when it is stolen;",
            "not reporting an accident to us and, where needed, to the police.",
          ],
        ],
      },
      {
        h: "Driver requirements",
        body: [
          [
            "The driver and any additional driver must be named in the rental agreement.",
            "Each driver must hold a valid driving licence, held for at least one year, and meet the age limits shown for the car. Enter the driver's age in the search and we only show cars that driver can rent.",
            "A licence issued outside the EU or EEA may need an International Driving Permit together with the national licence.",
            "At pick-up, bring the driving licence and a passport or ID card for every driver.",
            "We may refuse to hand over the car if a driver cannot show these documents or is clearly unfit to drive.",
          ],
        ],
      },
      {
        h: "Pick-up and return",
        body: [
          [
            "We meet you at the pick-up point and time in your booking. If you give us your flight number, we follow your flight and wait if it is delayed.",
            "If you will be late for any other reason, please call or message us.",
            "We check the car together at pick-up and at return. Existing damage is recorded on the rental agreement.",
            "Return the car at the agreed place and time, with the same fuel or charge level as at pick-up. Missing fuel or charge is charged at cost.",
            "Rental days are counted in 24-hour periods from the pick-up time. Up to 1 hour late is free; after that we may charge an extra day at your booking's daily rate.",
            "If you return the car early, unused days are not refunded.",
          ],
        ],
      },
      {
        h: "Changes, cancellation and no-show",
        body: [
          [
            "You can change or cancel your booking free of charge at any time before the pick-up time. Contact us by WhatsApp, phone or email with your booking reference.",
            "When you cancel, we refund the full amount to the card you paid with. Depending on your bank, the refund appears within 5 to 10 working days.",
            "When a change alters the price, you pay the difference or we refund it.",
            "If you do not arrive and have not contacted us, we keep the car for you for 3 hours after the pick-up time. After that the booking counts as a no-show: we may release the car and the rental price is not refunded.",
            "If we have to cancel your booking, we offer you an equivalent car or refund the full amount, as you prefer.",
          ],
          "Under EU and Greek consumer law, the 14-day right of withdrawal does not apply to car rentals booked for specific dates (Article 16(l) of Directive 2011/83/EU). Our free cancellation above applies instead.",
        ],
      },
      {
        h: "Using the car",
        body: [
          [
            "Follow the Greek traffic code. Seat belts are mandatory for every passenger, and children must travel in a child seat suitable for their size.",
            "Taking the car off Crete, on a ferry or on unpaved roads needs our written agreement.",
            "Smoking is not allowed in the car. Pets travel only with our agreement. If the car needs special cleaning, we charge the cleaning cost.",
            "The car may not be sublet, used to carry passengers or goods for payment, used for racing or driving lessons, or used to tow anything.",
            "Always lock the car and keep the keys and documents with you.",
          ],
        ],
      },
      {
        h: "Accidents, breakdowns and damage",
        body: [
          [
            `Our road assistance is available 24/7 on ${COMPANY.phone}.`,
            "After an accident, make sure everyone is safe, then call us straight away. If another vehicle is involved, fill in a European Accident Statement with the other driver or call the police (100, or 112 for emergencies). Do not admit liability.",
            "Do not repair the car, or have it repaired, without our agreement.",
            "If the car breaks down through no fault of yours, we repair or replace it at no cost to you.",
          ],
        ],
      },
      {
        h: "Traffic fines, tolls and parking",
        body: [
          "The driver is responsible for traffic and parking fines, tolls and any towing costs during the rental. If a fine reaches us after the rental, we give the driver's details to the authority that issued it, as Greek law requires, or charge you the amount of the fine.",
        ],
      },
      {
        h: "Our liability",
        body: [
          "We are liable for harm caused by our intent or gross negligence, and for injury to life, body or health under the law. We are not liable for personal belongings left in the car, or for indirect losses such as a missed flight caused by events outside our control. Nothing in these terms limits the rights you have as a consumer under mandatory law.",
        ],
      },
      {
        h: "Using this website",
        body: [
          [
            "We keep prices, availability and other information on this website as accurate as we can. Availability is live and can change until your booking is confirmed.",
            "The text, photos and logos on this website belong to Goldy Rent a Car or its licensors. You may not copy them for commercial use without our permission.",
            "Do not misuse the website, for example by making fake bookings, scraping it automatically or trying to break its security.",
            "Links to other websites (such as Karpadu, Viva Wallet, Google or WhatsApp) are for your convenience. We are not responsible for their content.",
          ],
        ],
      },
      {
        h: "Complaints and applicable law",
        body: [
          `If something goes wrong, tell us first at ${COMPANY.email} or on ${COMPANY.phone}, and we will do our best to fix it.`,
          "These terms are governed by Greek law. If you are a consumer, you also keep the protection of the mandatory rules of your country of residence. The courts of Heraklion have jurisdiction, unless consumer law allows you to go to the courts where you live.",
          "You can also turn to the Hellenic Consumer Ombudsman, an independent body that settles consumer disputes free of charge: www.synigoroskatanaloti.gr.",
          "These terms are available in several languages. If a translation differs from the English text, the English text prevails.",
        ],
      },
      {
        h: "Changes to these terms",
        body: [
          "We may update these terms. Your booking is governed by the version in force on the day you booked. The date of the latest version is shown at the top of this page.",
        ],
      },
    ],
  },
  privacy: {
    updated: "Last updated: 28 October 2026",
    intro:
      "This policy explains which personal data Goldy Rent a Car collects when you visit goldyrentacar.gr, contact us or rent a car, why we use it, and your rights under the EU General Data Protection Regulation (GDPR) and Greek Law 4624/2019.",
    sections: [
      {
        h: "Who is responsible",
        body: [
          `The controller of your personal data is ${COMPANY.name}, ${ADDRESS}. For any question about your data, email ${COMPANY.email} or call ${COMPANY.phone}.`,
        ],
      },
      {
        h: "What data we collect",
        body: [
          [
            "When you search: pick-up and return points, dates and times, and the driver's age.",
            "When you book: first and last name, email, mobile phone, country of residence, flight number (optional), and the car, cover, extras and price you choose.",
            "When you pay: Viva Wallet processes your card on its own secure page. We receive only the payment result, the amount and a transaction reference, never your full card number.",
            "At pick-up and during the rental: the details of the driving licence and passport or ID card of every driver, the signed rental agreement, the condition, fuel level and mileage of the car, and any accident, damage or fine reports.",
            "When you contact us: your messages by email, phone or WhatsApp.",
            "Technical data: your IP address, browser type and the pages you request, recorded by our hosting provider to keep the website secure.",
          ],
          "We do not ask for sensitive data, such as health information. If you do not give us the booking details, we cannot take your booking.",
        ],
      },
      {
        h: "Why we use it",
        body: [
          [
            "To show availability and prices, take your booking, take payment, provide the car and contact you about your rental. Legal basis: the contract with you, and the steps you ask for before it (Article 6(1)(b) GDPR).",
            "To issue invoices, keep our accounts and answer requests from the authorities, for example about traffic fines. Legal basis: our legal obligations (Article 6(1)(c) GDPR).",
            "To protect our cars and business: preventing fraud, handling damage and insurance claims, defending legal claims and keeping the website secure. Legal basis: our legitimate interests (Article 6(1)(f) GDPR).",
          ],
          "We do not use your data for advertising, we do not send newsletters, and we do not make decisions about you by automated means alone.",
        ],
      },
      {
        h: "Who we share it with",
        body: [
          [
            "Karpadu, the reservation platform that processes availability and bookings on our behalf.",
            "Viva Wallet, the licensed payment provider that processes your payment. Viva Wallet is responsible for your card data under its own privacy policy.",
            "Vercel Inc., which hosts this website on our behalf.",
            "Our accountant, insurers, lawyers, repair shops and road assistance partners, only when they need the data for your rental or a claim.",
            "Public authorities, such as the tax authority, the police or the courts, when the law requires it.",
            "WhatsApp (Meta), if you choose to message us on WhatsApp. Those messages are also covered by WhatsApp's own privacy policy.",
          ],
          "We never sell or rent your personal data.",
        ],
      },
      {
        h: "Transfers outside the EU",
        body: [
          "Our hosting provider, Vercel, is a US company, so some data may be processed outside the European Economic Area. Where this happens, it is protected by the safeguards the GDPR requires, such as the EU–US Data Privacy Framework or the European Commission's Standard Contractual Clauses.",
        ],
      },
      {
        h: "How long we keep it",
        body: [
          [
            "Searches are not linked to you and are not stored by us.",
            "Booking and rental records are kept for as long as Greek tax and accounting law requires, generally 5 years after the end of the year of the rental, and longer only while a claim, fine or dispute is still open.",
            "Messages are kept as long as we need them to answer you and handle your booking.",
            "Hosting logs are kept for a short time and then deleted automatically.",
          ],
        ],
      },
      {
        h: "Cookies and browser storage",
        body: [
          [
            "We use one cookie, “lang”, which remembers the language you choose for one year. It is set only when you pick a language.",
            "During a booking, your search and driver details are kept in your browser tab (session storage) so they are not lost on the way to the payment page and back. They are deleted when you close the tab.",
            "We use no analytics, advertising or tracking cookies, and our fonts are served from our own website, so your visit is not reported to Google or any ad network.",
            "The Viva Wallet payment page may use its own cookies, as described in Viva Wallet's privacy policy.",
          ],
          "Because we only use what the website needs to work, we do not show a cookie banner. If we ever add analytics, we will ask for your consent first and update this policy.",
        ],
      },
      {
        h: "How we protect it",
        body: [
          "The website uses an encrypted connection (HTTPS), card payments are handled by a PCI DSS certified payment provider, and only the people who need your data for your rental can access it.",
        ],
      },
      {
        h: "Your rights",
        body: [
          "You have the right to:",
          [
            "access the personal data we hold about you and get a copy;",
            "have incorrect data corrected;",
            "have your data deleted, when we no longer need it or have no legal reason to keep it;",
            "restrict how we use your data, or object to uses based on our legitimate interests;",
            "receive the data you gave us in a common electronic format (data portability).",
          ],
          `To use any of these rights, email ${COMPANY.email}. We reply within one month and may ask you to confirm your identity first. You also have the right to complain to the Hellenic Data Protection Authority (www.dpa.gr) or to the data protection authority of the EU country where you live.`,
        ],
      },
      {
        h: "Changes to this policy",
        body: ["We may update this policy when our services or the law change. The date of the latest version is shown at the top of this page."],
      },
    ],
  },
};

export default en;
