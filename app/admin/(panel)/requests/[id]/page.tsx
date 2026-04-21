import { redirect } from "next/navigation";

type RequestDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { id } = await params;

  redirect(`/admin/inquiries/${id}`);
}
