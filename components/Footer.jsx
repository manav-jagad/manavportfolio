import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const serviceHighlights = [
  "Business websites",
  "Landing pages",
  "Custom web projects",
  "Frontend polish",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-6 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="surface-card surface-card-static">
          <div className="grid gap-10 border-b border-white/10 px-6 py-10 lg:grid-cols-[1.15fr_0.7fr_0.8fr] lg:px-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[0.75rem] uppercase tracking-[0.32em] text-[var(--teal)]">
                  Manav Studio
                </p>
                <h2 className="section-title text-3xl md:text-4xl">
                  Built for businesses that want clearer trust and better project enquiries.
                </h2>
                <p className="max-w-xl text-[color:var(--muted)] leading-7">
                  I design and develop websites that make it easier for clients
                  to understand the offer, trust the brand, and request the
                  work.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="tag">Next.js</span>
                <span className="tag">Project requests</span>
                <span className="tag">Responsive design</span>
                <span className="tag">Custom frontend</span>
              </div>
            </div>

            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                Navigation
              </p>
              <div className="grid gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[color:var(--muted)] transition hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                  Focus Areas
                </p>
                <div className="grid gap-3">
                  {serviceHighlights.map((item) => (
                    <p key={item} className="text-[color:var(--muted)]">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
                  Reach out
                </p>
                <a
                  href="mailto:hello@manavstudio.dev"
                  className="mt-3 block text-lg font-semibold text-white transition hover:translate-x-1 hover:text-[var(--accent)]"
                >
                  hello@manavstudio.dev
                </a>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  Based in India, collaborating remotely on websites and custom
                  builds worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-6 py-5 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p>
              &copy; {year} Manav Studio. Designed for project clarity, stronger
              trust, and better enquiries.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="transition hover:-translate-y-0.5 hover:text-white">
                Services
              </Link>
              <Link href="/portfolio" className="transition hover:-translate-y-0.5 hover:text-white">
                Portfolio
              </Link>
              <Link href="/contact#project-request" className="transition hover:-translate-y-0.5 hover:text-white">
                Request Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
