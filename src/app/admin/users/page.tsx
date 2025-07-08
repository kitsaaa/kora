import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import UserAdminTable from "./UserAdminTable";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "admin") return <div className="text-red-600">403 Forbidden</div>;
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return <UserAdminTable users={users} currentUserId={user.id} />;
} 