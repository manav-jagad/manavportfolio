import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getAdminLoginPreview,
  getAdminSession,
  usingFallbackAdminConfig,
} from "@/lib/admin-auth";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: LoginPageProps) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/requests");
  }

  const { error } = await searchParams;
  const showFallbackNotice = usingFallbackAdminConfig();
  const preview = getAdminLoginPreview();
  const shouldShowPreview = showFallbackNotice && process.env.NODE_ENV !== "production";

  return (
    <div className="page-shell">
      <section className="section-shell section-spacing-lg pt-12 lg:pt-20">
        <div className="mx-auto max-w-[760px]">
          <div className="surface-card p-6 sm:p-8 lg:p-10">
            <div className="space-y-5">
              <span className="eyebrow">Admin Access</span>
              <h1 className="section-title text-4xl sm:text-5xl">
                Log in to manage inquiries, clients, and follow-ups.
              </h1>
              <p className="lead-copy max-w-none">
                This private area gives you a full inquiry inbox, client
                management, reminder tracking, and pipeline analytics for your
                portfolio website.
              </p>
            </div>

            {error === "invalid" ? (
              <div className="mt-6 rounded-[24px] border border-[rgba(255,146,94,0.3)] bg-[rgba(255,146,94,0.12)] px-5 py-4 text-sm text-[#ffd6c4]">
                The username or password was not correct. Try again.
              </div>
            ) : null}

            {shouldShowPreview ? (
              <div className="mt-6 rounded-[24px] border border-[rgba(242,192,120,0.26)] bg-[rgba(242,192,120,0.1)] px-5 py-5 text-sm leading-7 text-white/82">
                <p className="font-semibold text-white">
                  You are currently using local fallback admin credentials.
                </p>
                <p className="mt-2">
                  Username: <span className="text-[var(--accent)]">{preview.username}</span>
                </p>
                <p>
                  Password: <span className="text-[var(--accent)]">{preview.password}</span>
                </p>
                <p className="mt-2 text-white/70">
                  Before deploying, replace these in `.env.local` or your host
                  environment variables.
                </p>
              </div>
            ) : null}

            {showFallbackNotice && !shouldShowPreview ? (
              <div className="mt-6 rounded-[24px] border border-[rgba(242,192,120,0.26)] bg-[rgba(242,192,120,0.1)] px-5 py-5 text-sm leading-7 text-white/82">
                The dashboard is using fallback admin credentials. Before
                deploying, replace them in your environment variables.
              </div>
            ) : null}

            <form action="/api/admin/session" method="post" className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-medium">
                Username
                <input
                  type="text"
                  name="username"
                  className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--line-strong)]"
                  placeholder="Admin username"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Password
                <input
                  type="password"
                  name="password"
                  className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--line-strong)]"
                  placeholder="Admin password"
                  required
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="button-primary border-0">
                  Open dashboard
                </button>
                <Link href="/contact#project-request" className="button-secondary">
                  Back to website
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
