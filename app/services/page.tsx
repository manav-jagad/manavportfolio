import Link from "next/link";

const offerings = [
  {
    title: "Website renovation",
    summary: "For brands that have outgrown their current look and need a cleaner, more premium presence.",
    deliverables: ["Visual refresh", "Section restructuring", "Responsive polish"],
  },
  {
    title: "Launch and landing pages",
    summary: "Focused pages built to frame an offer clearly and guide attention toward the action that matters.",
    deliverables: ["Hero direction", "CTA layout", "Trust and proof blocks"],
  },
  {
    title: "Product and SaaS marketing",
    summary: "Sharper narratives for products that need feature storytelling, comparison, and credibility.",
    deliverables: ["Feature sections", "Use-case narratives", "Pricing support"],
  },
  {
    title: "Frontend refinement",
    summary: "When the fundamentals are already there but the experience needs stronger polish and consistency.",
    deliverables: ["UI cleanup", "Motion tuning", "Component rhythm"],
  },
];

const engagements = [
  {
    label: "Refresh sprint",
    description: "A compact, high-focus engagement for a homepage or a small set of key sections.",
  },
  {
    label: "Full site redesign",
    description: "A broader rebuild for multi-page websites that need cohesion from navigation to footer.",
  },
  {
    label: "Ongoing polish",
    description: "Iterative refinement after launch for teams that want design and frontend support on demand.",
  },
];

const checklist = [
  "Content hierarchy that reads more clearly",
  "Typography with a stronger point of view",
  "Card and section systems that feel less template-driven",
  "Responsive layouts that stay intentional on smaller screens",
];

export default function ServicesPage() {
  return (
    <div className="page-shell">
      <section className="section-shell section-spacing-lg pt-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">Services</span>
            <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl">
              Design and frontend work that makes the site feel newly serious.
            </h1>
          </div>

          <p className="lead-copy max-w-none">
            The goal is not just to make the website prettier. It&apos;s to make
            it more convincing, more intentional, and much easier for visitors
            to understand at a glance.
          </p>
        </div>
      </section>

      <section className="section-shell section-spacing pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {offerings.map((offering, index) => (
            <div key={offering.title} className="surface-card p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
                    Service 0{index + 1}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    {offering.title}
                  </h2>
                </div>
                <span className="text-4xl text-white/12">0{index + 1}</span>
              </div>

              <p className="mt-5 leading-7 text-[color:var(--muted)]">
                {offering.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {offering.deliverables.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--teal)]">
              What the work usually changes
            </p>
            <h2 className="section-title mt-4 text-4xl">
              Better rhythm, better hierarchy, better first impressions.
            </h2>

            <div className="mt-6 space-y-4">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/88"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="warm-panel overflow-hidden rounded-[32px] bg-[#f5ecde] p-8 text-[#10172d] shadow-[0_30px_80px_rgba(5,8,18,0.2)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[#7a674b]">
              Ways to work together
            </p>
            <div className="mt-6 space-y-5">
              {engagements.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-[#dac9af] bg-white/60 p-5"
                >
                  <h3 className="text-2xl font-semibold">{item.label}</h3>
                  <p className="mt-3 leading-7 text-[#44506b]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-spacing pb-24">
        <div className="surface-card p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="eyebrow">Next Step</span>
              <h2 className="section-title mt-5 text-4xl md:text-5xl">
                If the website feels behind, let&apos;s give it a stronger point
                of view.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-[color:var(--muted)]">
                A focused redesign can change how the brand is perceived in just
                a few screens. We can start with the homepage and scale from
                there.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact" className="button-primary">
                Enquire now
              </Link>
              <Link href="/portfolio" className="button-secondary">
                View examples
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
