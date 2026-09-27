import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/login");
  }

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto px-4 py-6">{children}</div>
    </>
  );
}
