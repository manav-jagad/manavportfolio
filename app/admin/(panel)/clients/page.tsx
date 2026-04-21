import Link from "next/link";
import ClientStageBadge from "@/components/admin/ClientStageBadge";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  updateClientNotesAction,
  updateClientStageAction,
} from "@/app/admin/actions";
import { type ClientStage, isClientStage } from "@/lib/dashboard/schema";
import {
  formatDashboardDate,
  getAllClientStages,
  getClientStageLabel,
  getDashboardAnalytics,
  listClients,
} from "@/lib/dashboard/service";

type ClientsPageProps = {
  searchParams: Promise<{
    q?: string;
    stage?: string;
    saved?: string;
  }>;
};

const saveMessages: Record<string, string> = {
  "client-stage": "Client stage updated.",
  "client-notes": "Client notes saved.",
};

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const rawStage = typeof params.stage === "string" ? params.stage : "";
  const selectedStage: ClientStage | "all" = isClientStage(rawStage)
    ? rawStage
    : "all";
  const clients = listClients({
    query: query || undefined,
    stage: selectedStage,
  });
  const analytics = getDashboardAnalytics();

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
              Client Management
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              Track people, companies, and relationship stage.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
            Each client record is connected to their inquiry history and follow-up
            schedule so you can manage the relationship beyond the first form submission.
          </p>
        </div>

        {params.saved && saveMessages[params.saved] ? (
          <div className="mt-6 rounded-[24px] border border-[rgba(122,209,192,0.28)] bg-[rgba(122,209,192,0.1)] px-5 py-4 text-sm text-white/86">
            {saveMessages[params.saved]}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="surface-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Total clients
          </p>
          <p className="mt-3 text-4xl font-semibold text-white">
            {analytics.metrics.find((metric) => metric.label === "Clients")?.value ?? 0}
          </p>
        </div>

        {analytics.clientStageBreakdown.slice(0, 3).map((row) => (
          <div key={row.key} className="surface-card p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              {row.label}
            </p>
            <p className="mt-3 text-4xl font-semibold text-white">{row.value}</p>
          </div>
        ))}
      </div>

      <div className="surface-card p-6 sm:p-8">
        <form className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px] xl:items-end">
          <label className="grid min-w-0 gap-2 text-sm font-medium">
            Search
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by name, email, company, or website"
              className="min-w-0 w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="grid min-w-0 gap-2 text-sm font-medium">
            Stage
            <select
              name="stage"
              defaultValue={selectedStage}
              className="min-w-0 w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="all" className="bg-[#10172d]">
                All stages
              </option>
              {getAllClientStages().map((stage) => (
                <option key={stage} value={stage} className="bg-[#10172d]">
                  {getClientStageLabel(stage)}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row xl:col-span-2 xl:justify-end">
            <button type="submit" className="button-primary border-0">
              Apply filters
            </button>

            <Link href="/admin/clients" className="button-secondary">
              Clear
            </Link>
          </div>
        </form>

        <div className="mt-8 space-y-5">
          {clients.length ? (
            clients.map((client) => (
              <div
                key={client.id}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 sm:p-6"
              >
                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <ClientStageBadge stage={client.stage} />
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/66">
                        Client #{client.id}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {client.name}
                      </h3>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        {client.email}
                        {client.company ? ` - ${client.company}` : ""}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                          Last inquiry
                        </p>
                        <p className="mt-2 text-white">
                          {client.lastInquiryAt
                            ? formatDashboardDate(client.lastInquiryAt)
                            : "No inquiry"}
                        </p>
                      </div>

                      <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                          Next follow-up
                        </p>
                        <p className="mt-2 text-white">
                          {client.nextFollowUpAt
                            ? formatDashboardDate(client.nextFollowUpAt)
                            : "None scheduled"}
                        </p>
                      </div>

                      <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                          Inquiries
                        </p>
                        <p className="mt-2 text-white">{client.inquiryCount}</p>
                      </div>

                      <div className="rounded-[20px] border border-white/10 bg-black/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                          Completed
                        </p>
                        <p className="mt-2 text-white">
                          {client.completedInquiryCount}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {client.latestInquiryId ? (
                        <Link
                          href={`/admin/inquiries/${client.latestInquiryId}`}
                          className="button-secondary"
                        >
                          Open latest inquiry
                        </Link>
                      ) : null}
                      {client.website ? (
                        <a
                          href={
                            client.website.startsWith("http")
                              ? client.website
                              : `https://${client.website}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="button-secondary"
                        >
                          Open website
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[24px] border border-white/10 bg-black/10 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--teal)]">
                        Latest inquiry snapshot
                      </p>
                      {client.latestInquiryTitle ? (
                        <>
                          <h4 className="mt-3 text-lg font-semibold text-white">
                            {client.latestInquiryTitle}
                          </h4>
                          {client.latestInquiryStatus ? (
                            <div className="mt-3">
                              <StatusBadge status={client.latestInquiryStatus} />
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <p className="mt-3 text-sm text-[color:var(--muted)]">
                          No linked inquiry yet.
                        </p>
                      )}
                    </div>

                    <form action={updateClientStageAction} className="grid gap-3">
                      <input type="hidden" name="clientId" value={client.id} />
                      <input type="hidden" name="redirectTo" value="/admin/clients" />

                      <label className="grid gap-2 text-sm font-medium">
                        Update client stage
                        <select
                          name="stage"
                          defaultValue={client.stage}
                          className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                        >
                          {getAllClientStages().map((stage) => (
                            <option key={stage} value={stage} className="bg-[#10172d]">
                              {getClientStageLabel(stage)}
                            </option>
                          ))}
                        </select>
                      </label>

                      <button type="submit" className="button-primary border-0">
                        Save stage
                      </button>
                    </form>

                    <form action={updateClientNotesAction} className="grid gap-3">
                      <input type="hidden" name="clientId" value={client.id} />
                      <input type="hidden" name="redirectTo" value="/admin/clients" />

                      <label className="grid gap-2 text-sm font-medium">
                        Internal client notes
                        <textarea
                          name="notes"
                          defaultValue={client.notes}
                          rows={5}
                          className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                          placeholder="Relationship notes, proposal preferences, retainer ideas, communication context..."
                        />
                      </label>

                      <button type="submit" className="button-secondary">
                        Save notes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/12 bg-white/5 px-6 py-8 text-sm text-[color:var(--muted)]">
              No clients match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
