"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";

export function UserButton() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (session?.user) {
    return (
      <Link href="/profile" className="flex items-center gap-1 hover:underline">
        <UserIcon className="w-6 h-6" />
      </Link>
    );
  }
  return (
    <Link href="/auth/signin" className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 font-semibold">Sign In</Link>
  );
} 