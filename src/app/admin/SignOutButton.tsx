"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="admin-btn mt-auto w-full"
    >
      Sign Out
    </button>
  );
} 