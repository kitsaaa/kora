"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="mt-auto bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded font-semibold w-full"
    >
      Sign Out
    </button>
  );
} 