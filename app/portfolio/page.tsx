import Link from "next/link";
import CountUpNumber from "@/components/CountUpNumber";
import ProjectPreview from "@/components/ProjectPreview";
import { portfolioProjects } from "@/data/portfolio";

const strengths = [
  "Stronger hierarchy across long pages",
  "Cleaner layout systems for repeatable sections",
  "Balanced motion that adds energy without noise",
];

const process = [
  {
    title: "Study the reference",
    description:
      "We look at what works in each live example: pacing, layout rhythm, brand feel, CTA moments, and product/service framing.",
  },
  {
    title: "Translate, not copy",
    description:
      "The goal is not to clone any site. It is to borrow the strongest ideas and reshape them into something that fits your brand.",
  },
  {
    title: "Build your version",
    description:
      "Those ideas become a cleaner structure, richer visuals, and a more intentional frontend system for your own website.",
  },
];

const portfolioStats = [
  {
    label: "Total links",
    value: portfolioProjects.length,
    suffix: "+",
    detail: "A growing wall of live references across different business types.",
  },
  {
    label: "Focus sectors",
    value: 4,
    suffix: "",
    detail: "Retail, beauty, branding, and high-conversion landing funnels.",
  },
  {
    label: "Reference phases",
    value: process.length,
    suffix: "",
    detail: "Study, translate, and rebuild into your own sharper system.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="page-shell">
      <section className="section-shell section-spacing-lg pt-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">Portfolio</span>
            <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl">
              Live portfolio references curated from real websites and funnels.
            </h1>
          </div>

          <p className="lead-copy max-w-none">
            These links now give your website a real showcase library across
            beauty, fashion, commerce, industrial brands, and high-conversion
            landing pages.
          </p>
        </div>
      </section>

      <section className="section-shell section-spacing pt-0">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {portfolioStats.map((item) => (
            <div key={item.label} className="surface-card p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
                {item.label}
              </p>
              <p className="mt-3 text-4xl font-semibold text-white">
                <CountUpNumber value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project) => (
            <div key={project.title} className="surface-card p-6 sm:p-7">
              <ProjectPreview project={project} />

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
                  {project.category}
                </p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[color:var(--muted)]">
                  {project.domain}
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-semibold text-white">
                {project.title}
              </h2>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.focus.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)] transition hover:text-[#ffd9aa]"
              >
                Visit live site
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing">
        <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--teal)]">
              How I use these references
            </p>
            <h2 className="section-title mt-4 text-4xl">
              Inspiration is useful only when it becomes your own identity.
            </h2>
            <p className="mt-5 leading-8 text-[color:var(--muted)]">
              The point of this wall is to show range and direction. From here,
              I can turn the strongest patterns into a custom visual system for
              your own site instead of a copied layout.
            </p>
          </div>

          <div className="warm-panel overflow-hidden rounded-[32px] bg-[#f5ecde] p-8 text-[#10172d] shadow-[0_30px_80px_rgba(5,8,18,0.2)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[#7a674b]">
              What carries into your redesign
            </p>
            <div className="mt-6 grid gap-4">
              {strengths.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-[#dac9af] bg-white/60 px-5 py-5"
                >
                  <p className="text-xs uppercase tracking-[0.26em] text-[#7a674b]">
                    0{index + 1}
                  </p>
                  <p className="mt-3 text-xl font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-spacing">
        <div className="mb-10 space-y-4">
          <span className="eyebrow">Process</span>
          <h2 className="section-title text-4xl md:text-5xl">
            How I turn references into a better final website.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {process.map((item, index) => (
            <div key={item.title} className="surface-card p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--teal)]">
                Phase 0{index + 1}
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing pb-24">
        <div className="surface-card p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="eyebrow">Let&apos;s Build Yours</span>
              <h2 className="section-title mt-5 text-4xl md:text-5xl">
                Now the portfolio has real proof. Next we can make your pages
                feel just as sharp.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-[color:var(--muted)]">
                We can keep adding more live links, or move straight into the
                next upgrade like a real contact backend, WhatsApp CTA, or more
                custom project pages.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact" className="button-primary">
                Start your project
              </Link>
              <Link href="/services" className="button-secondary">
                See services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
