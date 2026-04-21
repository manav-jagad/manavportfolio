export type ServiceRequestOption = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  deliverables: string[];
  engagement: string;
};

export type RequestOption = {
  id: string;
  label: string;
  description: string;
};

export type ContentCard = {
  title: string;
  description: string;
};

export const requestServiceOptions: ServiceRequestOption[] = [
  {
    id: "business-website",
    label: "Business website build",
    shortLabel: "Business site",
    description:
      "A multi-page website for service brands, consultants, agencies, and local businesses that need a stronger digital presence and a clearer enquiry path.",
    deliverables: [
      "Homepage and core pages",
      "Lead-focused content structure",
      "Responsive frontend delivery",
    ],
    engagement: "Best fit: multi-page business website engagement",
  },
  {
    id: "landing-page",
    label: "Landing page or launch page",
    shortLabel: "Landing page",
    description:
      "A focused page for a product, offer, campaign, course, or service that needs to guide attention toward one next step.",
    deliverables: [
      "Offer-first hero section",
      "Proof and CTA blocks",
      "Fast, focused launch flow",
    ],
    engagement: "Best fit: focused launch sprint",
  },
  {
    id: "custom-build",
    label: "Custom project or web app",
    shortLabel: "Custom build",
    description:
      "A structured frontend build for dashboards, portals, internal tools, product interfaces, or more involved custom web experiences.",
    deliverables: [
      "Custom UI system",
      "Reusable frontend components",
      "Clean project structure",
    ],
    engagement: "Best fit: custom build engagement",
  },
  {
    id: "redesign-support",
    label: "Redesign and frontend polish",
    shortLabel: "Redesign support",
    description:
      "A refresh for an existing website that already has content but needs stronger hierarchy, better mobile behavior, and more confidence on screen.",
    deliverables: [
      "Visual cleanup",
      "Section redesign",
      "Responsive refinement",
    ],
    engagement: "Best fit: redesign and polish engagement",
  },
];

export const requestTimelineOptions: RequestOption[] = [
  {
    id: "asap",
    label: "Fast turnaround",
    description: "A focused sprint for launches or urgent fixes.",
  },
  {
    id: "steady",
    label: "Planned timeline",
    description: "A balanced project pace with time for review and iteration.",
  },
  {
    id: "deep-build",
    label: "Larger project window",
    description: "More room for custom flows, deeper pages, and structured rollout.",
  },
  {
    id: "exploring",
    label: "Need help deciding",
    description: "We can shape the right timeline after scoping the work.",
  },
];

export const requestBudgetOptions: RequestOption[] = [
  {
    id: "starter",
    label: "Starter scope",
    description: "Best for a single page, smaller site section, or tighter release.",
  },
  {
    id: "growth",
    label: "Growth scope",
    description: "A stronger multi-section build with room for structure and polish.",
  },
  {
    id: "premium",
    label: "Premium scope",
    description: "Ideal for custom systems, larger sites, and higher-touch execution.",
  },
  {
    id: "unsure",
    label: "Need help scoping",
    description: "We can match the scope to the right budget instead of guessing.",
  },
];

export const requestPriorityOptions: RequestOption[] = [
  {
    id: "leads",
    label: "More enquiries",
    description: "Turn more visitors into qualified conversations.",
  },
  {
    id: "trust",
    label: "Stronger credibility",
    description: "Help the business look more established and premium.",
  },
  {
    id: "launch",
    label: "Launch quickly",
    description: "Get a polished version live without dragging the project out.",
  },
  {
    id: "clarity",
    label: "Clearer messaging",
    description: "Make the offer easier to understand at a glance.",
  },
  {
    id: "custom",
    label: "Build something custom",
    description: "Create a flow that does not feel like a template or clone.",
  },
];

export const contactHighlights: ContentCard[] = [
  {
    title: "Start with one page or a full build",
    description:
      "Clients can request a homepage, a landing page, a business website, or a larger custom project without overcommitting upfront.",
  },
  {
    title: "Good fit for service businesses and digital products",
    description:
      "The strongest matches are brands that need better trust, clearer structure, and frontend execution that actually feels considered.",
  },
  {
    title: "Remote-friendly collaboration",
    description:
      "Projects can move through async updates, structured checkpoints, and focused review rounds without needing a heavy process.",
  },
];

export const engagementModels: ContentCard[] = [
  {
    title: "Focused sprint",
    description:
      "A tighter engagement for one page, one release, or one urgent improvement that needs quick movement.",
  },
  {
    title: "Core website build",
    description:
      "A multi-page project for businesses that need a sharper structure, stronger visual direction, and cleaner user flow.",
  },
  {
    title: "Custom project build",
    description:
      "A deeper collaboration for web apps, member experiences, product interfaces, or frontend-heavy feature work.",
  },
];

export const requestFaqs = [
  {
    question: "Can I request development from scratch instead of just a redesign?",
    answer:
      "Yes. The site now supports both redesign requests and fresh project builds, including business websites, landing pages, and custom frontend work.",
  },
  {
    question: "What should I include in the request?",
    answer:
      "The most helpful details are what you want built, who it is for, your rough timeline, the pages or features involved, and what result matters most.",
  },
  {
    question: "Do I need a full brief before reaching out?",
    answer:
      "No. Even a rough idea is enough to start. The request form is designed to help shape the brief while the client is filling it out.",
  },
  {
    question: "Can we begin with a small project and expand later?",
    answer:
      "Absolutely. Many projects start with a landing page, homepage, or cleanup sprint and grow into a larger build after the first release.",
  },
];
