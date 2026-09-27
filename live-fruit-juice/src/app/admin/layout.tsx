"use client";

import { AdminHeader } from "@/components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      <div className="container mx-auto px-4 py-6">{children}</div>
    </>
  );
}
