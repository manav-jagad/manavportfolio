"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  isClientStage,
  isInquiryStatus,
  isReminderStatus,
} from "@/lib/dashboard/schema";
import {
  addInquiryNote,
  createFollowUpReminder,
  updateClientNotes,
  updateClientStage,
  updateFollowUpReminderStatus,
  updateInquiryStatus,
} from "@/lib/dashboard/service";

function parseId(formData: FormData, field: string) {
  const rawValue = String(formData.get(field) || "");
  const parsedValue = Number.parseInt(rawValue, 10);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`Invalid ${field}.`);
  }

  return parsedValue;
}

function getRedirectTarget(formData: FormData, fallback: string) {
  const redirectTo = String(formData.get("redirectTo") || "").trim();
  return redirectTo || fallback;
}

function revalidateAdminRoutes(inquiryId?: number) {
  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/follow-ups");
  revalidatePath("/admin/clients");

  if (inquiryId) {
    revalidatePath(`/admin/inquiries/${inquiryId}`);
  }
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdminSession();

  const inquiryId = parseId(formData, "inquiryId");
  const status = String(formData.get("status") || "").trim();
  const note = String(formData.get("note") || "");

  if (!isInquiryStatus(status)) {
    throw new Error("Invalid inquiry status.");
  }

  updateInquiryStatus({
    inquiryId,
    status,
    note,
  });

  revalidateAdminRoutes(inquiryId);
  redirect(`${getRedirectTarget(formData, `/admin/inquiries/${inquiryId}`)}?saved=status`);
}

export async function addInquiryNoteAction(formData: FormData) {
  await requireAdminSession();

  const inquiryId = parseId(formData, "inquiryId");
  const body = String(formData.get("body") || "");

  addInquiryNote({
    inquiryId,
    body,
  });

  revalidateAdminRoutes(inquiryId);
  redirect(`${getRedirectTarget(formData, `/admin/inquiries/${inquiryId}`)}?saved=note`);
}

export async function scheduleFollowUpReminderAction(formData: FormData) {
  await requireAdminSession();

  const inquiryId = parseId(formData, "inquiryId");
  const title = String(formData.get("title") || "");
  const note = String(formData.get("note") || "");
  const dueAt = String(formData.get("dueAt") || "").trim();

  createFollowUpReminder({
    inquiryId,
    title,
    note,
    dueAt,
  });

  revalidateAdminRoutes(inquiryId);
  redirect(`${getRedirectTarget(formData, `/admin/inquiries/${inquiryId}`)}?saved=reminder`);
}

export async function updateReminderStatusAction(formData: FormData) {
  await requireAdminSession();

  const reminderId = parseId(formData, "reminderId");
  const status = String(formData.get("status") || "").trim();

  if (!isReminderStatus(status)) {
    throw new Error("Invalid reminder status.");
  }

  const inquiry = updateFollowUpReminderStatus({
    reminderId,
    status,
  });

  revalidateAdminRoutes(inquiry?.id);
  redirect(`${getRedirectTarget(formData, "/admin/follow-ups")}?saved=reminder-status`);
}

export async function updateClientStageAction(formData: FormData) {
  await requireAdminSession();

  const clientId = parseId(formData, "clientId");
  const stage = String(formData.get("stage") || "").trim();

  if (!isClientStage(stage)) {
    throw new Error("Invalid client stage.");
  }

  updateClientStage({
    clientId,
    stage,
  });

  revalidateAdminRoutes();
  redirect(`${getRedirectTarget(formData, "/admin/clients")}?saved=client-stage`);
}

export async function updateClientNotesAction(formData: FormData) {
  await requireAdminSession();

  const clientId = parseId(formData, "clientId");
  const notes = String(formData.get("notes") || "");

  updateClientNotes({
    clientId,
    notes,
  });

  revalidateAdminRoutes();
  redirect(`${getRedirectTarget(formData, "/admin/clients")}?saved=client-notes`);
}
