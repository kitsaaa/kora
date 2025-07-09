"use client";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Link href="/cart" className="relative group" aria-label="Корзина">
      <ShoppingCartIcon className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
          {itemCount}
        </span>
      )}
    </Link>
  );
} 