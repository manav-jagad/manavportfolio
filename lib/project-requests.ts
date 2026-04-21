import type { InquiryStatus, InquirySubmissionInput } from "@/lib/dashboard/schema";
import {
  addInquiryNote,
  formatDashboardDate,
  getInquiryById,
  listInquiries,
  submitPublicInquiry,
  updateInquiryStatus,
} from "@/lib/dashboard/service";

export const REQUEST_STATUSES = [
  "new",
  "reviewing",
  "in_progress",
  "completed",
  "archived",
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export type ProjectRequestInput = InquirySubmissionInput;

export type ProjectRequestRecord = {
  id: number;
  name: string;
  email: string;
  company: string;
  website: string;
  serviceId: string;
  timelineId: string;
  budgetId: string;
  priorities: string[];
  pagesScope: string;
  details: string;
  status: RequestStatus;
  adminNotes: string;
  sourcePage: string;
  clientIp: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectRequestCounts = {
  total: number;
  byStatus: Record<RequestStatus, number>;
};

function mapInquiryStatusToRequestStatus(status: InquiryStatus): RequestStatus {
  switch (status) {
    case "qualified":
    case "proposal_sent":
      return "reviewing";
    case "in_progress":
      return "in_progress";
    case "completed":
      return "completed";
    case "archived":
    case "lost":
      return "archived";
    case "new":
    default:
      return "new";
  }
}

function mapRequestStatusToInquiryStatus(status: RequestStatus): InquiryStatus {
  switch (status) {
    case "reviewing":
      return "qualified";
    case "in_progress":
      return "in_progress";
    case "completed":
      return "completed";
    case "archived":
      return "archived";
    case "new":
    default:
      return "new";
  }
}

function toProjectRequestRecord(inquiryId: number) {
  const inquiry = getInquiryById(inquiryId);

  if (!inquiry) {
    return null;
  }

  return {
    id: inquiry.id,
    name: inquiry.clientName,
    email: inquiry.clientEmail,
    company: inquiry.clientCompany,
    website: inquiry.clientWebsite,
    serviceId: inquiry.serviceId,
    timelineId: inquiry.timelineId,
    budgetId: inquiry.budgetId,
    priorities: inquiry.priorities,
    pagesScope: inquiry.pagesScope,
    details: inquiry.details,
    status: mapInquiryStatusToRequestStatus(inquiry.status),
    adminNotes: inquiry.notes.map((note) => note.body).join("\n\n"),
    sourcePage: inquiry.sourcePage,
    clientIp: "",
    userAgent: "",
    createdAt: inquiry.submittedAt,
    updatedAt: inquiry.updatedAt,
  } satisfies ProjectRequestRecord;
}

export function createProjectRequest(input: ProjectRequestInput) {
  return submitPublicInquiry(input);
}

export function listProjectRequests(status?: RequestStatus) {
  const inquiries = listInquiries({
    status: status ? mapRequestStatusToInquiryStatus(status) : "all",
  });

  return inquiries
    .map((inquiry) => toProjectRequestRecord(inquiry.id))
    .filter((inquiry): inquiry is ProjectRequestRecord => Boolean(inquiry));
}

export function getProjectRequestById(id: number) {
  return toProjectRequestRecord(id);
}

export function getProjectRequestCounts(): ProjectRequestCounts {
  const requests = listProjectRequests();
  const byStatus = REQUEST_STATUSES.reduce<Record<RequestStatus, number>>(
    (accumulator, status) => {
      accumulator[status] = 0;
      return accumulator;
    },
    {} as Record<RequestStatus, number>
  );

  requests.forEach((request) => {
    byStatus[request.status] += 1;
  });

  return {
    total: requests.length,
    byStatus,
  };
}

export function updateProjectRequest(
  id: number,
  updates: {
    status?: RequestStatus;
    adminNotes?: string;
  }
) {
  if (updates.status) {
    updateInquiryStatus({
      inquiryId: id,
      status: mapRequestStatusToInquiryStatus(updates.status),
    });
  }

  if (updates.adminNotes?.trim()) {
    addInquiryNote({
      inquiryId: id,
      body: updates.adminNotes,
    });
  }

  return getProjectRequestById(id);
}

export function formatRequestDate(dateString: string) {
  return formatDashboardDate(dateString);
}
