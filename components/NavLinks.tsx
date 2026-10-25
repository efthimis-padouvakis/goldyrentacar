"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Item {
  href: string;
  label: string;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Links({ items, pathname }: { items: Item[]; pathname: string }) {
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-semibold transition ${
                active ? "bg-sea-50 text-sea-800" : "text-ink/70 hover:bg-sand-100 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function CurrentLinks({ items }: { items: Item[] }) {
  return <Links items={items} pathname={usePathname()} />;
}

export default function NavLinks({ items, pathname }: { items: Item[]; pathname?: string }) {
  if (pathname !== undefined) return <Links items={items} pathname={pathname} />;
  return <CurrentLinks items={items} />;
}
