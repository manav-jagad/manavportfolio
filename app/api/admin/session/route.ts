import { NextResponse } from "next/server";
import {
  getAdminSession,
  setAdminSessionCookie,
  validateAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();

  return NextResponse.json({
    authenticated: Boolean(session),
    user: session
      ? {
          username: session.username,
          expiresAt: session.expiresAt,
        }
      : null,
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      { status: 303 }
    );
  }

  await setAdminSessionCookie(username);

  return NextResponse.redirect(new URL("/admin/requests", request.url), {
    status: 303,
  });
}
