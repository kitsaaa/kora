"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

type ProductVariant = { size: string; price: number };
type Product = { id: string; title: string; description: string; images: string[]; variants: ProductVariant[] };

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-zinc-900">Каталог</h1>
      {loading ? (
        <div className="text-center text-zinc-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-zinc-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const isLongTitle = product.title.length > 30;
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg border border-zinc-100 flex flex-col transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl group overflow-hidden"
              >
                {product.images && product.images.length > 0 && (
                  <div className="relative w-full aspect-[4/3] bg-zinc-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                      priority={true}
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col p-5">
                  <h2
                    className={clsx(
                      "font-bold mb-1 text-zinc-900 leading-snug whitespace-normal break-words",
                      isLongTitle ? "text-base" : "text-xl"
                    )}
                    title={product.title}
                  >
                    {product.title}
                  </h2>
                  <div className="mt-auto flex items-center justify-between pt-1">
                    <span className="font-extrabold text-2xl text-zinc-900">От {product.variants[0]?.price != null ? product.variants[0].price.toLocaleString('ru-RU') : "-"}<span className="ml-0.5">₽</span></span>
                    <Link
                      href={`/product/${product.id}`}
                      className="font-medium text-base px-3 py-1 rounded transition-colors"
                      style={{ color: '#2E6F40', background: 'none', border: 'none' }}
                      onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 