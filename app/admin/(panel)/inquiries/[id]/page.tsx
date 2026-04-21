import Link from "next/link";
import { notFound } from "next/navigation";
import ClientStageBadge from "@/components/admin/ClientStageBadge";
import ReminderStatusBadge from "@/components/admin/ReminderStatusBadge";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  addInquiryNoteAction,
  scheduleFollowUpReminderAction,
  updateInquiryStatusAction,
  updateReminderStatusAction,
} from "@/app/admin/actions";
import {
  formatDashboardDate,
  getAllInquiryStatuses,
  getBudgetLabel,
  getInquiryStatusLabel,
  getInquiryById,
  getServiceLabel,
  getTimelineLabel,
  isReminderOverdue,
} from "@/lib/dashboard/service";

type InquiryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

const saveMessages: Record<string, string> = {
  status: "Inquiry status updated.",
  note: "Internal note saved.",
  reminder: "Follow-up reminder scheduled.",
  "reminder-status": "Reminder updated.",
};

export default async function InquiryDetailPage({
  params,
  searchParams,
}: InquiryDetailPageProps) {
  const { id } = await params;
  const { saved } = await searchParams;
  const inquiryId = Number.parseInt(id, 10);

  if (!Number.isInteger(inquiryId) || inquiryId <= 0) {
    notFound();
  }

  const inquiry = getInquiryById(inquiryId);

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-4">
            <Link href="/admin/inquiries" className="button-secondary">
              Back to inquiries
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={inquiry.status} />
              <ClientStageBadge stage={inquiry.clientStage} />
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/66">
                #{inquiry.id}
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                Inquiry Detail
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-white">
                {inquiry.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                Submitted by {inquiry.clientName} ({inquiry.clientEmail})
                {inquiry.clientCompany ? ` for ${inquiry.clientCompany}` : ""}.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a href={`mailto:${inquiry.clientEmail}`} className="button-primary">
              Email client
            </a>
            <Link
              href={`/admin/clients?q=${encodeURIComponent(inquiry.clientEmail)}`}
              className="button-secondary"
            >
              Find client
            </Link>
            {inquiry.clientWebsite ? (
              <a
                href={
                  inquiry.clientWebsite.startsWith("http")
                    ? inquiry.clientWebsite
                    : `https://${inquiry.clientWebsite}`
                }
                target="_blank"
                rel="noreferrer"
                className="button-secondary sm:col-span-2"
              >
                Open client website
              </a>
            ) : null}
          </div>
        </div>

        {saved && saveMessages[saved] ? (
          <div className="mt-6 rounded-[24px] border border-[rgba(122,209,192,0.28)] bg-[rgba(122,209,192,0.1)] px-5 py-4 text-sm text-white/86">
            {saveMessages[saved]}
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="surface-card p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Service
              </p>
              <p className="mt-3 text-lg text-white">
                {getServiceLabel(inquiry.serviceId)}
              </p>
            </div>

            <div className="surface-card p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Timeline
              </p>
              <p className="mt-3 text-lg text-white">
                {getTimelineLabel(inquiry.timelineId)}
              </p>
            </div>

            <div className="surface-card p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Budget
              </p>
              <p className="mt-3 text-lg text-white">
                {getBudgetLabel(inquiry.budgetId)}
              </p>
            </div>

            <div className="surface-card p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Submitted
              </p>
              <p className="mt-3 text-lg text-white">
                {formatDashboardDate(inquiry.submittedAt)}
              </p>
            </div>
          </div>

          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              Scope
            </p>
            <p className="mt-4 text-lg leading-8 text-white/88">
              {inquiry.pagesScope}
            </p>
          </div>

          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              Project Brief
            </p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-[color:var(--muted)]">
              {inquiry.details}
            </p>
          </div>

          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              Priorities
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {inquiry.priorities.map((priority) => (
                <span key={priority} className="tag">
                  {priority}
                </span>
              ))}
            </div>
          </div>

          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Internal Notes
            </p>
            <div className="mt-6 space-y-4">
              {inquiry.notes.length ? (
                inquiry.notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-white/46">
                      {formatDashboardDate(note.createdAt)}
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/86">
                      {note.body}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-[22px] border border-dashed border-white/12 bg-white/4 px-5 py-6 text-sm text-[color:var(--muted)]">
                  No internal notes yet.
                </p>
              )}
            </div>
          </div>

          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Status Timeline
            </p>
            <div className="mt-6 space-y-4">
              {inquiry.statusHistory.map((event) => (
                <div
                  key={event.id}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-4"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {event.fromStatus ? (
                      <span className="text-sm text-white/60">
                        {getInquiryStatusLabel(event.fromStatus)}
                      </span>
                    ) : (
                      <span className="text-sm text-white/60">Start</span>
                    )}
                    <span className="text-white/30">→</span>
                    <StatusBadge status={event.toStatus} />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {event.note}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/46">
                    {formatDashboardDate(event.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              Update Status
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Move this inquiry through the pipeline
            </h3>

            <form action={updateInquiryStatusAction} className="mt-6 grid gap-4">
              <input type="hidden" name="inquiryId" value={inquiry.id} />
              <input
                type="hidden"
                name="redirectTo"
                value={`/admin/inquiries/${inquiry.id}`}
              />

              <label className="grid gap-2 text-sm font-medium">
                Status
                <select
                  name="status"
                  defaultValue={inquiry.status}
                  className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                >
                  {getAllInquiryStatuses().map((status) => (
                    <option key={status} value={status} className="bg-[#10172d]">
                      {getInquiryStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Note about the change
                <textarea
                  name="note"
                  rows={4}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Why is the status changing? Proposal sent, scope confirmed, project won..."
                />
              </label>

              <button type="submit" className="button-primary border-0">
                Save status
              </button>
            </form>
          </div>

          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Add Internal Note
            </p>
            <form action={addInquiryNoteAction} className="mt-6 grid gap-4">
              <input type="hidden" name="inquiryId" value={inquiry.id} />
              <input
                type="hidden"
                name="redirectTo"
                value={`/admin/inquiries/${inquiry.id}`}
              />

              <label className="grid gap-2 text-sm font-medium">
                Note
                <textarea
                  name="body"
                  rows={6}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Pricing notes, next call context, technical assumptions, blockers..."
                />
              </label>

              <button type="submit" className="button-primary border-0">
                Save note
              </button>
            </form>
          </div>

          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              Schedule Follow-up
            </p>
            <form action={scheduleFollowUpReminderAction} className="mt-6 grid gap-4">
              <input type="hidden" name="inquiryId" value={inquiry.id} />
              <input
                type="hidden"
                name="redirectTo"
                value={`/admin/inquiries/${inquiry.id}`}
              />

              <label className="grid gap-2 text-sm font-medium">
                Reminder title
                <input
                  type="text"
                  name="title"
                  className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Send proposal follow-up"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Due date and time
                <input
                  type="datetime-local"
                  name="dueAt"
                  className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Context
                <textarea
                  name="note"
                  rows={4}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="What should you check, send, or ask when this reminder comes up?"
                />
              </label>

              <button type="submit" className="button-primary border-0">
                Create reminder
              </button>
            </form>
          </div>

          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Follow-up Reminders
            </p>
            <div className="mt-6 space-y-4">
              {inquiry.reminders.length ? (
                inquiry.reminders.map((reminder) => {
                  const overdue = isReminderOverdue(reminder);

                  return (
                    <div
                      key={reminder.id}
                      className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <ReminderStatusBadge status={reminder.status} />
                        {overdue ? (
                          <span className="rounded-full border border-[rgba(255,110,110,0.22)] bg-[rgba(255,110,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffc7c7]">
                            Overdue
                          </span>
                        ) : null}
                      </div>
                      <h4 className="mt-4 text-lg font-semibold text-white">
                        {reminder.title}
                      </h4>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        Due {formatDashboardDate(reminder.dueAt)}
                      </p>
                      {reminder.note ? (
                        <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                          {reminder.note}
                        </p>
                      ) : null}

                      {reminder.status === "pending" ? (
                        <div className="mt-4 flex flex-wrap gap-3">
                          <form action={updateReminderStatusAction}>
                            <input
                              type="hidden"
                              name="redirectTo"
                              value={`/admin/inquiries/${inquiry.id}`}
                            />
                            <input type="hidden" name="reminderId" value={reminder.id} />
                            <input type="hidden" name="status" value="completed" />
                            <button type="submit" className="button-primary border-0">
                              Mark completed
                            </button>
                          </form>

                          <form action={updateReminderStatusAction}>
                            <input
                              type="hidden"
                              name="redirectTo"
                              value={`/admin/inquiries/${inquiry.id}`}
                            />
                            <input type="hidden" name="reminderId" value={reminder.id} />
                            <input type="hidden" name="status" value="dismissed" />
                            <button type="submit" className="button-secondary">
                              Dismiss
                            </button>
                          </form>
                        </div>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <p className="rounded-[24px] border border-dashed border-white/12 bg-white/4 px-5 py-6 text-sm text-[color:var(--muted)]">
                  No follow-up reminders scheduled yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
