import {
  requestBudgetOptions,
  requestPriorityOptions,
  requestServiceOptions,
  requestTimelineOptions,
} from "@/data/clientRequest";
import type { InquirySubmissionInput } from "@/lib/dashboard/schema";

const validServiceIds = new Set(requestServiceOptions.map((item) => item.id));
const validTimelineIds = new Set(requestTimelineOptions.map((item) => item.id));
const validBudgetIds = new Set(requestBudgetOptions.map((item) => item.id));
const validPriorityIds = new Set(requestPriorityOptions.map((item) => item.id));

type ValidInquiryPayload = Omit<InquirySubmissionInput, "clientIp" | "userAgent">;

export type InquiryValidationResult =
  | { success: true; data: ValidInquiryPayload }
  | { success: false; message: string };

function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function validateInquirySubmissionPayload(
  payload: unknown
): InquiryValidationResult {
  if (!payload || typeof payload !== "object") {
    return {
      success: false,
      message: "Inquiry payload is missing.",
    };
  }

  const candidate = payload as Record<string, unknown>;
  const name = sanitizeText(candidate.name, 80);
  const email = sanitizeText(candidate.email, 120).toLowerCase();
  const company = sanitizeText(candidate.company, 120);
  const website = sanitizeText(candidate.website, 160);
  const serviceId = sanitizeText(candidate.serviceId, 60);
  const timelineId = sanitizeText(candidate.timelineId, 60);
  const budgetId = sanitizeText(candidate.budgetId, 60);
  const pagesScope = sanitizeText(candidate.pagesScope, 220);
  const sourcePage = sanitizeText(candidate.sourcePage, 40) || "contact";
  const details =
    typeof candidate.details === "string"
      ? candidate.details.replace(/\s+/g, " ").trim().slice(0, 3000)
      : "";
  const priorities = Array.isArray(candidate.priorities)
    ? candidate.priorities
        .map((item) => sanitizeText(item, 60))
        .filter((item, index, array) => item && array.indexOf(item) === index)
        .filter((item) => validPriorityIds.has(item))
    : [];

  if (!name || name.length < 2) {
    return {
      success: false,
      message: "Please enter a valid name.",
    };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  if (!validServiceIds.has(serviceId)) {
    return {
      success: false,
      message: "Please choose a valid service type.",
    };
  }

  if (!validTimelineIds.has(timelineId)) {
    return {
      success: false,
      message: "Please choose a valid timeline.",
    };
  }

  if (!validBudgetIds.has(budgetId)) {
    return {
      success: false,
      message: "Please choose a valid budget range.",
    };
  }

  if (!priorities.length) {
    return {
      success: false,
      message: "Please choose at least one priority.",
    };
  }

  if (!pagesScope || pagesScope.length < 4) {
    return {
      success: false,
      message: "Please describe the pages or features needed.",
    };
  }

  if (!details || details.length < 20) {
    return {
      success: false,
      message: "Please share a little more project detail.",
    };
  }

  return {
    success: true,
    data: {
      name,
      email,
      company,
      website,
      serviceId,
      timelineId,
      budgetId,
      priorities,
      pagesScope,
      details,
      sourcePage,
    },
  };
}
