import type { ClientStage } from "@/lib/dashboard/schema";
import { getClientStageLabel } from "@/lib/dashboard/service";

type ClientStageBadgeProps = {
  stage: ClientStage;
};

const stageStyles: Record<ClientStage, string> = {
  lead: "border-[rgba(122,209,192,0.28)] bg-[rgba(122,209,192,0.12)] text-[var(--teal)]",
  qualified:
    "border-[rgba(242,192,120,0.3)] bg-[rgba(242,192,120,0.12)] text-[var(--accent)]",
  proposal:
    "border-[rgba(130,170,255,0.28)] bg-[rgba(130,170,255,0.12)] text-[#bfd1ff]",
  active:
    "border-[rgba(255,146,94,0.3)] bg-[rgba(255,146,94,0.12)] text-[#ffb28c]",
  past: "border-[rgba(122,209,192,0.3)] bg-[rgba(122,209,192,0.14)] text-[#d8fff7]",
  archived: "border-white/12 bg-white/6 text-white/70",
};

export default function ClientStageBadge({ stage }: ClientStageBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${stageStyles[stage]}`}
    >
      {getClientStageLabel(stage)}
    </span>
  );
}
