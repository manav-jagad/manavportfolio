export const INQUIRY_STATUSES = [
  "new",
  "qualified",
  "proposal_sent",
  "in_progress",
  "completed",
  "archived",
  "lost",
] as const;

export const CLIENT_STAGES = [
  "lead",
  "qualified",
  "proposal",
  "active",
  "past",
  "archived",
] as const;

export const REMINDER_STATUSES = ["pending", "completed", "dismissed"] as const;

export const INQUIRY_STATUS_LABELS = {
  new: "New",
  qualified: "Qualified",
  proposal_sent: "Proposal sent",
  in_progress: "In progress",
  completed: "Completed",
  archived: "Archived",
  lost: "Lost",
} as const;

export const CLIENT_STAGE_LABELS = {
  lead: "Lead",
  qualified: "Qualified",
  proposal: "Proposal",
  active: "Active",
  past: "Past client",
  archived: "Archived",
} as const;

export const REMINDER_STATUS_LABELS = {
  pending: "Pending",
  completed: "Completed",
  dismissed: "Dismissed",
} as const;

export const LEGACY_REQUEST_STATUS_MAP = {
  new: "new",
  reviewing: "qualified",
  in_progress: "in_progress",
  completed: "completed",
  archived: "archived",
} as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
export type ClientStage = (typeof CLIENT_STAGES)[number];
export type ReminderStatus = (typeof REMINDER_STATUSES)[number];

export type InquirySubmissionInput = {
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
  sourcePage: string;
  clientIp: string;
  userAgent: string;
};

export type InquiryFilters = {
  query?: string;
  status?: InquiryStatus | "all";
  limit?: number;
};

export type ClientFilters = {
  query?: string;
  stage?: ClientStage | "all";
};

export type ReminderFilters = {
  status?: ReminderStatus | "all";
  limit?: number;
  inquiryId?: number;
};

export type InquirySummary = {
  id: number;
  clientId: number;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientWebsite: string;
  clientStage: ClientStage;
  title: string;
  serviceId: string;
  timelineId: string;
  budgetId: string;
  priorities: string[];
  pagesScope: string;
  details: string;
  status: InquiryStatus;
  sourcePage: string;
  submittedAt: string;
  updatedAt: string;
  nextFollowUpAt: string | null;
  pendingReminderCount: number;
  overdueReminderCount: number;
};

export type InquiryStatusHistoryEntry = {
  id: number;
  fromStatus: InquiryStatus | null;
  toStatus: InquiryStatus;
  note: string;
  createdAt: string;
};

export type InquiryNote = {
  id: number;
  body: string;
  createdAt: string;
};

export type FollowUpReminder = {
  id: number;
  inquiryId: number;
  clientId: number;
  title: string;
  note: string;
  dueAt: string;
  status: ReminderStatus;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  clientName?: string;
  clientEmail?: string;
  inquiryTitle?: string;
  inquiryStatus?: InquiryStatus;
};

export type InquiryDetail = InquirySummary & {
  statusHistory: InquiryStatusHistoryEntry[];
  notes: InquiryNote[];
  reminders: FollowUpReminder[];
};

export type ClientSummary = {
  id: number;
  name: string;
  email: string;
  company: string;
  website: string;
  stage: ClientStage;
  notes: string;
  sourcePage: string;
  createdAt: string;
  updatedAt: string;
  inquiryCount: number;
  completedInquiryCount: number;
  lastInquiryAt: string | null;
  nextFollowUpAt: string | null;
  latestInquiryId: number | null;
  latestInquiryTitle: string | null;
  latestInquiryStatus: InquiryStatus | null;
};

export type DashboardMetric = {
  label: string;
  value: number;
  detail: string;
};

export type BreakdownRow = {
  key: string;
  label: string;
  value: number;
};

export type MonthlyVolumePoint = {
  label: string;
  value: number;
};

export type DashboardAnalytics = {
  metrics: DashboardMetric[];
  statusBreakdown: BreakdownRow[];
  clientStageBreakdown: BreakdownRow[];
  serviceBreakdown: BreakdownRow[];
  monthlyInquiryVolume: MonthlyVolumePoint[];
  recentInquiries: InquirySummary[];
  urgentReminders: FollowUpReminder[];
};

export function isInquiryStatus(value: string): value is InquiryStatus {
  return INQUIRY_STATUSES.includes(value as InquiryStatus);
}

export function isClientStage(value: string): value is ClientStage {
  return CLIENT_STAGES.includes(value as ClientStage);
}

export function isReminderStatus(value: string): value is ReminderStatus {
  return REMINDER_STATUSES.includes(value as ReminderStatus);
}
