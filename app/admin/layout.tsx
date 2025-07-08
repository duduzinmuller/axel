import AdminRouteGuard from "@/app/_components/AdminRouteGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminRouteGuard>{children}</AdminRouteGuard>;
}
