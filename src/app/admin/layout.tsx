import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "admin") return <div className="text-red-600 p-8">403 Forbidden</div>;
  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-900">
      <aside className="w-56 bg-zinc-900 text-white flex flex-col p-6 gap-4">
        <Link href="/admin" className="text-2xl font-bold mb-8 hover:underline">Admin</Link>
        <nav className="flex flex-col gap-2">
          <Link href="/admin/products" className="hover:underline">Products</Link>
          <Link href="/admin/users" className="hover:underline">Users</Link>
        </nav>
        <div className="flex-1" />
        <SignOutButton />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
} 