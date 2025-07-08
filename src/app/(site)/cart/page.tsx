"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type ProductVariant = { size: string; price: number };
type Product = { title: string; variants: ProductVariant[] };
type CartItem = { id: string; product: Product; quantity: number };

export default function CartPage() {
  const { status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") fetchCart();
  }, [status]);

  async function fetchCart() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/cart");
    const data = await res.json();
    setLoading(false);
    if (res.ok) setCart(data.cart);
    else setError(data.error || "Failed to load cart");
  }

  const total = cart.reduce((sum: number, item: CartItem) => {
    const price = item.product.variants[0]?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-zinc-900 rounded shadow-md border border-zinc-200 dark:border-zinc-800">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>
      {status !== "authenticated" ? (
        <div className="text-center text-zinc-600">Пожалуйста, войдите, чтобы просматривать корзину.</div>
      ) : loading ? (
        <div className="text-center text-zinc-600">Загрузка...</div>
      ) : error ? (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      ) : cart.length === 0 ? (
        <div className="text-zinc-600">Ваша корзина пуста.</div>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{item.product.title}</div>
                  <div className="text-xs text-zinc-500">Вариант: {item.product.variants[0]?.size}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span>×{item.quantity}</span>
                  <span className="font-mono">{item.product.variants[0]?.price * item.quantity}₽</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right font-bold text-lg">Итого: {total}₽</div>
        </>
      )}
    </div>
  );
} 