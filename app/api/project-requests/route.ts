import { NextResponse } from "next/server";
import { submitPublicInquiry } from "@/lib/dashboard/service";
import { validateInquirySubmissionPayload } from "@/lib/dashboard/validation";

export const runtime = "nodejs";

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "";
  }

  return request.headers.get("x-real-ip") || "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateInquirySubmissionPayload(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.message },
      { status: 400 }
    );
  }

  const inquiryId = submitPublicInquiry({
    ...validation.data,
    clientIp: getClientIp(request),
    userAgent: request.headers.get("user-agent") || "",
  });

  return NextResponse.json(
    {
      message: "Inquiry saved successfully.",
      requestId: inquiryId,
      inquiryId,
    },
    { status: 201 }
  );
}
