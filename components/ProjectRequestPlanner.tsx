"use client";

import Link from "next/link";
import { useState } from "react";
import {
  requestBudgetOptions,
  requestPriorityOptions,
  requestServiceOptions,
  requestTimelineOptions,
} from "@/data/clientRequest";

type PlannerMode = "starter" | "full";

type ProjectRequestPlannerProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  mode?: PlannerMode;
};

type FormState = {
  name: string;
  email: string;
  company: string;
  website: string;
  pages: string;
  details: string;
  serviceId: string;
  timelineId: string;
  budgetId: string;
  priorities: string[];
};

const studioEmail = "hello@manavstudio.dev";

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  website: "",
  pages: "",
  details: "",
  serviceId: requestServiceOptions[0].id,
  timelineId: requestTimelineOptions[1].id,
  budgetId: requestBudgetOptions[1].id,
  priorities: [requestPriorityOptions[0].id, requestPriorityOptions[1].id],
};

export default function ProjectRequestPlanner({
  id,
  eyebrow,
  title,
  description,
  mode = "full",
}: ProjectRequestPlannerProps) {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [lastSavedRequestId, setLastSavedRequestId] = useState<number | null>(
    null
  );

  const selectedService =
    requestServiceOptions.find((item) => item.id === formData.serviceId) ??
    requestServiceOptions[0];
  const selectedTimeline =
    requestTimelineOptions.find((item) => item.id === formData.timelineId) ??
    requestTimelineOptions[0];
  const selectedBudget =
    requestBudgetOptions.find((item) => item.id === formData.budgetId) ??
    requestBudgetOptions[0];

  const selectedPriorities = requestPriorityOptions.filter((item) =>
    formData.priorities.includes(item.id)
  );

  const readinessChecks = [
    formData.name.trim().length > 0,
    formData.email.trim().length > 0,
    formData.pages.trim().length > 0,
    formData.details.trim().length > 0,
    formData.priorities.length > 0,
    mode === "starter" || formData.company.trim().length > 0,
    mode === "starter" || formData.website.trim().length > 0,
  ];

  const readiness = Math.round(
    (readinessChecks.filter(Boolean).length / readinessChecks.length) * 100
  );

  const projectBrief = [
    `Project request`,
    ``,
    `Name: ${formData.name || "[Client name]"}`,
    `Email: ${formData.email || "[Client email]"}`,
    mode === "full" ? `Company: ${formData.company || "[Company name]"}` : null,
    mode === "full"
      ? `Current website: ${formData.website || "[Website or social link]"}`
      : null,
    `Service needed: ${selectedService.label}`,
    `Timeline: ${selectedTimeline.label}`,
    `Budget comfort: ${selectedBudget.label}`,
    `Main priorities: ${
      selectedPriorities.length
        ? selectedPriorities.map((item) => item.label).join(", ")
        : "To be discussed"
    }`,
    `Pages or scope: ${formData.pages || "[Pages or features]"}`,
    `Project details: ${
      formData.details || "[What should be built or improved]"
    }`,
    ``,
    `${selectedService.engagement}`,
  ]
    .filter(Boolean)
    .join("\n");

  const mailSubject = `${
    selectedService.label
  } enquiry${formData.company ? ` - ${formData.company}` : ""}`;
  const mailBody = [
    `Hi Manav,`,
    ``,
    `I want to request help with a project.`,
    ``,
    projectBrief,
    ``,
    `Thanks,`,
    formData.name || "[Client name]",
  ].join("\n");
  const mailtoHref = `mailto:${studioEmail}?subject=${encodeURIComponent(
    mailSubject
  )}&body=${encodeURIComponent(mailBody)}`;

  const summarySentence = `This looks like a ${selectedService.shortLabel.toLowerCase()} request with a ${selectedTimeline.label.toLowerCase()} timeline, mainly focused on ${
    selectedPriorities.length
      ? selectedPriorities.map((item) => item.label.toLowerCase()).join(", ")
      : "clarity and momentum"
  }.`;

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setCopyStatus("idle");
    setSubmissionState("idle");
    setSubmissionMessage("");
  };

  const handleOptionChange = (
    field: "serviceId" | "timelineId" | "budgetId",
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    setCopyStatus("idle");
    setSubmissionState("idle");
    setSubmissionMessage("");
  };

  const togglePriority = (priorityId: string) => {
    setFormData((current) => ({
      ...current,
      priorities: current.priorities.includes(priorityId)
        ? current.priorities.filter((item) => item !== priorityId)
        : [...current.priorities, priorityId],
    }));
    setCopyStatus("idle");
    setSubmissionState("idle");
    setSubmissionMessage("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(projectBrief);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      setSubmissionState("submitting");
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          website: formData.website,
          serviceId: formData.serviceId,
          timelineId: formData.timelineId,
          budgetId: formData.budgetId,
          priorities: formData.priorities,
          pagesScope: formData.pages,
          details: formData.details,
          sourcePage: mode === "starter" ? "homepage" : "contact",
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string; requestId?: number; inquiryId?: number }
        | null;

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to save the inquiry right now."
        );
      }

      setSubmissionState("success");
      setSubmissionMessage(data?.message || "Inquiry saved successfully.");
      setLastSavedRequestId(data?.inquiryId ?? data?.requestId ?? null);
      setCopyStatus("idle");
      setFormData(initialState);
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "Unable to save the inquiry right now."
      );
    }
  };

  const optionCardClass = (active: boolean) =>
    `rounded-[22px] border px-4 py-4 text-left transition ${
      active
        ? "border-[#10172d] bg-[#10172d] text-white shadow-[0_18px_40px_rgba(16,23,45,0.18)]"
        : "border-[#d9c8ae] bg-white/70 text-[#10172d] hover:-translate-y-1 hover:border-[#b79056] hover:bg-white"
    }`;

  return (
    <div
      id={id}
      className="grid gap-6 xl:grid-cols-[1.14fr_0.86fr] xl:items-start"
    >
      <form
        onSubmit={handleSubmit}
        className="warm-panel overflow-hidden rounded-[34px] bg-[#f5ecde] p-7 text-[#10172d] shadow-[0_30px_80px_rgba(5,8,18,0.2)] sm:p-10"
      >
        <div className="space-y-5">
          <span className="eyebrow !border-[#d8c4a7] !bg-white/40 !text-[#7c684d]">
            {eyebrow}
          </span>
          <h2 className="section-title text-4xl sm:text-5xl">{title}</h2>
          <p className="max-w-3xl text-base leading-8 text-[#44506b]">
            {description}
          </p>
        </div>

        <div className="mt-8 grid gap-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7a674b]">
              What should be built?
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {requestServiceOptions.map((option) => {
                const active = formData.serviceId === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleOptionChange("serviceId", option.id)}
                    className={optionCardClass(active)}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                      {option.shortLabel}
                    </p>
                    <p
                      className={`mt-3 text-lg font-semibold ${
                        active ? "text-white" : "text-[#10172d]"
                      }`}
                    >
                      {option.label}
                    </p>
                    <p
                      className={`mt-2 text-sm leading-7 ${
                        active ? "text-white/72" : "text-[#44506b]"
                      }`}
                    >
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-7 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7a674b]">
                Preferred timeline
              </p>
              <div className="mt-4 grid gap-3">
                {requestTimelineOptions.map((option) => {
                  const active = formData.timelineId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => handleOptionChange("timelineId", option.id)}
                      className={optionCardClass(active)}
                    >
                      <p className="text-base font-semibold">{option.label}</p>
                      <p
                        className={`mt-2 text-sm leading-7 ${
                          active ? "text-white/72" : "text-[#44506b]"
                        }`}
                      >
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7a674b]">
                Budget comfort
              </p>
              <div className="mt-4 grid gap-3">
                {requestBudgetOptions.map((option) => {
                  const active = formData.budgetId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => handleOptionChange("budgetId", option.id)}
                      className={optionCardClass(active)}
                    >
                      <p className="text-base font-semibold">{option.label}</p>
                      <p
                        className={`mt-2 text-sm leading-7 ${
                          active ? "text-white/72" : "text-[#44506b]"
                        }`}
                      >
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7a674b]">
              What matters most?
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {requestPriorityOptions.map((option) => {
                const active = formData.priorities.includes(option.id);

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => togglePriority(option.id)}
                    className={`rounded-full border px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "border-[#10172d] bg-[#10172d] text-white"
                        : "border-[#d9c8ae] bg-white/70 text-[#10172d] hover:-translate-y-0.5 hover:border-[#b79056]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleTextChange}
                className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 text-[#10172d] outline-none transition focus:border-[#b79056] focus:bg-white"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleTextChange}
                className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 text-[#10172d] outline-none transition focus:border-[#b79056] focus:bg-white"
                placeholder="you@example.com"
              />
            </label>

            {mode === "full" ? (
              <label className="grid gap-2 text-sm font-medium">
                Company or brand
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleTextChange}
                  className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 text-[#10172d] outline-none transition focus:border-[#b79056] focus:bg-white"
                  placeholder="Business name"
                />
              </label>
            ) : null}

            {mode === "full" ? (
              <label className="grid gap-2 text-sm font-medium">
                Current website
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleTextChange}
                  className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 text-[#10172d] outline-none transition focus:border-[#b79056] focus:bg-white"
                  placeholder="example.com"
                />
              </label>
            ) : null}
          </div>

          <label className="grid gap-2 text-sm font-medium">
            Pages or features needed
            <input
              type="text"
              name="pages"
              value={formData.pages}
              onChange={handleTextChange}
              className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 text-[#10172d] outline-none transition focus:border-[#b79056] focus:bg-white"
              placeholder="Homepage, services page, dashboard, lead form, checkout flow..."
            />
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Project details
            <textarea
              name="details"
              value={formData.details}
              onChange={handleTextChange}
              rows={mode === "starter" ? 5 : 6}
              className="rounded-[22px] border border-[#d9c8ae] bg-white/75 px-4 py-3 text-[#10172d] outline-none transition focus:border-[#b79056] focus:bg-white"
              placeholder="Tell me what you want to build, what feels weak right now, and what result you want from this project."
            />
          </label>

          <div className="rounded-[26px] border border-[#d8c4a7] bg-white/45 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7a674b]">
                  Submit to dashboard
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#44506b]">
                  This request now saves into your backend dashboard so you can
                  review every client enquiry in one place.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submissionState === "submitting"}
                  className="button-primary border-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submissionState === "submitting"
                    ? "Saving request..."
                    : "Save request"}
                </button>
                <a href={mailtoHref} className="button-secondary border-[#d9c8ae] bg-white/60 text-[#10172d]">
                  Prepare email
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="button-secondary border-[#d9c8ae] bg-white/60 text-[#10172d]"
                >
                  {copyStatus === "copied"
                    ? "Brief copied"
                    : copyStatus === "error"
                    ? "Copy failed"
                    : "Copy brief"}
                </button>
              </div>
            </div>

            {submissionState === "success" ? (
              <div className="mt-4 rounded-[22px] border border-[rgba(16,23,45,0.14)] bg-white/65 px-4 py-4 text-sm leading-7 text-[#2d3854]">
                {submissionMessage}
                {lastSavedRequestId
                  ? ` Inquiry #${lastSavedRequestId} is now visible in the admin dashboard.`
                  : ""}
              </div>
            ) : null}

            {submissionState === "error" ? (
              <div className="mt-4 rounded-[22px] border border-[rgba(180,72,40,0.18)] bg-[rgba(255,146,94,0.14)] px-4 py-4 text-sm leading-7 text-[#5a2418]">
                {submissionMessage}
              </div>
            ) : null}

            {mode === "starter" ? (
              <div className="mt-4 text-sm text-[#44506b]">
                Need a deeper intake?{" "}
                <Link href="/contact#project-request" className="accent-link">
                  Open the full project request page
                </Link>
                .
              </div>
            ) : null}
          </div>
        </div>
      </form>

      <div className="surface-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
              Live project brief
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              {selectedService.label}
            </h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            {readiness}% ready
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--teal),var(--accent),var(--accent-soft))] transition-all duration-500"
            style={{ width: `${readiness}%` }}
          />
        </div>

        <p className="mt-6 leading-8 text-[color:var(--muted)]">
          {summarySentence}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Timeline
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              {selectedTimeline.label}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              {selectedTimeline.description}
            </p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Budget comfort
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              {selectedBudget.label}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              {selectedBudget.description}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
            What this build needs most
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {selectedPriorities.length ? (
              selectedPriorities.map((item) => (
                <span key={item.id} className="tag">
                  {item.label}
                </span>
              ))
            ) : (
              <span className="text-sm text-[color:var(--muted)]">
                Choose one or more priorities to sharpen the brief.
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
            Suggested deliverables
          </p>
          <div className="mt-4 space-y-3">
            {selectedService.deliverables.map((item) => (
              <div
                key={item}
                className="rounded-[18px] border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/88"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Intake snapshot
          </p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>{selectedService.engagement}</p>
            <p>Pages or features: {formData.pages || "Still to be defined"}</p>
            <p>
              Contact: {formData.name || "Client name"} /{" "}
              {formData.email || "Best email"}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/10 bg-[rgba(122,209,192,0.08)] p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
            Notes for the request
          </p>
          <p className="mt-3 text-sm leading-7 text-white/86">
            {formData.details
              ? formData.details
              : "Add a short note about the current problem, the audience, or the result you want from the project."}
          </p>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
            Backend status
          </p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            New submissions now save into the backend dashboard. Email and brief
            copy are still available as backup handoff options.
          </p>
        </div>
      </div>
    </div>
  );
}
