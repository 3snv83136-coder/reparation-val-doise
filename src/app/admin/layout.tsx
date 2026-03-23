import { validateSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await validateSession();

  if (!admin) {
    return <>{children}</>;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#F7FAFC" }}>
      <AdminSidebar adminName={admin.nom} />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
