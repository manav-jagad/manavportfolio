"use client";

import { useState } from "react";

const contactOptions = [
  {
    label: "Email",
    value: "hello@manavstudio.dev",
    href: "mailto:hello@manavstudio.dev",
  },
  {
    label: "Availability",
    value: "New projects from May",
    href: "#contact-form",
  },
  {
    label: "Base",
    value: "India / Remote worldwide",
    href: "#contact-form",
  },
];

const faqs = [
  {
    question: "What kinds of websites do you work on?",
    answer:
      "Most often: personal brands, service businesses, startup marketing sites, portfolios, and product-led pages that need stronger presentation.",
  },
  {
    question: "Can we start with just one page?",
    answer:
      "Yes. A homepage or landing page refresh is a great place to begin before expanding into the rest of the site.",
  },
  {
    question: "Do you handle both design and frontend work?",
    answer:
      "Yes. The process covers visual direction, section refinement, and the actual responsive implementation.",
  },
  {
    question: "Is the contact form live?",
    answer:
      "The interaction is ready on the frontend. You can connect it to email, a CRM, or a backend endpoint when you're ready to take submissions live.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      projectType: "",
      message: "",
    });
  };

  return (
    <div className="page-shell">
      <section className="section-shell section-spacing-lg pt-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">Contact</span>
            <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl">
              If the site needs a stronger presence, let&apos;s talk about the
              next version.
            </h1>
          </div>

          <p className="lead-copy max-w-none">
            Share what feels off in the current site, what kind of impression
            you want instead, and which pages matter most right now.
          </p>
        </div>
      </section>

      <section className="section-shell section-spacing pt-0">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            {contactOptions.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="surface-card block p-6 transition hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                  {item.label}
                </p>
                <p className="mt-4 text-2xl font-semibold text-white">
                  {item.value}
                </p>
              </a>
            ))}

            <div className="surface-card p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                Good fit if you need
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
                <p>A homepage that stops feeling generic.</p>
                <p>Sharper sections for services, products, or case studies.</p>
                <p>A cohesive design system across the whole site.</p>
              </div>
            </div>
          </div>

          <div
            id="contact-form"
            className="warm-panel overflow-hidden rounded-[32px] bg-[#f5ecde] p-8 text-[#10172d] shadow-[0_30px_80px_rgba(5,8,18,0.2)] sm:p-10"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#7a674b]">
                Project enquiry
              </p>
              <h2 className="section-title mt-4 text-4xl">
                Tell me what you want the website to become.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-[#44506b]">
                A few details are enough to start. Focus on where the current
                site feels weak and what kind of energy you want it to carry.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 outline-none transition focus:border-[#b79056]"
                    placeholder="Your name"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 outline-none transition focus:border-[#b79056]"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium">
                Project type
                <input
                  type="text"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 outline-none transition focus:border-[#b79056]"
                  placeholder="Homepage refresh, full redesign, landing page, etc."
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                What needs to change?
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="rounded-[18px] border border-[#d9c8ae] bg-white/75 px-4 py-3 outline-none transition focus:border-[#b79056]"
                  placeholder="Tell me about the current site, the feeling you want, and the pages that matter most."
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="button-primary border-0">
                  Send enquiry
                </button>
                <p className="max-w-md text-sm leading-7 text-[#5a6782]">
                  Frontend flow is ready here. Connect this form to your email
                  service or backend endpoint when you want live submissions.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-[20px] border border-[#d9c8ae] bg-white/65 px-4 py-4 text-sm leading-7 text-[#2d3854]">
                  Thanks. Your demo submission has been staged locally and the
                  form is ready for a real backend hookup.
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <section className="section-shell section-spacing pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
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
