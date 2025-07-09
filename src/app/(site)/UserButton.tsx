"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function UserButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (status === "loading") return null;
  if (session?.user) {
    return (
      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          className="flex items-center gap-1 hover:underline focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Profile"
        >
          <UserIcon className="w-6 h-6" />
        </button>
        {open && (
          <div
            className="absolute right-0 top-full mt-2 w-40 bg-white border border-zinc-200 rounded-lg shadow-lg z-50"
            style={{ minWidth: 140 }}
          >
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 text-zinc-900 transition"
              onClick={() => { setOpen(false); router.push("/profile"); }}
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 text-zinc-900 transition"
              onClick={() => { setOpen(false); signOut({ callbackUrl: "/auth/signin" }); }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <Link href="/auth/signin" className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 font-semibold">Sign In</Link>
  );
} 