import type { InquiryStatus } from "@/lib/dashboard/schema";
import StatusBadge from "@/components/admin/StatusBadge";

type RequestStatusBadgeProps = {
  status: InquiryStatus;
};

export default function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  return <StatusBadge status={status} />;
}
