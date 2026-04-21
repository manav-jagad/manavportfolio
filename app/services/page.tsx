import Link from "next/link";
import {
  engagementModels,
  requestPriorityOptions,
  requestServiceOptions,
} from "@/data/clientRequest";

const includedInEveryBuild = [
  "Clearer hierarchy so visitors understand the offer faster",
  "Responsive layouts that still feel intentional on smaller screens",
  "Stronger call-to-action flow for project requests or lead capture",
  "Design and frontend thinking that makes the site feel more custom",
];

const deliveryStyle = [
  {
    title: "Design-minded development",
    description:
      "The work is not limited to code. It includes section direction, visual rhythm, and how the site should guide attention.",
  },
  {
    title: "Built around the business goal",
    description:
      "Every page should support something real: more enquiries, better trust, clearer positioning, or a sharper launch.",
  },
  {
    title: "Structured for collaboration",
    description:
      "Projects move through focused checkpoints instead of messy revisions, which keeps both speed and clarity intact.",
  },
];

export default function ServicesPage() {
  return (
    <div className="page-shell">
      <section className="section-shell section-spacing-lg pt-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">Services</span>
            <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl">
              Project types clients can request through the site right now.
            </h1>
          </div>

          <p className="lead-copy max-w-none">
            The offers are now framed around real client needs: websites,
            landing pages, custom project builds, and redesign support that
            improves how the business shows up online.
          </p>
        </div>
      </section>

      <section className="section-shell section-spacing pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {requestServiceOptions.map((service, index) => (
            <div key={service.id} className="surface-card p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
                    Service 0{index + 1}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    {service.label}
                  </h2>
                </div>
                <span className="text-4xl text-white/12">0{index + 1}</span>
              </div>

              <p className="mt-5 leading-7 text-[color:var(--muted)]">
                {service.description}
              </p>

              <div className="mt-6 space-y-3">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/88"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-white/10 bg-black/10 px-4 py-4 text-sm text-[color:var(--muted)]">
                {service.engagement}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--teal)]">
              Included in every project
            </p>
            <h2 className="section-title mt-4 text-4xl">
              More than a nicer layout. The goal is a stronger business tool.
            </h2>

            <div className="mt-6 space-y-4">
              {includedInEveryBuild.map((item) => (
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
              Common client priorities
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {requestPriorityOptions.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full border border-[#d8c4a7] bg-white/60 px-4 py-3 text-sm font-medium text-[#10172d]"
                >
                  {item.label}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-5">
              {deliveryStyle.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#dac9af] bg-white/60 p-5"
                >
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
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
          <span className="eyebrow">Engagement Models</span>
          <h2 className="section-title text-4xl md:text-5xl">
            Match the size of the work to the size of the outcome.
          </h2>
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
        <div className="surface-card p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="eyebrow">Next Step</span>
              <h2 className="section-title mt-5 text-4xl md:text-5xl">
                If the offer is clear, the site should make it easy to request
                the build.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-[color:var(--muted)]">
                The project request flow is now part of the website, so visitors
                can move from interest to a useful enquiry without confusion.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact#project-request" className="button-primary">
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
