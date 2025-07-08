import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "admin") return <div className="text-red-600 p-8">403 Forbidden</div>;

  // Responsive sidebar state (client only)
  // This is a workaround for Next.js server components: the sidebar will always be open on desktop, and togglable on mobile.
  // We'll use a hidden checkbox hack for pure CSS, since useState can't be used in async server components.

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900">
      <div className="md:hidden flex items-center justify-between bg-zinc-900 text-white px-4 py-3">
        <Link href="/admin" className="text-xl font-bold">Admin</Link>
        <input id="admin-menu-toggle" type="checkbox" className="hidden peer" />
        <label htmlFor="admin-menu-toggle" className="cursor-pointer">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="bg-zinc-900 text-white w-full md:w-56 flex-col p-6 gap-4 hidden md:flex md:relative md:h-auto md:min-h-screen
          fixed top-0 left-0 h-full z-40 transition-transform duration-200 ease-in-out
          peer-checked:flex peer-checked:translate-x-0 peer-checked:shadow-lg
        ">
          <Link href="/admin" className="text-2xl font-bold mb-8 hover:underline">Admin</Link>
          <nav className="flex flex-col gap-2">
            <Link href="/admin/products" className="hover:underline">Products</Link>
            <Link href="/admin/users" className="hover:underline">Users</Link>
          </nav>
          <div className="flex-1" />
          <SignOutButton />
        </aside>
        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
} 