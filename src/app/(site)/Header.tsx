"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "./UserButton";
import { CartButton } from "./CartButton";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    signOut({ callbackUrl: "/auth/signin" });
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    router.push("/profile");
  };

  return (
    <header className="w-full bg-white text-zinc-900 py-4 px-4 sm:px-8 flex items-center justify-between relative z-30 border-b border-zinc-200">
      <div className="flex items-center h-14">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="KORA Logo" width={56} height={56} priority className="h-14 w-auto object-contain" />
          <span className="text-2xl font-extrabold tracking-wide text-zinc-900 group-hover:text-zinc-700 transition">KORA</span>
        </Link>
      </div>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-6 text-base">
        <Link href="/" className="hover:underline">Главная</Link>
        <Link href="/catalog" className="hover:underline">Каталог</Link>
        <Link href="/about" className="hover:underline">О нас</Link>
        <Link href="/contact" className="hover:underline">Контакты</Link>
      </nav>
      {/* Desktop right buttons */}
      <div className="hidden md:flex items-center gap-4">
        <CartButton />
        <UserButton />
      </div>
      {/* Mobile burger icon */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <Bars3Icon className="w-7 h-7" />
      </button>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50 transition-all">
          <button
            className="absolute top-6 right-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <nav className="flex flex-col gap-8 text-2xl font-semibold text-zinc-900 items-center">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:underline">Главная</Link>
            <Link href="/catalog" onClick={() => setMenuOpen(false)} className="hover:underline">Каталог</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:underline">О нас</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:underline">Контакты</Link>
          </nav>
          <div className="flex flex-col items-center gap-4 mt-16 w-full max-w-xs">
            <div className="flex justify-center w-full mb-2">
              <CartButton />
            </div>
            {session?.user ? (
              <>
                <button
                  onClick={handleProfileClick}
                  className="w-full px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 font-semibold transition text-lg"
                >
                  Профиль
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-6 py-3 border border-zinc-900 text-zinc-900 bg-transparent rounded-lg hover:bg-zinc-100 font-semibold transition text-lg"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link 
                href="/auth/signin" 
                onClick={() => setMenuOpen(false)}
                className="w-full px-6 py-3 text-white rounded-lg hover:bg-[#2E6F40]/90 font-semibold transition text-lg text-center"
                style={{ backgroundColor: '#2E6F40' }}
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 