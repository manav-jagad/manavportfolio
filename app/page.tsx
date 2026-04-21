import Link from "next/link";
import CountUpNumber from "@/components/CountUpNumber";
import ProjectPreview from "@/components/ProjectPreview";
import ProjectRequestPlanner from "@/components/ProjectRequestPlanner";
import { engagementModels, requestPriorityOptions, requestServiceOptions } from "@/data/clientRequest";
import {
  featuredPortfolioProjects,
  portfolioProjects,
} from "@/data/portfolio";

const focusAreas = [
  {
    title: "Business websites",
    description:
      "Multi-page sites for service businesses, founders, consultants, and brands that need a stronger online presence.",
  },
  {
    title: "Landing pages",
    description:
      "Focused launch pages and offer pages designed to guide attention and turn interest into enquiries.",
  },
  {
    title: "Custom builds",
    description:
      "Frontend-heavy projects, dashboards, portals, and structured custom flows that need clean execution.",
  },
];

const quickStats = [
  {
    label: "Project tracks",
    value: requestServiceOptions.length,
    suffix: "",
    detail: "Clear ways to work together, from landing pages to custom builds.",
  },
  {
    label: "Request signals",
    value: requestPriorityOptions.length,
    suffix: "",
    detail: "Priority inputs that help clients explain what matters before the first call.",
  },
  {
    label: "Live references",
    value: portfolioProjects.length,
    suffix: "+",
    detail: "A growing wall of live references and project direction to build against.",
  },
];

const process = [
  {
    step: "Request",
    description:
      "A client selects the kind of project, their priorities, timeline, and rough scope so the conversation starts with clarity.",
  },
  {
    step: "Scope",
    description:
      "I review the brief, sharpen the direction, and turn the request into a practical build plan instead of vague back-and-forth.",
  },
  {
    step: "Build",
    description:
      "The project moves into design-thinking, frontend execution, and responsive refinement that keeps the experience clean on every screen.",
  },
  {
    step: "Launch",
    description:
      "We tighten copy flow, contact paths, and key sections so the final site feels trustworthy and ready for real visitors.",
  },
];

const fitSignals = [
  {
    title: "Clients need a developer, not just inspiration",
    description:
      "The site is positioned around actual project requests, so visitors can move from interest to a clear brief without friction.",
  },
  {
    title: "The business has outgrown the current website",
    description:
      "When the offer is solid but the site still feels generic, the focus shifts to trust, structure, and stronger presentation.",
  },
  {
    title: "The next build has to look more serious",
    description:
      "A cleaner visual system, better content pacing, and sharper calls to action change how the business is perceived almost immediately.",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <section className="section-shell section-spacing-lg pt-12 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="reveal-up">
              <span className="eyebrow">Available for Client Projects</span>
            </div>

            <div className="space-y-5 reveal-up delay-1">
              <p className="text-sm uppercase tracking-[0.32em] text-[var(--teal)]">
                Manav Studio
              </p>
              <h1 className="display-title text-5xl sm:text-6xl lg:text-8xl">
                Websites and custom builds that help clients trust your business
                faster.
              </h1>
            </div>

            <p className="lead-copy reveal-up delay-2">
              I design and develop websites, landing pages, and structured web
              projects for businesses that want a clearer message, stronger
              credibility, and an easier way for customers to reach out.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row reveal-up delay-3">
              <Link href="/contact#project-request" className="button-primary">
                Request a project
              </Link>
              <Link href="/portfolio" className="button-secondary">
                See live proof
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
                  Project request ready
                </span>
                <span className="text-sm text-[color:var(--muted)]">
                  Strategy, design, development
                </span>
              </div>

              <div className="warm-panel mt-6 rounded-[28px] bg-[#f5ecde] p-6 text-[#10172d] shadow-[0_28px_60px_rgba(9,14,29,0.18)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#6f6049]">
                  What visitors can request
                </p>
                <h2 className="section-title mt-4 text-4xl sm:text-5xl">
                  A smarter way for potential clients to ask for your help.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#44506b]">
                  Instead of only browsing the portfolio, people can now tell
                  you what they want built, what matters most, and how soon they
                  want to move.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {requestServiceOptions.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[20px] border border-[#d9c8ae] bg-white/70 px-4 py-4"
                    >
                      <p className="text-sm font-semibold text-[#202944]">
                        {item.shortLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#44506b]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
                    Why it works
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
                    <p>Clients describe scope before the first message.</p>
                    <p>Priorities and timelines are clearer from the start.</p>
                    <p>The site feels like a working studio, not just a moodboard.</p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                    What changes
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
                    <p>More direct project enquiries from serious visitors.</p>
                    <p>Better expectation-setting around budget and delivery.</p>
                    <p>Stronger confidence before the conversation even starts.</p>
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
                Positioning
              </p>
              <p className="mt-3 text-lg text-white">
                The site now talks to customers who are ready to hire, not just
                people who want to browse.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                Experience
              </p>
              <p className="mt-3 text-lg text-white">
                Every section is built to move visitors toward a clearer request
                and a better first conversation.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                Outcome
              </p>
              <p className="mt-3 text-lg text-white">
                A portfolio that still looks strong, but now behaves like a real
                lead-generation website.
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

      <section className="section-shell section-spacing" id="request-planner">
        <ProjectRequestPlanner
          eyebrow="Dynamic Project Request"
          title="Let visitors shape the brief before they even message you."
          description="This planner gives potential clients a guided way to explain what they need built. It makes the website feel active, serious, and ready for real project conversations."
          mode="starter"
        />
      </section>

      <section className="section-shell section-spacing" id="services">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="eyebrow">Ways I Can Help</span>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl">
              Four clear directions a client can request right away.
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[color:var(--muted)]">
            The offers are clearer now, so visitors can quickly recognize
            whether they need a business website, a landing page, a custom
            project, or targeted redesign support.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {requestServiceOptions.map((service, index) => (
            <div key={service.id} className="surface-card p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">
                0{index + 1}
              </p>
              <h3 className="mt-5 text-2xl font-semibold text-white">
                {service.label}
              </h3>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">
                {service.description}
              </p>
              <div className="mt-6 space-y-3">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/88"
                  >
                    {item}
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
              <span className="eyebrow">Proof and References</span>
              <h2 className="section-title text-4xl md:text-5xl">
                Live direction for the kinds of websites clients want built.
              </h2>
              <p className="leading-8 text-[color:var(--muted)]">
                The portfolio still matters, but now it supports the sales
                conversation instead of replacing it. Visitors can see the range
                and then move straight into a request.
              </p>

              <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                  What the portfolio proves
                </p>
                <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
                  <p>Range across business websites, commerce, and offer pages.</p>
                  <p>Stronger section rhythm, hierarchy, and call-to-action flow.</p>
                  <p>
                    Enough visual direction for a client to say, &quot;Build
                    mine like this.&quot;
                  </p>
                </div>
              </div>

              <Link href="/portfolio" className="button-secondary">
                Open portfolio wall
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
            A clearer path from first enquiry to finished build.
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
          <span className="eyebrow">Best Fit</span>
          <h2 className="section-title text-4xl md:text-5xl">
            Why clients usually reach out.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {fitSignals.map((item) => (
            <div key={item.title} className="surface-card p-6 sm:p-7">
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="eyebrow">Engagement Models</span>
            <h2 className="section-title text-4xl md:text-5xl">
              Different project sizes, same focus on clarity and delivery.
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[color:var(--muted)]">
            Some clients need one strong page. Others need a full site or a more
            custom build. The website now makes room for both.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {engagementModels.map((item) => (
            <div key={item.title} className="surface-card p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
                Engagement
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
        <div className="warm-panel overflow-hidden rounded-[34px] bg-[#f5ecde] p-8 text-[#10172d] shadow-[0_30px_80px_rgba(5,8,18,0.2)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.32em] text-[#7c684d]">
                Ready for new enquiries?
              </p>
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl">
                Make the website feel like a place clients can actually hire you.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[#44506b]">
                The portfolio can still inspire confidence, but the real win is
                giving serious visitors an easy path to request a website or
                custom project.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact#project-request" className="button-primary">
                Start a request
              </Link>
              <Link
                href="/services"
                className="button-secondary border-[#d9c8ae] bg-white/60 text-[#10172d]"
              >
                View services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
