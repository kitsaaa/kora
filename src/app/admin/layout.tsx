import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { prisma } from "@/lib/prisma";
import AdminShell from "./AdminShell";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "admin") return <div className="text-red-600 p-8">403 Forbidden</div>;

  // Responsive sidebar state (client only)
  // This is a workaround for Next.js server components: the sidebar will always be open on desktop, and togglable on mobile.
  // We'll use a hidden checkbox hack for pure CSS, since useState can't be used in async server components.

  return <AdminShell>{children}</AdminShell>;
} 