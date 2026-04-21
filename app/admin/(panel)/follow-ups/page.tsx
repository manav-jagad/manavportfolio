import Link from "next/link";
import ReminderStatusBadge from "@/components/admin/ReminderStatusBadge";
import StatusBadge from "@/components/admin/StatusBadge";
import { updateReminderStatusAction } from "@/app/admin/actions";
import { type ReminderStatus, isReminderStatus } from "@/lib/dashboard/schema";
import {
  formatDashboardDate,
  getDashboardAnalytics,
  isReminderOverdue,
  listFollowUpReminders,
} from "@/lib/dashboard/service";

type FollowUpsPageProps = {
  searchParams: Promise<{
    status?: string;
    saved?: string;
  }>;
};

export default async function FollowUpsPage({
  searchParams,
}: FollowUpsPageProps) {
  const params = await searchParams;
  const rawStatus = typeof params.status === "string" ? params.status : "";
  const selectedStatus: ReminderStatus = isReminderStatus(rawStatus)
    ? rawStatus
    : "pending";
  const reminders = listFollowUpReminders({
    status: selectedStatus,
  });
  const analytics = getDashboardAnalytics();
  const completedCount = listFollowUpReminders({ status: "completed" }).length;

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
              Follow-up Reminders
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              Stay on top of every next step.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
            This page surfaces upcoming reminders, overdue follow-ups, and
            recently completed nudges across your inquiry pipeline.
          </p>
        </div>

        {params.saved === "reminder-status" ? (
          <div className="mt-6 rounded-[24px] border border-[rgba(122,209,192,0.28)] bg-[rgba(122,209,192,0.1)] px-5 py-4 text-sm text-white/86">
            Reminder updated.
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="surface-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
            Pending
          </p>
          <p className="mt-3 text-4xl font-semibold text-white">
            {analytics.metrics.find((metric) => metric.label === "Pending follow-ups")
              ?.value ?? 0}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
            Overdue
          </p>
          <p className="mt-3 text-4xl font-semibold text-white">
            {analytics.metrics.find((metric) => metric.label === "Overdue follow-ups")
              ?.value ?? 0}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
            Completed
          </p>
          <p className="mt-3 text-4xl font-semibold text-white">
            {completedCount}
          </p>
        </div>
      </div>

      <div className="surface-card p-6 sm:p-8">
        <form className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="grid gap-2 text-sm font-medium sm:min-w-[220px]">
            Status
            <select
              name="status"
              defaultValue={selectedStatus}
              className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="pending" className="bg-[#10172d]">
                Pending
              </option>
              <option value="completed" className="bg-[#10172d]">
                Completed
              </option>
              <option value="dismissed" className="bg-[#10172d]">
                Dismissed
              </option>
            </select>
          </label>

          <button type="submit" className="button-primary border-0">
            Apply
          </button>

          <Link href="/admin/follow-ups" className="button-secondary">
            Reset
          </Link>
        </form>

        <div className="mt-8 space-y-4">
          {reminders.length ? (
            reminders.map((reminder) => {
              const overdue = isReminderOverdue(reminder);

              return (
                <div
                  key={reminder.id}
                  className="rounded-[26px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <ReminderStatusBadge status={reminder.status} />
                        {reminder.inquiryStatus ? (
                          <StatusBadge status={reminder.inquiryStatus} />
                        ) : null}
                        {overdue ? (
                          <span className="rounded-full border border-[rgba(255,110,110,0.22)] bg-[rgba(255,110,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffc7c7]">
                            Overdue
                          </span>
                        ) : null}
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-white">
                          {reminder.title}
                        </h3>
                        <p className="mt-2 text-sm text-[color:var(--muted)]">
                          {reminder.clientName} ({reminder.clientEmail})
                        </p>
                      </div>

                      <p className="text-sm leading-7 text-[color:var(--muted)]">
                        Due {formatDashboardDate(reminder.dueAt)}
                      </p>
                      {reminder.note ? (
                        <p className="text-sm leading-7 text-[color:var(--muted)]">
                          {reminder.note}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:w-[260px]">
                      <Link
                        href={`/admin/inquiries/${reminder.inquiryId}`}
                        className="button-secondary"
                      >
                        Open inquiry
                      </Link>

                      {reminder.status === "pending" ? (
                        <>
                          <form action={updateReminderStatusAction}>
                            <input
                              type="hidden"
                              name="redirectTo"
                              value={`/admin/follow-ups?status=${selectedStatus}`}
                            />
                            <input type="hidden" name="reminderId" value={reminder.id} />
                            <input type="hidden" name="status" value="completed" />
                            <button type="submit" className="button-primary w-full border-0">
                              Mark completed
                            </button>
                          </form>

                          <form action={updateReminderStatusAction}>
                            <input
                              type="hidden"
                              name="redirectTo"
                              value={`/admin/follow-ups?status=${selectedStatus}`}
                            />
                            <input type="hidden" name="reminderId" value={reminder.id} />
                            <input type="hidden" name="status" value="dismissed" />
                            <button type="submit" className="button-secondary w-full">
                              Dismiss
                            </button>
                          </form>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/12 bg-white/5 px-6 py-8 text-sm text-[color:var(--muted)]">
              No reminders found for this status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
