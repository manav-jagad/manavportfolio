import Link from "next/link";
import CountUpNumber from "@/components/CountUpNumber";
import ProjectPreview from "@/components/ProjectPreview";
import {
  featuredPortfolioProjects,
  portfolioProjects,
} from "@/data/portfolio";

const focusAreas = [
  {
    title: "Strategy-led",
    description: "Clear story flow, stronger hierarchy, and pages that know what they need to do.",
  },
  {
    title: "Built clean",
    description: "Responsive Next.js execution with thoughtful spacing, performance, and motion.",
  },
  {
    title: "Conversion-aware",
    description: "Calls to action, trust moments, and structure designed to guide the next step.",
  },
];

const signatureServices = [
  {
    number: "01",
    title: "Website renovation",
    description: "A full visual and structural refresh for sites that feel dated, crowded, or too ordinary.",
    points: ["Visual direction", "Layout overhaul", "Polish and launch pass"],
  },
  {
    number: "02",
    title: "Landing page systems",
    description: "Campaign pages and hero sections that feel intentional from the first scroll.",
    points: ["Offer framing", "CTA architecture", "Responsive presentation"],
  },
  {
    number: "03",
    title: "Product storytelling",
    description: "Sharper sections for SaaS, dashboards, and digital products that need clarity and confidence.",
    points: ["Feature narratives", "Trust sections", "Use-case blocks"],
  },
  {
    number: "04",
    title: "Frontend refinement",
    description: "Upgraded interactions, stronger typography, and cleaner component rhythm across the site.",
    points: ["Motion tuning", "UI cleanup", "Accessibility basics"],
  },
];

const process = [
  {
    step: "Audit",
    description:
      "I study the current website, the brand tone, and strong references so we know what to keep, sharpen, or completely rebuild.",
  },
  {
    step: "Structure",
    description:
      "We clarify hierarchy, rewrite section flow, and decide how visitors should move from first impression to action.",
  },
  {
    step: "Design + Build",
    description:
      "The new direction becomes a responsive frontend with cleaner sections, stronger typography, and controlled motion.",
  },
  {
    step: "Refine + Launch",
    description:
      "I tighten spacing, CTA placement, and responsive polish so the final site feels deliberate on every screen.",
  },
];

const testimonials = [
  {
    quote:
      "The refresh made the brand feel more expensive overnight. Every section now has a purpose.",
    author: "Studio founder",
  },
  {
    quote:
      "The site finally feels like the quality of the work behind it. Cleaner flow, better pacing, stronger CTA placement.",
    author: "Product consultant",
  },
  {
    quote:
      "What changed most was confidence. The website stopped feeling like a template and started feeling custom.",
    author: "Creative operator",
  },
];

const quickStats = [
  {
    label: "Live references",
    value: portfolioProjects.length,
    suffix: "+",
    detail: "Real project links already powering the portfolio wall.",
  },
  {
    label: "Service tracks",
    value: signatureServices.length,
    suffix: "",
    detail: "Clear upgrade paths from redesign to frontend refinement.",
  },
  {
    label: "Process steps",
    value: process.length,
    suffix: "",
    detail: "A tight workflow from audit through final polish.",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <section className="section-shell section-spacing-lg pt-12 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="reveal-up">
              <span className="eyebrow">Independent Creative Developer</span>
            </div>

            <div className="space-y-5 reveal-up delay-1">
              <p className="text-sm uppercase tracking-[0.32em] text-[var(--teal)]">
                Manav Studio
              </p>
              <h1 className="display-title text-5xl sm:text-6xl lg:text-8xl">
                I turn ordinary websites into experiences people remember.
              </h1>
            </div>

            <p className="lead-copy reveal-up delay-2">
              Bold layout choices, stronger typography, cleaner storytelling,
              and frontend polish that makes your brand feel more considered
              from the very first screen.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row reveal-up delay-3">
              <Link href="/contact" className="button-primary">
                Start your redesign
              </Link>
              <Link href="/portfolio" className="button-secondary">
                Browse the work
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3 reveal-up delay-4">
              {focusAreas.map((item) => (
                <div key={item.title} className="surface-card p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal-up delay-2">
            <div className="soft-float absolute -right-6 top-4 h-36 w-36 rounded-full bg-[rgba(122,209,192,0.18)] blur-3xl" />
            <div className="absolute -left-3 bottom-12 h-32 w-32 rounded-full bg-[rgba(255,146,94,0.18)] blur-3xl" />

            <div className="surface-card p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow !px-3 !py-2 !text-[0.64rem]">
                  Current direction
                </span>
                <span className="text-sm text-[color:var(--muted)]">
                  Refined, warm, high-trust
                </span>
              </div>

              <div className="warm-panel mt-6 rounded-[28px] bg-[#f5ecde] p-6 text-[#10172d] shadow-[0_28px_60px_rgba(9,14,29,0.18)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#6f6049]">
                  Homepage concept
                </p>
                <h2 className="section-title mt-4 text-4xl sm:text-5xl">
                  Editorial calm with a confident sales edge.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#44506b]">
                  The goal is simple: make your site feel more custom, more
                  trustworthy, and more deliberate without overcomplicating the
                  experience.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Story first", "Motion with restraint", "Mobile in mind"].map((item) => (
                    <div
                      key={item}
                      className="rounded-[20px] border border-[#d9c8ae] bg-white/70 px-4 py-4 text-sm font-medium text-[#202944]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
                    Signature moves
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
                    <p>Clean section rhythm instead of cluttered blocks.</p>
                    <p>Richer contrast between premium and supporting content.</p>
                    <p>CTAs that feel part of the narrative, not pasted on top.</p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                    What this solves
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
                    <p>Dated visuals that flatten your brand.</p>
                    <p>Unclear hierarchy that weakens the message.</p>
                    <p>Generic layouts that disappear in the crowd.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-6">
        <div className="surface-card px-6 py-6 sm:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                Design lens
              </p>
              <p className="mt-3 text-lg text-white">
                Premium without becoming cold. Expressive without losing clarity.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                Build mindset
              </p>
              <p className="mt-3 text-lg text-white">
                Responsive structure, cleaner components, and less visual noise.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                Outcome
              </p>
              <p className="mt-3 text-lg text-white">
                A site that looks more expensive and feels far more intentional.
              </p>
            </div>
          </div>

          <div className="muted-rule my-6" />

          <div className="grid gap-4 sm:grid-cols-3">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
                  {item.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  <CountUpNumber value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-spacing" id="services">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="eyebrow">What I Can Rebuild</span>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl">
              Four ways I make websites feel dramatically better.
            </h2>
          </div>
          <p className="max-w-xl text-[color:var(--muted)] leading-8">
            Whether the site needs a visual reset or a sharper content flow, the
            work is focused on turning scattered sections into a more confident
            experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {signatureServices.map((service) => (
            <div key={service.title} className="surface-card p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">
                {service.number}
              </p>
              <h3 className="mt-5 text-2xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">
                {service.description}
              </p>
              <div className="mt-6 space-y-3">
                {service.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/88"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing">
        <div className="surface-card p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div className="space-y-6">
              <span className="eyebrow">Live Portfolio Links</span>
              <h2 className="section-title text-4xl md:text-5xl">
                Real websites across commerce, branding, and sales funnels.
              </h2>
              <p className="text-[color:var(--muted)] leading-8">
                I have started turning your portfolio into an actual reference
                wall using live project links instead of placeholder concepts.
              </p>

              <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                  What I study from these references
                </p>
                <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
                  <p>How each homepage frames the offer in the first screen.</p>
                  <p>How product or service sections guide scanning and trust.</p>
                  <p>How CTA placement pushes visitors toward the next step.</p>
                </div>
              </div>

              <Link href="/portfolio" className="button-secondary">
                Open full portfolio wall
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {featuredPortfolioProjects.map((project, index) => (
                <div
                  key={project.title}
                  className={`surface-card p-6 ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <ProjectPreview project={project} compact={index !== 0} />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                      {project.category}
                    </p>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[color:var(--muted)]">
                      {project.domain}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-7 text-[color:var(--muted)]">
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
          </div>
        </div>
      </section>

      <section className="section-shell section-spacing" id="process">
        <div className="mb-10 space-y-4">
          <span className="eyebrow">Process</span>
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl">
            A calmer workflow that still moves fast.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {process.map((item, index) => (
            <div key={item.step} className="surface-card p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--teal)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold text-white">
                    {item.step}
                  </h3>
                </div>
                <span className="text-4xl text-white/15">0{index + 1}</span>
              </div>
              <p className="mt-5 max-w-xl leading-7 text-[color:var(--muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing">
        <div className="mb-10 space-y-4">
          <span className="eyebrow">Reactions</span>
          <h2 className="section-title text-4xl md:text-5xl">
            The difference people feel right away.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.author} className="surface-card p-6 sm:p-7">
              <p className="text-lg leading-8 text-white/92">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-6 text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
                {item.author}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing pb-24">
        <div className="warm-panel overflow-hidden rounded-[34px] bg-[#f5ecde] p-8 text-[#10172d] shadow-[0_30px_80px_rgba(5,8,18,0.2)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.32em] text-[#7c684d]">
                Ready for the upgrade?
              </p>
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl">
                Let&apos;s make your website feel as strong as the work behind it.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[#44506b]">
                If the current site feels flat, generic, or visually behind, I
                can help reshape it into something sharper and much more
                memorable.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact" className="button-primary">
                Book the redesign
              </Link>
              <Link href="/services" className="button-secondary border-[#d9c8ae] bg-white/60 text-[#10172d]">
                View services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
