"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/admin",
    label: "Dashboard",
    match: (pathname: string) => pathname === "/admin",
  },
  {
    href: "/admin/inquiries",
    label: "Inquiries",
    match: (pathname: string) => pathname.startsWith("/admin/inquiries"),
  },
  {
    href: "/admin/follow-ups",
    label: "Follow-ups",
    match: (pathname: string) => pathname.startsWith("/admin/follow-ups"),
  },
  {
    href: "/admin/clients",
    label: "Clients",
    match: (pathname: string) => pathname.startsWith("/admin/clients"),
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2">
      {navigationItems.map((item) => {
        const active = item.match(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-[20px] border px-4 py-3 text-sm font-semibold transition ${
              active
                ? "border-[rgba(242,192,120,0.3)] bg-[rgba(242,192,120,0.14)] text-white"
                : "border-white/10 bg-white/[0.03] text-white/72 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
