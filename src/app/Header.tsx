"use client";
import Link from "next/link";
import { UserButton } from "./UserButton";
import { CartButton } from "./CartButton";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full bg-zinc-900 text-white py-4 px-4 sm:px-8 flex items-center justify-between relative z-30">
      <div className="text-xl font-bold">
        <Link href="/">E-Shop</Link>
      </div>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-6 text-base">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/catalog" className="hover:underline">Catalog</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
      </nav>
      {/* Desktop right buttons */}
      <div className="hidden md:flex items-center gap-4">
        <CartButton />
        <UserButton />
      </div>
      {/* Mobile burger icon */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <Bars3Icon className="w-7 h-7" />
      </button>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-zinc-900 bg-opacity-95 flex flex-col items-center justify-center z-50 transition-all">
          <button
            className="absolute top-6 right-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <nav className="flex flex-col gap-8 text-2xl font-semibold mt-8">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:underline">Home</Link>
            <Link href="/catalog" onClick={() => setMenuOpen(false)} className="hover:underline">Catalog</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:underline">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:underline">Contact</Link>
          </nav>
          <div className="flex gap-6 mt-12">
            <CartButton />
            <UserButton />
          </div>
        </div>
      )}
    </header>
  );
} 