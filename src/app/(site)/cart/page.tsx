"use client";
import { useCart } from "../CartProvider";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  // For demo, you may want to fetch product/variant details from API, but here we assume all info is in cart
  const total = cart.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg border border-zinc-100">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900">Корзина</h1>
      {cart.length === 0 ? (
        <div className="text-zinc-600 text-center">Ваша корзина пуста.</div>
      ) : (
        <>
          <ul className="divide-y divide-zinc-200">
            {cart.map((item) => (
              <li key={item.productId + item.variantId} className="flex items-center gap-4 py-4">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-lg text-zinc-900">{item.title}</div>
                  <div className="text-sm text-zinc-600">{item.variantLabel}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="px-2 py-1 rounded bg-zinc-100 text-zinc-700 hover:bg-zinc-200">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="px-2 py-1 rounded bg-zinc-100 text-zinc-700 hover:bg-zinc-200">+</button>
                </div>
                <div className="w-20 text-right text-zinc-900 font-semibold">{item.price != null ? item.price.toLocaleString('ru-RU') : "-"}<span className="ml-0.5">₽</span></div>
                <button onClick={() => removeFromCart(item.productId, item.variantId)} className="ml-2 text-red-500 hover:text-red-700" aria-label="Удалить">×</button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-8">
            <button onClick={clearCart} className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded hover:bg-zinc-200">Очистить корзину</button>
            <div className="text-xl font-bold text-zinc-900">Итого: {total.toLocaleString('ru-RU')}<span className="ml-0.5">₽</span></div>
            <button className="px-6 py-2 text-white rounded hover:bg-[#2E6F40]/90 font-semibold" style={{ backgroundColor: '#2E6F40' }}>Оформить заказ</button>
          </div>
        </>
      )}
      <Link href="/catalog" className="block mt-6 text-[#2E6F40] hover:underline text-center font-medium">← Продолжить покупки</Link>
    </div>
  );
} 