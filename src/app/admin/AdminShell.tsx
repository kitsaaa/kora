"use client";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { useState } from "react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-zinc-900 text-white px-4 py-3">
        <Link href="/admin" className="text-xl font-bold">Admin</Link>
        <button onClick={() => setSidebarOpen(v => !v)} aria-label="Open menu">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className={`admin-sidebar w-64 max-w-full flex-col p-6 gap-4 fixed md:static top-0 left-0 h-full z-40 transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex md:min-h-screen`}>
          <Link href="/admin" className="text-2xl font-bold mb-8 hover:underline" onClick={() => setSidebarOpen(false)}>Admin</Link>
          <nav className="flex flex-col gap-2">
            <Link href="/admin/products" className="hover:underline" onClick={() => setSidebarOpen(false)}>Products</Link>
            <Link href="/admin/users" className="hover:underline" onClick={() => setSidebarOpen(false)}>Users</Link>
          </nav>
          <div className="flex-1" />
          <div className="admin-btn"><SignOutButton /></div>
        </aside>
        {/* Overlay for mobile */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}
        {/* Main content */}
        <main className="admin-content flex-1 p-4 md:p-8 md:ml-0 ml-0">{children}</main>
      </div>
    </div>
  );
} 