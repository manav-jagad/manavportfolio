import type { ReminderStatus } from "@/lib/dashboard/schema";
import { getReminderStatusLabel } from "@/lib/dashboard/service";

type ReminderStatusBadgeProps = {
  status: ReminderStatus;
};

const reminderStyles: Record<ReminderStatus, string> = {
  pending:
    "border-[rgba(242,192,120,0.28)] bg-[rgba(242,192,120,0.12)] text-[var(--accent)]",
  completed:
    "border-[rgba(122,209,192,0.3)] bg-[rgba(122,209,192,0.14)] text-[#d8fff7]",
  dismissed: "border-white/12 bg-white/6 text-white/70",
};

export default function ReminderStatusBadge({
  status,
}: ReminderStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${reminderStyles[status]}`}
    >
      {getReminderStatusLabel(status)}
    </span>
  );
}
