import type { InquiryStatus } from "@/lib/dashboard/schema";
import { getInquiryStatusLabel } from "@/lib/dashboard/service";

type StatusBadgeProps = {
  status: InquiryStatus;
};

const statusStyles: Record<InquiryStatus, string> = {
  new: "border-[rgba(122,209,192,0.32)] bg-[rgba(122,209,192,0.12)] text-[var(--teal)]",
  qualified:
    "border-[rgba(242,192,120,0.32)] bg-[rgba(242,192,120,0.12)] text-[var(--accent)]",
  proposal_sent:
    "border-[rgba(130,170,255,0.32)] bg-[rgba(130,170,255,0.12)] text-[#bfd1ff]",
  in_progress:
    "border-[rgba(255,146,94,0.32)] bg-[rgba(255,146,94,0.12)] text-[#ffb28c]",
  completed:
    "border-[rgba(122,209,192,0.32)] bg-[rgba(122,209,192,0.16)] text-[#d8fff7]",
  archived: "border-white/12 bg-white/6 text-white/70",
  lost: "border-[rgba(255,110,110,0.22)] bg-[rgba(255,110,110,0.12)] text-[#ffc7c7]",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusStyles[status]}`}
    >
      {getInquiryStatusLabel(status)}
    </span>
  );
}
