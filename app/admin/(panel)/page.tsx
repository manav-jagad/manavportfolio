import Link from "next/link";
import ClientStageBadge from "@/components/admin/ClientStageBadge";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  formatDashboardDate,
  getDashboardAnalytics,
  getServiceLabel,
  isReminderOverdue,
} from "@/lib/dashboard/service";

function BreakdownCard({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ key: string; label: string; value: number }>;
}) {
  const maxValue = Math.max(1, ...rows.map((row) => row.value));

  return (
    <div className="surface-card p-6 sm:p-7">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
        {title}
      </p>

      <div className="mt-6 space-y-4">
        {rows.length ? (
          rows.map((row) => (
            <div key={row.key}>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-white/86">{row.label}</span>
                <span className="text-[color:var(--muted)]">{row.value}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--teal),var(--accent))]"
                  style={{ width: `${(row.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-[color:var(--muted)]">
            No data yet. New inquiries will start populating this section.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AdminIndexPage() {
  const analytics = getDashboardAnalytics();
  const maxVolume = Math.max(
    1,
    ...analytics.monthlyInquiryVolume.map((point) => point.value)
  );

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
              Dashboard Overview
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              Inquiry and client pipeline at a glance.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
            This is your command center for new leads, active work, follow-up
            health, and which services people are asking for most.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {analytics.metrics.map((metric) => (
          <div key={metric.label} className="surface-card p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              {metric.label}
            </p>
            <p className="mt-4 text-4xl font-semibold text-white">
              {metric.value}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BreakdownCard
            title="Monthly Inquiry Volume"
            rows={analytics.monthlyInquiryVolume.map((point) => ({
              key: point.label,
              label: point.label,
              value: point.value,
            }))}
          />
        </div>

        <div className="surface-card p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Volume Snapshot
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {analytics.monthlyInquiryVolume.map((point) => (
              <div
                key={point.label}
                className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-white/56">
                  {point.label}
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-soft))]"
                    style={{ width: `${(point.value / maxVolume) * 100}%` }}
                  />
                </div>
                <p className="mt-3 text-xl font-semibold text-white">
                  {point.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <BreakdownCard title="Inquiry Status Pipeline" rows={analytics.statusBreakdown} />
        <BreakdownCard title="Client Stage Distribution" rows={analytics.clientStageBreakdown} />
        <BreakdownCard title="Service Demand" rows={analytics.serviceBreakdown} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="surface-card p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
                Recent Inquiries
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Latest leads coming in
              </h3>
            </div>
            <Link href="/admin/inquiries" className="button-secondary">
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {analytics.recentInquiries.length ? (
              analytics.recentInquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href={`/admin/inquiries/${inquiry.id}`}
                  className="block rounded-[24px] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={inquiry.status} />
                    <ClientStageBadge stage={inquiry.clientStage} />
                    <span className="text-xs uppercase tracking-[0.18em] text-white/48">
                      #{inquiry.id}
                    </span>
                  </div>
                  <h4 className="mt-4 text-xl font-semibold text-white">
                    {inquiry.title}
                  </h4>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">
                    {inquiry.clientName}
                    {inquiry.clientCompany ? ` - ${inquiry.clientCompany}` : ""}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {getServiceLabel(inquiry.serviceId)}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/46">
                    {formatDashboardDate(inquiry.submittedAt)}
                  </p>
                </Link>
              ))
            ) : (
              <p className="rounded-[24px] border border-dashed border-white/12 bg-white/4 px-5 py-6 text-sm text-[color:var(--muted)]">
                No inquiries have been captured yet.
              </p>
            )}
          </div>
        </div>

        <div className="surface-card p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                Follow-up Watchlist
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                What needs attention next
              </h3>
            </div>
            <Link href="/admin/follow-ups" className="button-secondary">
              Open follow-ups
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {analytics.urgentReminders.length ? (
              analytics.urgentReminders.map((reminder) => {
                const overdue = isReminderOverdue(reminder);

                return (
                  <Link
                    key={reminder.id}
                    href={`/admin/inquiries/${reminder.inquiryId}`}
                    className="block rounded-[24px] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                          overdue
                            ? "border-[rgba(255,110,110,0.22)] bg-[rgba(255,110,110,0.12)] text-[#ffc7c7]"
                            : "border-[rgba(242,192,120,0.28)] bg-[rgba(242,192,120,0.12)] text-[var(--accent)]"
                        }`}
                      >
                        {overdue ? "Overdue" : "Upcoming"}
                      </span>
                      {reminder.inquiryStatus ? (
                        <StatusBadge status={reminder.inquiryStatus} />
                      ) : null}
                    </div>
                    <h4 className="mt-4 text-xl font-semibold text-white">
                      {reminder.title}
                    </h4>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      {reminder.clientName}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                      Due {formatDashboardDate(reminder.dueAt)}
                    </p>
                  </Link>
                );
              })
            ) : (
              <p className="rounded-[24px] border border-dashed border-white/12 bg-white/4 px-5 py-6 text-sm text-[color:var(--muted)]">
                No pending follow-ups. You are caught up.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
