import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { requestServiceOptions } from "@/data/clientRequest";
import {
  CLIENT_STAGES,
  INQUIRY_STATUSES,
  LEGACY_REQUEST_STATUS_MAP,
  REMINDER_STATUSES,
  type ClientStage,
  type InquiryStatus,
} from "@/lib/dashboard/schema";

// @ts-expect-error Node runtime provides node:sqlite, but the current type package does not.
import { DatabaseSync } from "node:sqlite";

type SqliteRunResult = {
  changes: number;
  lastInsertRowid: number | bigint;
};

type SqliteStatement = {
  all<T>(...params: unknown[]): T[];
  get<T>(...params: unknown[]): T | undefined;
  run(...params: unknown[]): SqliteRunResult;
};

export type SqliteDatabase = {
  exec(sql: string): void;
  prepare(sql: string): SqliteStatement;
};

type MetaRow = {
  value: string;
};

type LegacyProjectRequestRow = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  service_id: string;
  timeline_id: string;
  budget_id: string;
  priorities_json: string;
  pages_scope: string;
  details: string;
  status: keyof typeof LEGACY_REQUEST_STATUS_MAP;
  admin_notes: string | null;
  source_page: string | null;
  client_ip: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
};

type ClientIdRow = {
  id: number;
};

declare global {
  var __manavDashboardDatabase: SqliteDatabase | undefined;
}

const DASHBOARD_SCHEMA_VERSION = "2";
const DASHBOARD_DATABASE_NAME = "manav-studio.sqlite";

function getDatabasePath() {
  const storageDirectory = path.join(process.cwd(), "storage");

  if (!existsSync(storageDirectory)) {
    mkdirSync(storageDirectory, { recursive: true });
  }

  return path.join(storageDirectory, DASHBOARD_DATABASE_NAME);
}

function getMeta(database: SqliteDatabase, key: string) {
  const row = database
    .prepare("SELECT value FROM app_meta WHERE key = ? LIMIT 1")
    .get<MetaRow>(key);

  return row?.value ?? null;
}

function setMeta(database: SqliteDatabase, key: string, value: string) {
  database
    .prepare(
      `
        INSERT INTO app_meta (key, value)
        VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `
    )
    .run(key, value);
}

function getServiceLabel(serviceId: string) {
  return requestServiceOptions.find((item) => item.id === serviceId)?.label ?? serviceId;
}

function buildMigratedInquiryTitle(row: LegacyProjectRequestRow) {
  const subject = row.company?.trim() || row.name.trim();
  return `${getServiceLabel(row.service_id)} enquiry${subject ? ` - ${subject}` : ""}`;
}

function deriveClientStage(status: InquiryStatus): ClientStage {
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

function ensureClientFromLegacy(database: SqliteDatabase, row: LegacyProjectRequestRow) {
  const normalizedEmail = row.email.trim().toLowerCase();
  const existing = database
    .prepare("SELECT id FROM clients WHERE email = ? LIMIT 1")
    .get<ClientIdRow>(normalizedEmail);

  if (existing) {
    database
      .prepare(
        `
          UPDATE clients
          SET
            name = ?,
            company = ?,
            website = ?,
            source_page = CASE WHEN source_page = '' THEN ? ELSE source_page END,
            updated_at = ?
          WHERE id = ?
        `
      )
      .run(
        row.name.trim(),
        row.company?.trim() ?? "",
        row.website?.trim() ?? "",
        row.source_page?.trim() ?? "",
        row.updated_at,
        existing.id
      );

    return existing.id;
  }

  const migratedStatus = LEGACY_REQUEST_STATUS_MAP[row.status] ?? "new";
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
        ) VALUES (?, ?, ?, ?, ?, '', ?, ?, ?)
      `
    )
    .run(
      row.name.trim(),
      normalizedEmail,
      row.company?.trim() ?? "",
      row.website?.trim() ?? "",
      deriveClientStage(migratedStatus),
      row.source_page?.trim() ?? "",
      row.created_at,
      row.updated_at
    );

  return Number(result.lastInsertRowid);
}

function migrateLegacyProjectRequests(database: SqliteDatabase) {
  if (getMeta(database, "legacy_project_requests_migrated") === "1") {
    return;
  }

  const legacyTable = database
    .prepare(
      `
        SELECT name
        FROM sqlite_master
        WHERE type = 'table' AND name = 'project_requests'
        LIMIT 1
      `
    )
    .get<{ name: string }>();

  if (!legacyTable) {
    setMeta(database, "legacy_project_requests_migrated", "1");
    return;
  }

  const rows = database
    .prepare(
      `
        SELECT *
        FROM project_requests
        ORDER BY id ASC
      `
    )
    .all<LegacyProjectRequestRow>();

  rows.forEach((row) => {
    const existing = database
      .prepare("SELECT id FROM inquiries WHERE id = ? LIMIT 1")
      .get<ClientIdRow>(row.id);

    if (existing) {
      return;
    }

    const clientId = ensureClientFromLegacy(database, row);
    const migratedStatus = LEGACY_REQUEST_STATUS_MAP[row.status] ?? "new";

    database
      .prepare(
        `
          INSERT INTO inquiries (
            id,
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
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
      )
      .run(
        row.id,
        clientId,
        buildMigratedInquiryTitle(row),
        row.service_id,
        row.timeline_id,
        row.budget_id,
        row.priorities_json,
        row.pages_scope,
        row.details,
        migratedStatus,
        row.source_page?.trim() ?? "",
        row.client_ip?.trim() ?? "",
        row.user_agent?.trim() ?? "",
        row.created_at,
        row.updated_at,
        row.updated_at
      );

    database
      .prepare(
        `
          INSERT INTO inquiry_status_history (
            inquiry_id,
            from_status,
            to_status,
            note,
            created_at
          ) VALUES (?, NULL, ?, ?, ?)
        `
      )
      .run(
        row.id,
        migratedStatus,
        "Migrated from the legacy project request inbox.",
        row.updated_at
      );

    if (row.admin_notes?.trim()) {
      database
        .prepare(
          `
            INSERT INTO inquiry_notes (
              inquiry_id,
              body,
              created_at
            ) VALUES (?, ?, ?)
          `
        )
        .run(row.id, row.admin_notes.trim(), row.updated_at);
    }
  });

  setMeta(database, "legacy_project_requests_migrated", "1");
}

function ensureDashboardTables(database: SqliteDatabase) {
  const inquiryStatusConstraint = INQUIRY_STATUSES.map((value) => `'${value}'`).join(", ");
  const clientStageConstraint = CLIENT_STAGES.map((value) => `'${value}'`).join(", ");
  const reminderStatusConstraint = REMINDER_STATUSES.map((value) => `'${value}'`).join(", ");

  database.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL DEFAULT '',
      website TEXT NOT NULL DEFAULT '',
      stage TEXT NOT NULL DEFAULT 'lead' CHECK (stage IN (${clientStageConstraint})),
      notes TEXT NOT NULL DEFAULT '',
      source_page TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_clients_email
    ON clients(email);

    CREATE INDEX IF NOT EXISTS idx_clients_stage
    ON clients(stage);

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      service_id TEXT NOT NULL,
      timeline_id TEXT NOT NULL,
      budget_id TEXT NOT NULL,
      priorities_json TEXT NOT NULL,
      pages_scope TEXT NOT NULL,
      details TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (${inquiryStatusConstraint})),
      source_page TEXT NOT NULL DEFAULT '',
      client_ip TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT '',
      submitted_at TEXT NOT NULL,
      last_status_changed_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_inquiries_client_id
    ON inquiries(client_id);

    CREATE INDEX IF NOT EXISTS idx_inquiries_status
    ON inquiries(status);

    CREATE INDEX IF NOT EXISTS idx_inquiries_submitted_at
    ON inquiries(submitted_at DESC);

    CREATE TABLE IF NOT EXISTS inquiry_status_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inquiry_id INTEGER NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
      from_status TEXT,
      to_status TEXT NOT NULL CHECK (to_status IN (${inquiryStatusConstraint})),
      note TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_inquiry_status_history_inquiry
    ON inquiry_status_history(inquiry_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS inquiry_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inquiry_id INTEGER NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_inquiry_notes_inquiry
    ON inquiry_notes(inquiry_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS follow_up_reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inquiry_id INTEGER NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
      client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      note TEXT NOT NULL DEFAULT '',
      due_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (${reminderStatusConstraint})),
      completed_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_follow_up_reminders_due_at
    ON follow_up_reminders(due_at ASC);

    CREATE INDEX IF NOT EXISTS idx_follow_up_reminders_status
    ON follow_up_reminders(status);

    CREATE INDEX IF NOT EXISTS idx_follow_up_reminders_inquiry
    ON follow_up_reminders(inquiry_id, due_at ASC);
  `);
}

export function getDatabase() {
  if (!globalThis.__manavDashboardDatabase) {
    const database = new DatabaseSync(getDatabasePath()) as SqliteDatabase;

    ensureDashboardTables(database);
    migrateLegacyProjectRequests(database);
    setMeta(database, "dashboard_schema_version", DASHBOARD_SCHEMA_VERSION);

    globalThis.__manavDashboardDatabase = database;
  }

  return globalThis.__manavDashboardDatabase;
}
