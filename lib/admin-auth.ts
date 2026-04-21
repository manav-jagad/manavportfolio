import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "manav_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getAdminConfig() {
  return {
    username: process.env.ADMIN_USERNAME || "manavadmin",
    password: process.env.ADMIN_PASSWORD || "ManavStudio@2026",
    sessionSecret:
      process.env.SESSION_SECRET ||
      "manav-studio-session-secret-change-this-before-deploy",
    usingFallback:
      !process.env.ADMIN_USERNAME ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.SESSION_SECRET,
  };
}

function signValue(value: string) {
  return createHmac("sha256", getAdminConfig().sessionSecret)
    .update(value)
    .digest("base64url");
}

function hashComparable(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(hashComparable(left), hashComparable(right));
}

export function usingFallbackAdminConfig() {
  return getAdminConfig().usingFallback;
}

export function getAdminLoginPreview() {
  const config = getAdminConfig();

  return {
    username: config.username,
    password: config.password,
  };
}

export function validateAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();

  return safeEqual(username, config.username) && safeEqual(password, config.password);
}

export function createAdminSessionToken(username: string) {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
    })
  ).toString("base64url");

  return `${payload}.${signValue(payload)}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature || signValue(payload) !== signature) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      username?: string;
      expiresAt?: number;
    };

    if (!parsed.username || !parsed.expiresAt || parsed.expiresAt < Date.now()) {
      return null;
    }

    return {
      username: parsed.username,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return verifyAdminSessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function setAdminSessionCookie(username: string) {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, createAdminSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
