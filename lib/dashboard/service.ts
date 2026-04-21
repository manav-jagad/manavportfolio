import {
  requestBudgetOptions,
  requestServiceOptions,
  requestTimelineOptions,
} from "@/data/clientRequest";
import { getDatabase } from "@/lib/dashboard/database";
import {
  CLIENT_STAGES,
  CLIENT_STAGE_LABELS,
  INQUIRY_STATUSES,
  INQUIRY_STATUS_LABELS,
  REMINDER_STATUS_LABELS,
  type BreakdownRow,
  type ClientFilters,
  type ClientStage,
  type ClientSummary,
  type DashboardAnalytics,
  type DashboardMetric,
  type FollowUpReminder,
  type InquiryDetail,
  type InquiryFilters,
  type InquiryNote,
  type InquiryStatus,
  type InquiryStatusHistoryEntry,
  type InquirySubmissionInput,
  type InquirySummary,
  type MonthlyVolumePoint,
  type ReminderFilters,
  type ReminderStatus,
} from "@/lib/dashboard/schema";

type ClientRow = {
  id: number;
  name: string;
  email: string;
  company: string;
  website: string;
  stage: ClientStage;
  notes: string;
  source_page: string;
  created_at: string;
  updated_at: string;
};

type ClientSummaryRow = ClientRow & {
  inquiry_count: number;
  completed_inquiry_count: number;
  last_inquiry_at: string | null;
  next_follow_up_at: string | null;
  latest_inquiry_id: number | null;
  latest_inquiry_title: string | null;
  latest_inquiry_status: InquiryStatus | null;
};

type InquirySummaryRow = {
  id: number;
  client_id: number;
  title: string;
  service_id: string;
  timeline_id: string;
  budget_id: string;
  priorities_json: string;
  pages_scope: string;
  details: string;
  status: InquiryStatus;
  source_page: string;
  submitted_at: string;
  updated_at: string;
  client_name: string;
  client_email: string;
  client_company: string;
  client_website: string;
  client_stage: ClientStage;
  next_follow_up_at: string | null;
  pending_reminder_count: number;
  overdue_reminder_count: number;
};

type InquiryStatusHistoryRow = {
  id: number;
  from_status: InquiryStatus | null;
  to_status: InquiryStatus;
  note: string;
  created_at: string;
};

type InquiryNoteRow = {
  id: number;
  body: string;
  created_at: string;
};

type ReminderRow = {
  id: number;
  inquiry_id: number;
  client_id: number;
  title: string;
  note: string;
  due_at: string;
  status: ReminderStatus;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  client_name?: string;
  client_email?: string;
  inquiry_title?: string;
  inquiry_status?: InquiryStatus;
};

type MetricCountsRow = {
  inquiry_total: number;
  client_total: number;
  open_inquiries: number;
  completed_inquiries: number;
  pending_reminders: number;
  overdue_reminders: number;
};

function parseJsonArray(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function sanitizeOptionalText(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function deriveClientStageFromInquiryStatus(status: InquiryStatus): ClientStage {
  switch (status) {
    case "qualified":
      return "qualified";
    case "proposal_sent":
      return "proposal";
    case "in_progress":
      return "active";
    case "completed":
      return "past";
    case "archived":
    case "lost":
      return "archived";
    case "new":
    default:
      return "lead";
  }
}

function buildInquiryTitle(input: {
  company: string;
  name: string;
  serviceId: string;
}) {
  const serviceLabel = getServiceLabel(input.serviceId);
  const subject = input.company || input.name;
  return `${serviceLabel} enquiry${subject ? ` - ${subject}` : ""}`;
}

function mapInquirySummary(row: InquirySummaryRow): InquirySummary {
  return {
    id: row.id,
    clientId: row.client_id,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientCompany: row.client_company,
    clientWebsite: row.client_website,
    clientStage: row.client_stage,
    title: row.title,
    serviceId: row.service_id,
    timelineId: row.timeline_id,
    budgetId: row.budget_id,
    priorities: parseJsonArray(row.priorities_json),
    pagesScope: row.pages_scope,
    details: row.details,
    status: row.status,
    sourcePage: row.source_page,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
    nextFollowUpAt: row.next_follow_up_at,
    pendingReminderCount: row.pending_reminder_count ?? 0,
    overdueReminderCount: row.overdue_reminder_count ?? 0,
  };
}

function mapInquiryStatusHistory(row: InquiryStatusHistoryRow): InquiryStatusHistoryEntry {
  return {
    id: row.id,
    fromStatus: row.from_status,
    toStatus: row.to_status,
    note: row.note,
    createdAt: row.created_at,
  };
}

function mapInquiryNote(row: InquiryNoteRow): InquiryNote {
  return {
    id: row.id,
    body: row.body,
    createdAt: row.created_at,
  };
}

function mapReminder(row: ReminderRow): FollowUpReminder {
  return {
    id: row.id,
    inquiryId: row.inquiry_id,
    clientId: row.client_id,
    title: row.title,
    note: row.note,
    dueAt: row.due_at,
    status: row.status,
    completedAt: row.completed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    clientName: row.client_name,
    clientEmail: row.client_email,
    inquiryTitle: row.inquiry_title,
    inquiryStatus: row.inquiry_status,
  };
}

function mapClientSummary(row: ClientSummaryRow): ClientSummary {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    website: row.website,
    stage: row.stage,
    notes: row.notes,
    sourcePage: row.source_page,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    inquiryCount: row.inquiry_count ?? 0,
    completedInquiryCount: row.completed_inquiry_count ?? 0,
    lastInquiryAt: row.last_inquiry_at,
    nextFollowUpAt: row.next_follow_up_at,
    latestInquiryId: row.latest_inquiry_id,
    latestInquiryTitle: row.latest_inquiry_title,
    latestInquiryStatus: row.latest_inquiry_status,
  };
}

function getClientByEmail(email: string) {
  const database = getDatabase();

  return database
    .prepare(
      `
        SELECT *
        FROM clients
        WHERE email = ?
        LIMIT 1
      `
    )
    .get<ClientRow>(email.trim().toLowerCase());
}

function upsertClientFromInquiry(input: InquirySubmissionInput) {
  const database = getDatabase();
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = getClientByEmail(normalizedEmail);
  const now = new Date().toISOString();

  if (existing) {
    const nextStage = existing.stage === "archived" ? "lead" : existing.stage;

    database
      .prepare(
        `
          UPDATE clients
          SET
            name = ?,
            company = ?,
            website = ?,
            stage = ?,
            source_page = CASE WHEN source_page = '' THEN ? ELSE source_page END,
            updated_at = ?
          WHERE id = ?
        `
      )
      .run(
        input.name,
        input.company,
        input.website,
        nextStage,
        input.sourcePage,
        now,
        existing.id
      );

    return existing.id;
  }

  const result = database
    .prepare(
      `
        INSERT INTO clients (
          name,
          email,
          company,
          website,
          stage,
          notes,
          source_page,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, 'lead', '', ?, ?, ?)
      `
    )
    .run(
      input.name,
      normalizedEmail,
      input.company,
      input.website,
      input.sourcePage,
      now,
      now
    );

  return Number(result.lastInsertRowid);
}

function touchInquiry(inquiryId: number) {
  getDatabase()
    .prepare("UPDATE inquiries SET updated_at = ? WHERE id = ?")
    .run(new Date().toISOString(), inquiryId);
}

function syncClientStage(clientId: number, stage: ClientStage) {
  getDatabase()
    .prepare("UPDATE clients SET stage = ?, updated_at = ? WHERE id = ?")
    .run(stage, new Date().toISOString(), clientId);
}

function buildInquiryWhereClause(filters: InquiryFilters) {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (filters.status && filters.status !== "all") {
    clauses.push("i.status = ?");
    params.push(filters.status);
  }

  if (filters.query) {
    const query = `%${filters.query.trim()}%`;
    clauses.push(
      `
        (
          c.name LIKE ?
          OR c.email LIKE ?
          OR c.company LIKE ?
          OR i.title LIKE ?
          OR i.details LIKE ?
          OR i.pages_scope LIKE ?
        )
      `
    );
    params.push(query, query, query, query, query, query);
  }

  return {
    whereClause: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
    params,
  };
}

function buildClientWhereClause(filters: ClientFilters) {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (filters.stage && filters.stage !== "all") {
    clauses.push("c.stage = ?");
    params.push(filters.stage);
  }

  if (filters.query) {
    const query = `%${filters.query.trim()}%`;
    clauses.push(
      `
        (
          c.name LIKE ?
          OR c.email LIKE ?
          OR c.company LIKE ?
          OR c.website LIKE ?
        )
      `
    );
    params.push(query, query, query, query);
  }

  return {
    whereClause: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
    params,
  };
}

export function submitPublicInquiry(input: InquirySubmissionInput) {
  const database = getDatabase();
  const clientId = upsertClientFromInquiry(input);
  const now = new Date().toISOString();
  const title = buildInquiryTitle(input);

  const result = database
    .prepare(
      `
        INSERT INTO inquiries (
          client_id,
          title,
          service_id,
          timeline_id,
          budget_id,
          priorities_json,
          pages_scope,
          details,
          status,
          source_page,
          client_ip,
          user_agent,
          submitted_at,
          last_status_changed_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?, ?, ?, ?)
      `
    )
    .run(
      clientId,
      title,
      input.serviceId,
      input.timelineId,
      input.budgetId,
      JSON.stringify(input.priorities),
      input.pagesScope,
      input.details,
      input.sourcePage,
      input.clientIp,
      input.userAgent,
      now,
      now,
      now
    );

  const inquiryId = Number(result.lastInsertRowid);

  database
    .prepare(
      `
        INSERT INTO inquiry_status_history (
          inquiry_id,
          from_status,
          to_status,
          note,
          created_at
        ) VALUES (?, NULL, 'new', ?, ?)
      `
    )
    .run(inquiryId, "Inquiry submitted from the public website.", now);

  return inquiryId;
}

export function listInquiries(filters: InquiryFilters = {}) {
  const database = getDatabase();
  const { whereClause, params } = buildInquiryWhereClause(filters);
  const limitClause =
    typeof filters.limit === "number" && filters.limit > 0 ? `LIMIT ${filters.limit}` : "";

  const rows = database
    .prepare(
      `
        SELECT
          i.id,
          i.client_id,
          i.title,
          i.service_id,
          i.timeline_id,
          i.budget_id,
          i.priorities_json,
          i.pages_scope,
          i.details,
          i.status,
          i.source_page,
          i.submitted_at,
          i.updated_at,
          c.name AS client_name,
          c.email AS client_email,
          c.company AS client_company,
          c.website AS client_website,
          c.stage AS client_stage,
          (
            SELECT MIN(r.due_at)
            FROM follow_up_reminders r
            WHERE r.inquiry_id = i.id AND r.status = 'pending'
          ) AS next_follow_up_at,
          (
            SELECT COUNT(*)
            FROM follow_up_reminders r
            WHERE r.inquiry_id = i.id AND r.status = 'pending'
          ) AS pending_reminder_count,
          (
            SELECT COUNT(*)
            FROM follow_up_reminders r
            WHERE r.inquiry_id = i.id
              AND r.status = 'pending'
              AND datetime(r.due_at) < datetime('now')
          ) AS overdue_reminder_count
        FROM inquiries i
        INNER JOIN clients c ON c.id = i.client_id
        ${whereClause}
        ORDER BY datetime(i.submitted_at) DESC
        ${limitClause}
      `
    )
    .all<InquirySummaryRow>(...params);

  return rows.map(mapInquirySummary);
}

export function getInquiryById(inquiryId: number) {
  const database = getDatabase();
  const inquiryRow = database
    .prepare(
      `
        SELECT
          i.id,
          i.client_id,
          i.title,
          i.service_id,
          i.timeline_id,
          i.budget_id,
          i.priorities_json,
          i.pages_scope,
          i.details,
          i.status,
          i.source_page,
          i.submitted_at,
          i.updated_at,
          c.name AS client_name,
          c.email AS client_email,
          c.company AS client_company,
          c.website AS client_website,
          c.stage AS client_stage,
          (
            SELECT MIN(r.due_at)
            FROM follow_up_reminders r
            WHERE r.inquiry_id = i.id AND r.status = 'pending'
          ) AS next_follow_up_at,
          (
            SELECT COUNT(*)
            FROM follow_up_reminders r
            WHERE r.inquiry_id = i.id AND r.status = 'pending'
          ) AS pending_reminder_count,
          (
            SELECT COUNT(*)
            FROM follow_up_reminders r
            WHERE r.inquiry_id = i.id
              AND r.status = 'pending'
              AND datetime(r.due_at) < datetime('now')
          ) AS overdue_reminder_count
        FROM inquiries i
        INNER JOIN clients c ON c.id = i.client_id
        WHERE i.id = ?
        LIMIT 1
      `
    )
    .get<InquirySummaryRow>(inquiryId);

  if (!inquiryRow) {
    return null;
  }

  const statusHistory = database
    .prepare(
      `
        SELECT
          id,
          from_status,
          to_status,
          note,
          created_at
        FROM inquiry_status_history
        WHERE inquiry_id = ?
        ORDER BY datetime(created_at) DESC
      `
    )
    .all<InquiryStatusHistoryRow>(inquiryId)
    .map(mapInquiryStatusHistory);

  const notes = database
    .prepare(
      `
        SELECT
          id,
          body,
          created_at
        FROM inquiry_notes
        WHERE inquiry_id = ?
        ORDER BY datetime(created_at) DESC
      `
    )
    .all<InquiryNoteRow>(inquiryId)
    .map(mapInquiryNote);

  const reminders = database
    .prepare(
      `
        SELECT
          r.id,
          r.inquiry_id,
          r.client_id,
          r.title,
          r.note,
          r.due_at,
          r.status,
          r.completed_at,
          r.created_at,
          r.updated_at,
          c.name AS client_name,
          c.email AS client_email,
          i.title AS inquiry_title,
          i.status AS inquiry_status
        FROM follow_up_reminders r
        INNER JOIN clients c ON c.id = r.client_id
        INNER JOIN inquiries i ON i.id = r.inquiry_id
        WHERE r.inquiry_id = ?
        ORDER BY
          CASE WHEN r.status = 'pending' THEN 0 ELSE 1 END,
          datetime(r.due_at) ASC
      `
    )
    .all<ReminderRow>(inquiryId)
    .map(mapReminder);

  const summary = mapInquirySummary(inquiryRow);

  return {
    ...summary,
    statusHistory,
    notes,
    reminders,
  } satisfies InquiryDetail;
}

export function updateInquiryStatus(input: {
  inquiryId: number;
  status: InquiryStatus;
  note?: string;
}) {
  const inquiry = getInquiryById(input.inquiryId);

  if (!inquiry) {
    return null;
  }

  const note = sanitizeOptionalText(input.note ?? "", 300);
  const now = new Date().toISOString();

  getDatabase()
    .prepare(
      `
        UPDATE inquiries
        SET
          status = ?,
          last_status_changed_at = ?,
          updated_at = ?
        WHERE id = ?
      `
    )
    .run(input.status, now, now, input.inquiryId);

  getDatabase()
    .prepare(
      `
        INSERT INTO inquiry_status_history (
          inquiry_id,
          from_status,
          to_status,
          note,
          created_at
        ) VALUES (?, ?, ?, ?, ?)
      `
    )
    .run(
      input.inquiryId,
      inquiry.status,
      input.status,
      note || `Status changed to ${INQUIRY_STATUS_LABELS[input.status]}.`,
      now
    );

  syncClientStage(inquiry.clientId, deriveClientStageFromInquiryStatus(input.status));

  return getInquiryById(input.inquiryId);
}

export function addInquiryNote(input: { inquiryId: number; body: string }) {
  const inquiry = getInquiryById(input.inquiryId);

  if (!inquiry) {
    return null;
  }

  const body = sanitizeOptionalText(input.body, 2400);

  if (!body) {
    return inquiry;
  }

  const now = new Date().toISOString();

  getDatabase()
    .prepare(
      `
        INSERT INTO inquiry_notes (
          inquiry_id,
          body,
          created_at
        ) VALUES (?, ?, ?)
      `
    )
    .run(input.inquiryId, body, now);

  touchInquiry(input.inquiryId);

  return getInquiryById(input.inquiryId);
}

export function createFollowUpReminder(input: {
  inquiryId: number;
  title: string;
  note?: string;
  dueAt: string;
}) {
  const inquiry = getInquiryById(input.inquiryId);

  if (!inquiry) {
    return null;
  }

  const title = sanitizeOptionalText(input.title, 120);
  const note = sanitizeOptionalText(input.note ?? "", 600);
  const dueAt = new Date(input.dueAt);

  if (!title || Number.isNaN(dueAt.getTime())) {
    throw new Error("A valid follow-up title and date are required.");
  }

  const now = new Date().toISOString();

  getDatabase()
    .prepare(
      `
        INSERT INTO follow_up_reminders (
          inquiry_id,
          client_id,
          title,
          note,
          due_at,
          status,
          completed_at,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, 'pending', NULL, ?, ?)
      `
    )
    .run(
      input.inquiryId,
      inquiry.clientId,
      title,
      note,
      dueAt.toISOString(),
      now,
      now
    );

  touchInquiry(input.inquiryId);

  return getInquiryById(input.inquiryId);
}

export function updateFollowUpReminderStatus(input: {
  reminderId: number;
  status: ReminderStatus;
}) {
  const database = getDatabase();
  const reminder = database
    .prepare(
      `
        SELECT *
        FROM follow_up_reminders
        WHERE id = ?
        LIMIT 1
      `
    )
    .get<ReminderRow>(input.reminderId);

  if (!reminder) {
    return null;
  }

  const now = new Date().toISOString();
  const completedAt = input.status === "completed" ? now : null;

  database
    .prepare(
      `
        UPDATE follow_up_reminders
        SET
          status = ?,
          completed_at = ?,
          updated_at = ?
        WHERE id = ?
      `
    )
    .run(input.status, completedAt, now, input.reminderId);

  touchInquiry(reminder.inquiry_id);

  return getInquiryById(reminder.inquiry_id);
}

export function listFollowUpReminders(filters: ReminderFilters = {}) {
  const database = getDatabase();
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (filters.status && filters.status !== "all") {
    clauses.push("r.status = ?");
    params.push(filters.status);
  }

  if (typeof filters.inquiryId === "number" && filters.inquiryId > 0) {
    clauses.push("r.inquiry_id = ?");
    params.push(filters.inquiryId);
  }

  const whereClause = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const limitClause =
    typeof filters.limit === "number" && filters.limit > 0 ? `LIMIT ${filters.limit}` : "";

  const rows = database
    .prepare(
      `
        SELECT
          r.id,
          r.inquiry_id,
          r.client_id,
          r.title,
          r.note,
          r.due_at,
          r.status,
          r.completed_at,
          r.created_at,
          r.updated_at,
          c.name AS client_name,
          c.email AS client_email,
          i.title AS inquiry_title,
          i.status AS inquiry_status
        FROM follow_up_reminders r
        INNER JOIN clients c ON c.id = r.client_id
        INNER JOIN inquiries i ON i.id = r.inquiry_id
        ${whereClause}
        ORDER BY
          CASE WHEN r.status = 'pending' THEN 0 ELSE 1 END,
          datetime(r.due_at) ASC
        ${limitClause}
      `
    )
    .all<ReminderRow>(...params);

  return rows.map(mapReminder);
}

export function listClients(filters: ClientFilters = {}) {
  const database = getDatabase();
  const { whereClause, params } = buildClientWhereClause(filters);
  const rows = database
    .prepare(
      `
        SELECT
          c.id,
          c.name,
          c.email,
          c.company,
          c.website,
          c.stage,
          c.notes,
          c.source_page,
          c.created_at,
          c.updated_at,
          COUNT(i.id) AS inquiry_count,
          SUM(CASE WHEN i.status = 'completed' THEN 1 ELSE 0 END) AS completed_inquiry_count,
          MAX(i.submitted_at) AS last_inquiry_at,
          (
            SELECT MIN(r.due_at)
            FROM follow_up_reminders r
            WHERE r.client_id = c.id AND r.status = 'pending'
          ) AS next_follow_up_at,
          (
            SELECT i2.id
            FROM inquiries i2
            WHERE i2.client_id = c.id
            ORDER BY datetime(i2.submitted_at) DESC
            LIMIT 1
          ) AS latest_inquiry_id,
          (
            SELECT i2.title
            FROM inquiries i2
            WHERE i2.client_id = c.id
            ORDER BY datetime(i2.submitted_at) DESC
            LIMIT 1
          ) AS latest_inquiry_title,
          (
            SELECT i2.status
            FROM inquiries i2
            WHERE i2.client_id = c.id
            ORDER BY datetime(i2.submitted_at) DESC
            LIMIT 1
          ) AS latest_inquiry_status
        FROM clients c
        LEFT JOIN inquiries i ON i.client_id = c.id
        ${whereClause}
        GROUP BY c.id
        ORDER BY COALESCE(MAX(datetime(i.submitted_at)), datetime(c.created_at)) DESC
      `
    )
    .all<ClientSummaryRow>(...params);

  return rows.map(mapClientSummary);
}

export function updateClientStage(input: { clientId: number; stage: ClientStage }) {
  getDatabase()
    .prepare(
      `
        UPDATE clients
        SET
          stage = ?,
          updated_at = ?
        WHERE id = ?
      `
    )
    .run(input.stage, new Date().toISOString(), input.clientId);

  return listClients().find((client) => client.id === input.clientId) ?? null;
}

export function updateClientNotes(input: { clientId: number; notes: string }) {
  const notes = sanitizeOptionalText(input.notes, 2400);

  getDatabase()
    .prepare(
      `
        UPDATE clients
        SET
          notes = ?,
          updated_at = ?
        WHERE id = ?
      `
    )
    .run(notes, new Date().toISOString(), input.clientId);

  return listClients().find((client) => client.id === input.clientId) ?? null;
}

function getBreakdownRows(
  sql: string,
  params: unknown[],
  labels: Record<string, string>
): BreakdownRow[] {
  const rows = getDatabase()
    .prepare(sql)
    .all<{ key: string; total: number }>(...params);

  return rows.map((row) => ({
    key: row.key,
    label: labels[row.key] ?? row.key,
    value: row.total,
  }));
}

function buildMonthlyVolumePoints() {
  const start = new Date();
  start.setMonth(start.getMonth() - 5, 1);
  start.setHours(0, 0, 0, 0);

  const rows = getDatabase()
    .prepare(
      `
        SELECT submitted_at
        FROM inquiries
        WHERE datetime(submitted_at) >= datetime(?)
        ORDER BY datetime(submitted_at) ASC
      `
    )
    .all<{ submitted_at: string }>(start.toISOString());

  const bucketMap = new Map<string, number>();
  const buckets: MonthlyVolumePoint[] = [];

  for (let index = 0; index < 6; index += 1) {
    const pointDate = new Date(start);
    pointDate.setMonth(start.getMonth() + index, 1);
    const key = `${pointDate.getUTCFullYear()}-${String(pointDate.getUTCMonth() + 1).padStart(2, "0")}`;
    const label = pointDate.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
    bucketMap.set(key, 0);
    buckets.push({ label, value: 0 });
  }

  rows.forEach((row) => {
    const date = new Date(row.submitted_at);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    const currentValue = bucketMap.get(key);

    if (typeof currentValue === "number") {
      bucketMap.set(key, currentValue + 1);
    }
  });

  return buckets.map((point, index) => {
    const pointDate = new Date(start);
    pointDate.setMonth(start.getMonth() + index, 1);
    const key = `${pointDate.getUTCFullYear()}-${String(pointDate.getUTCMonth() + 1).padStart(2, "0")}`;

    return {
      ...point,
      value: bucketMap.get(key) ?? 0,
    };
  });
}

export function getDashboardAnalytics() {
  const counts = getDatabase()
    .prepare(
      `
        SELECT
          (SELECT COUNT(*) FROM inquiries) AS inquiry_total,
          (SELECT COUNT(*) FROM clients) AS client_total,
          (
            SELECT COUNT(*)
            FROM inquiries
            WHERE status IN ('new', 'qualified', 'proposal_sent', 'in_progress')
          ) AS open_inquiries,
          (SELECT COUNT(*) FROM inquiries WHERE status = 'completed') AS completed_inquiries,
          (SELECT COUNT(*) FROM follow_up_reminders WHERE status = 'pending') AS pending_reminders,
          (
            SELECT COUNT(*)
            FROM follow_up_reminders
            WHERE status = 'pending' AND datetime(due_at) < datetime('now')
          ) AS overdue_reminders
      `
    )
    .get<MetricCountsRow>();

  const metrics: DashboardMetric[] = [
    {
      label: "Total inquiries",
      value: counts?.inquiry_total ?? 0,
      detail: "Every public project inquiry captured in the dashboard.",
    },
    {
      label: "Open pipeline",
      value: counts?.open_inquiries ?? 0,
      detail: "Inquiries still being qualified, proposed, or delivered.",
    },
    {
      label: "Clients",
      value: counts?.client_total ?? 0,
      detail: "Unique people or companies linked to your inquiries.",
    },
    {
      label: "Completed projects",
      value: counts?.completed_inquiries ?? 0,
      detail: "Inquiries that made it through to completion.",
    },
    {
      label: "Pending follow-ups",
      value: counts?.pending_reminders ?? 0,
      detail: "Reminders that still need action.",
    },
    {
      label: "Overdue follow-ups",
      value: counts?.overdue_reminders ?? 0,
      detail: "Reminders whose due time is already in the past.",
    },
  ];

  const statusBreakdown = getBreakdownRows(
    `
      SELECT status AS key, COUNT(*) AS total
      FROM inquiries
      GROUP BY status
      ORDER BY total DESC, status ASC
    `,
    [],
    INQUIRY_STATUS_LABELS
  );

  const clientStageBreakdown = getBreakdownRows(
    `
      SELECT stage AS key, COUNT(*) AS total
      FROM clients
      GROUP BY stage
      ORDER BY total DESC, stage ASC
    `,
    [],
    CLIENT_STAGE_LABELS
  );

  const serviceLabelMap = requestServiceOptions.reduce<Record<string, string>>((accumulator, item) => {
    accumulator[item.id] = item.label;
    return accumulator;
  }, {});

  const serviceBreakdown = getBreakdownRows(
    `
      SELECT service_id AS key, COUNT(*) AS total
      FROM inquiries
      GROUP BY service_id
      ORDER BY total DESC, service_id ASC
    `,
    [],
    serviceLabelMap
  );

  return {
    metrics,
    statusBreakdown,
    clientStageBreakdown,
    serviceBreakdown,
    monthlyInquiryVolume: buildMonthlyVolumePoints(),
    recentInquiries: listInquiries({ limit: 5 }),
    urgentReminders: listFollowUpReminders({ status: "pending", limit: 6 }),
  } satisfies DashboardAnalytics;
}

export function formatDashboardDate(dateString?: string | null) {
  if (!dateString) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

export function formatDashboardDateOnly(dateString?: string | null) {
  if (!dateString) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(dateString));
}

export function getServiceLabel(serviceId: string) {
  return requestServiceOptions.find((item) => item.id === serviceId)?.label ?? serviceId;
}

export function getTimelineLabel(timelineId: string) {
  return requestTimelineOptions.find((item) => item.id === timelineId)?.label ?? timelineId;
}

export function getBudgetLabel(budgetId: string) {
  return requestBudgetOptions.find((item) => item.id === budgetId)?.label ?? budgetId;
}

export function getInquiryStatusLabel(status: InquiryStatus) {
  return INQUIRY_STATUS_LABELS[status];
}

export function getClientStageLabel(stage: ClientStage) {
  return CLIENT_STAGE_LABELS[stage];
}

export function getReminderStatusLabel(status: ReminderStatus) {
  return REMINDER_STATUS_LABELS[status];
}

export function isReminderOverdue(reminder: Pick<FollowUpReminder, "dueAt" | "status">) {
  return reminder.status === "pending" && new Date(reminder.dueAt).getTime() < Date.now();
}

export function getAllInquiryStatuses() {
  return [...INQUIRY_STATUSES];
}

export function getAllClientStages() {
  return [...CLIENT_STAGES];
}
