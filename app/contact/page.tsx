import ProjectRequestPlanner from "@/components/ProjectRequestPlanner";
import { contactHighlights, requestFaqs } from "@/data/clientRequest";

const nextSteps = [
  {
    title: "Review the request",
    description:
      "The project brief already includes the scope, priorities, and timeline direction, so the next conversation starts with real context.",
  },
  {
    title: "Align the scope",
    description:
      "I confirm the build direction, suggest the right engagement, and call out anything that should be simplified or expanded.",
  },
  {
    title: "Move into execution",
    description:
      "Once the direction is clear, the work moves into structure, design thinking, frontend build, and launch refinement.",
  },
];

export default function ContactPage() {
  return (
    <div className="page-shell">
      <section className="section-shell section-spacing-lg pt-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">Project Request</span>
            <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl">
              Request a website build, landing page, redesign, or custom web
              project.
            </h1>
          </div>

          <p className="lead-copy max-w-none">
            This page is built for clients who already know they need help. Use
            the form below to describe what should be built, what outcome
            matters most, and how you want the project to move.
          </p>
        </div>
      </section>

      <section className="section-shell section-spacing pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {contactHighlights.map((item) => (
            <div key={item.title} className="surface-card p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--teal)]">
                Client-ready
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                {item.title}
              </h2>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing pt-0">
        <ProjectRequestPlanner
          id="project-request"
          eyebrow="Full Intake Form"
          title="Share the project and let the site help you shape the brief."
          description="The request builder below is designed to gather the kind of information that makes the first project conversation faster, clearer, and much more useful."
          mode="full"
        />
      </section>

      <section className="section-shell section-spacing">
        <div className="mb-10 space-y-4">
          <span className="eyebrow">What Happens Next</span>
          <h2 className="section-title text-4xl md:text-5xl">
            A cleaner handoff from enquiry to build.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {nextSteps.map((item, index) => (
            <div key={item.title} className="surface-card p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
                Step 0{index + 1}
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
        <div className="grid gap-6 md:grid-cols-2">
          {requestFaqs.map((faq, index) => (
            <div key={faq.question} className="surface-card p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--teal)]">
                FAQ 0{index + 1}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {faq.question}
              </h3>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
