import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  formatDashboardDate,
  getAllInquiryStatuses,
  getDashboardAnalytics,
  getInquiryStatusLabel,
  getServiceLabel,
  getTimelineLabel,
  isReminderOverdue,
  listInquiries,
  listFollowUpReminders,
} from "@/lib/dashboard/service";
import { type InquiryStatus, isInquiryStatus } from "@/lib/dashboard/schema";

type InquiriesPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
};

export default async function AdminInquiriesPage({
  searchParams,
}: InquiriesPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const rawStatus = typeof params.status === "string" ? params.status : "";
  const selectedStatus: InquiryStatus | "all" = isInquiryStatus(rawStatus)
    ? rawStatus
    : "all";

  const inquiries = listInquiries({
    query: query || undefined,
    status: selectedStatus,
  });
  const analytics = getDashboardAnalytics();
  const urgentReminders = listFollowUpReminders({
    status: "pending",
    limit: 5,
  });

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
              Inquiry Inbox
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              Search, filter, and work the pipeline.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
            Use this view to triage new leads, check upcoming follow-ups, and
            jump into the full inquiry detail page when you need context.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="surface-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Total inquiries
          </p>
          <p className="mt-3 text-4xl font-semibold text-white">
            {analytics.metrics[0]?.value ?? 0}
          </p>
        </div>

        {analytics.statusBreakdown.slice(0, 3).map((row) => (
          <div key={row.key} className="surface-card p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              {row.label}
            </p>
            <p className="mt-3 text-4xl font-semibold text-white">{row.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-card p-6 sm:p-8">
          <form className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px] xl:items-end">
            <label className="grid min-w-0 gap-2 text-sm font-medium">
              Search
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by client, company, title, or scope"
                className="min-w-0 w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--line-strong)]"
              />
            </label>

            <label className="grid min-w-0 gap-2 text-sm font-medium">
              Status
              <select
                name="status"
                defaultValue={selectedStatus}
                className="min-w-0 w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--line-strong)]"
              >
                <option value="all" className="bg-[#10172d]">
                  All statuses
                </option>
                {getAllInquiryStatuses().map((status) => (
                  <option key={status} value={status} className="bg-[#10172d]">
                    {getInquiryStatusLabel(status)}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row xl:col-span-2 xl:justify-end">
              <button type="submit" className="button-primary border-0">
                Apply filters
              </button>

              <Link href="/admin/inquiries" className="button-secondary">
                Clear
              </Link>
            </div>
          </form>

          <div className="mt-8 space-y-4">
            {inquiries.length ? (
              inquiries.map((inquiry) => {
                const overdue = inquiry.nextFollowUpAt
                  ? isReminderOverdue({
                      dueAt: inquiry.nextFollowUpAt,
                      status: "pending",
                    })
                  : false;

                return (
                  <Link
                    key={inquiry.id}
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="block rounded-[26px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.07]"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <StatusBadge status={inquiry.status} />
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/66">
                            #{inquiry.id}
                          </span>
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/66">
                            {inquiry.sourcePage || "website"}
                          </span>
                          {inquiry.nextFollowUpAt ? (
                            <span
                              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                                overdue
                                  ? "border-[rgba(255,110,110,0.22)] bg-[rgba(255,110,110,0.12)] text-[#ffc7c7]"
                                  : "border-[rgba(242,192,120,0.24)] bg-[rgba(242,192,120,0.12)] text-[var(--accent)]"
                              }`}
                            >
                              {overdue ? "Follow-up overdue" : "Follow-up scheduled"}
                            </span>
                          ) : null}
                        </div>

                        <div>
                          <h3 className="text-2xl font-semibold text-white">
                            {inquiry.title}
                          </h3>
                          <p className="mt-2 text-sm text-[color:var(--muted)]">
                            {inquiry.clientName} ({inquiry.clientEmail})
                            {inquiry.clientCompany
                              ? ` - ${inquiry.clientCompany}`
                              : ""}
                          </p>
                        </div>

                        <p className="max-w-3xl text-sm leading-7 text-[color:var(--muted)]">
                          {inquiry.details.length > 180
                            ? `${inquiry.details.slice(0, 180)}...`
                            : inquiry.details}
                        </p>
                      </div>

                      <div className="grid gap-3 text-sm text-[color:var(--muted)] sm:grid-cols-2 lg:w-[340px]">
                        <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                            Service
                          </p>
                          <p className="mt-2 text-white">
                            {getServiceLabel(inquiry.serviceId)}
                          </p>
                        </div>

                        <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                            Timeline
                          </p>
                          <p className="mt-2 text-white">
                            {getTimelineLabel(inquiry.timelineId)}
                          </p>
                        </div>

                        <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                            Submitted
                          </p>
                          <p className="mt-2 text-white">
                            {formatDashboardDate(inquiry.submittedAt)}
                          </p>
                        </div>

                        <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                            Pending reminders
                          </p>
                          <p className="mt-2 text-white">
                            {inquiry.pendingReminderCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="rounded-[28px] border border-dashed border-white/12 bg-white/5 px-6 py-8 text-sm text-[color:var(--muted)]">
                No inquiries match the current search or filter.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
              Urgent follow-ups
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Reminders that should stay visible
            </h3>

            <div className="mt-6 space-y-4">
              {urgentReminders.length ? (
                urgentReminders.map((reminder) => {
                  const overdue = isReminderOverdue(reminder);

                  return (
                    <Link
                      key={reminder.id}
                      href={`/admin/inquiries/${reminder.inquiryId}`}
                      className="block rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/18 hover:bg-white/[0.07]"
                    >
                      <p
                        className={`text-xs uppercase tracking-[0.18em] ${
                          overdue ? "text-[#ffc7c7]" : "text-[var(--accent)]"
                        }`}
                      >
                        {overdue ? "Overdue" : "Upcoming"}
                      </p>
                      <h4 className="mt-3 text-lg font-semibold text-white">
                        {reminder.title}
                      </h4>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        {reminder.clientName}
                      </p>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        {formatDashboardDate(reminder.dueAt)}
                      </p>
                    </Link>
                  );
                })
              ) : (
                <p className="rounded-[24px] border border-dashed border-white/12 bg-white/4 px-5 py-6 text-sm text-[color:var(--muted)]">
                  No pending follow-ups right now.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
