import Link from "next/link";
import CountUpNumber from "@/components/CountUpNumber";
import ProjectPreview from "@/components/ProjectPreview";
import { requestServiceOptions } from "@/data/clientRequest";
import { portfolioProjects } from "@/data/portfolio";

const portfolioStats = [
  {
    label: "Live references",
    value: portfolioProjects.length,
    suffix: "+",
    detail: "A reference wall clients can browse before they request their own build.",
  },
  {
    label: "Project tracks",
    value: requestServiceOptions.length,
    suffix: "",
    detail: "Clear lanes from landing pages to larger custom website work.",
  },
  {
    label: "Use cases",
    value: 4,
    suffix: "",
    detail: "Business sites, e-commerce, branding pages, and conversion-led funnels.",
  },
];

const translationSteps = [
  {
    title: "Spot the pattern",
    description:
      "Look at what is working in layout, pacing, content hierarchy, and call-to-action placement.",
  },
  {
    title: "Reframe it for the client",
    description:
      "Translate the strongest ideas into a structure that fits the business, audience, and offer instead of copying the reference.",
  },
  {
    title: "Build the sharper version",
    description:
      "Turn that direction into a cleaner website or project flow that feels custom, credible, and easier to act on.",
  },
];

const proofNotes = [
  {
    title: "Useful before the first call",
    description:
      "Clients can point to the styles, sections, and pacing they respond to, which makes the project request more concrete.",
  },
  {
    title: "Helpful for scoping",
    description:
      "The reference wall shows whether the client is aiming for a simpler launch page, a fuller website, or a more custom experience.",
  },
  {
    title: "Better than placeholder mockups",
    description:
      "Live references make the website feel more grounded and professional than generic demo boxes or made-up testimonials.",
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
              Live direction clients can browse before they request their own
              project.
            </h1>
          </div>

          <p className="lead-copy max-w-none">
            This portfolio now works as proof and context. It helps visitors see
            the level of polish, range, and structure they can ask for in their
            own website or custom build.
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
              Why this page matters
            </p>
            <h2 className="section-title mt-4 text-4xl">
              It helps clients say what they want without struggling to explain
              it.
            </h2>
            <p className="mt-5 leading-8 text-[color:var(--muted)]">
              A good portfolio page does more than look nice. It gives future
              clients enough visual and structural reference to ask for a build
              with more confidence and less hesitation.
            </p>
          </div>

          <div className="warm-panel overflow-hidden rounded-[32px] bg-[#f5ecde] p-8 text-[#10172d] shadow-[0_30px_80px_rgba(5,8,18,0.2)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[#7a674b]">
              What this proof helps with
            </p>
            <div className="mt-6 grid gap-4">
              {proofNotes.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#dac9af] bg-white/60 px-5 py-5"
                >
                  <p className="text-xs uppercase tracking-[0.26em] text-[#7a674b]">
                    0{index + 1}
                  </p>
                  <p className="mt-3 text-xl font-semibold">{item.title}</p>
                  <p className="mt-3 leading-7 text-[#44506b]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-spacing">
        <div className="mb-10 space-y-4">
          <span className="eyebrow">How It Translates</span>
          <h2 className="section-title text-4xl md:text-5xl">
            How references become a better final website.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {translationSteps.map((item, index) => (
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
              <span className="eyebrow">Request Yours</span>
              <h2 className="section-title mt-5 text-4xl md:text-5xl">
                Once the direction feels clear, the next move is to request the
                project.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-[color:var(--muted)]">
                The portfolio now supports a stronger sales flow. A client can
                browse the references here, then move straight into the project
                request page with a clearer idea of what they want built.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact#project-request" className="button-primary">
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
