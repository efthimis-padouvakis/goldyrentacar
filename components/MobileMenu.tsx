"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRightIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

interface Item {
  href: string;
  label: string;
}

export default function MobileMenu({
  items,
  label,
  closeLabel,
  bookNow,
  phone,
  phoneHref,
  whatsappHref,
}: {
  items: Item[];
  label: string;
  closeLabel: string;
  bookNow: Item;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : label}
        className="grid size-10 place-items-center rounded-full border border-sand-300 bg-white text-xl text-ink transition hover:border-sea-300"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      {/* Portal: the header's backdrop-filter would otherwise become the containing block and clip this fixed sheet. */}
      {open &&
        createPortal(
          <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-sand-50 px-4 pb-10 pt-4 animate-pop sm:top-[4.5rem] sm:px-6">
            <div className="mx-auto max-w-xl">
              <nav aria-label={label}>
                <ul className="divide-y divide-sand-200">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={close} className="flex items-center justify-between py-4 text-lg font-semibold text-ink">
                        {item.label}
                        <ArrowRightIcon className="text-sea-500" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <Link
                href={bookNow.href}
                onClick={close}
                className="mt-6 flex items-center justify-center rounded-2xl bg-gold-400 py-4 text-base font-extrabold text-sea-950 shadow-soft"
              >
                {bookNow.label}
              </Link>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href={phoneHref} className="flex items-center justify-center gap-2 rounded-2xl border border-sand-300 bg-white py-3.5 text-sm font-semibold text-ink">
                  <PhoneIcon className="text-sea-600" /> {phone}
                </a>
                <a href={whatsappHref} className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp py-3.5 text-sm font-bold text-sea-950">
                  <WhatsAppIcon /> WhatsApp
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
