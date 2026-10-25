"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppFab() {
  const pathname = usePathname();
  // Results and booking keep prices and Select buttons in the right column, exactly where the FAB sits,
  // until the page has a side margin wide enough for it. WhatsApp stays reachable from the menu and the booking dialog.
  const crowded = pathname.endsWith("/search") || pathname.endsWith("/book");
  return (
    <a
      href={whatsappLink()}
      aria-label="WhatsApp"
      className={`fixed bottom-5 right-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-3xl text-white shadow-lift transition hover:scale-105 sm:bottom-6 sm:right-6 ${
        crowded ? "max-2xl:hidden" : ""
      }`}
    >
      <WhatsAppIcon />
    </a>
  );
}
