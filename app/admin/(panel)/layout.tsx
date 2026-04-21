import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(242,192,120,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(122,209,192,0.1),transparent_22%),linear-gradient(180deg,#090e1d_0%,#0b1020_48%,#121936_100%)]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] gap-6 px-4 py-4 lg:grid-cols-[280px_1fr] lg:px-6">
        <aside className="surface-card h-fit p-5 lg:sticky lg:top-4">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
                Manav Studio
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white">
                Inquiry CRM
              </h1>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                Review inquiries, manage client follow-ups, and track the
                pipeline from one private dashboard.
              </p>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80">
              Logged in as <span className="text-white">{session.username}</span>
            </div>

            <AdminNav />

            <div className="grid gap-3">
              <Link href="/contact#project-request" className="button-secondary">
                Open public form
              </Link>
              <Link href="/" className="button-secondary">
                Visit website
              </Link>
              <form action="/api/admin/logout" method="post">
                <button type="submit" className="button-secondary w-full">
                  Log out
                </button>
              </form>
            </div>
          </div>
        </aside>

        <div className="space-y-6 py-1">{children}</div>
      </div>
    </div>
  );
}
