import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "admin") return <div className="text-red-600">403 Forbidden</div>;
  const [productCount, userCount, adminCount] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.user.count({ where: { role: "admin" } }),
  ]);
  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded p-6">
          <div className="text-2xl font-bold">{productCount}</div>
          <div className="text-zinc-600">Products</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded p-6">
          <div className="text-2xl font-bold">{userCount}</div>
          <div className="text-zinc-600">Users</div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded p-6">
          <div className="text-2xl font-bold">{adminCount}</div>
          <div className="text-zinc-600">Admins</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Link href="/admin/products" className="px-6 py-3 bg-zinc-900 text-white rounded font-semibold hover:bg-zinc-800">Manage Products</Link>
        <Link href="/admin/users" className="px-6 py-3 bg-zinc-900 text-white rounded font-semibold hover:bg-zinc-800">Manage Users</Link>
      </div>
    </div>
  );
} 