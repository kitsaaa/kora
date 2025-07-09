"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="max-w-5xl mx-auto px-4 bg-zinc-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-zinc-900">Product Catalog</h1>
      {loading ? (
        <div className="text-center text-zinc-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-zinc-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg border border-zinc-100 flex flex-col transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl group overflow-hidden min-h-[420px]"
            >
              {product.images && product.images.length > 0 && (
                <div className="relative w-full aspect-[4/3] bg-zinc-100 flex items-center justify-center">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain w-full h-full"
                    priority={true}
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col p-5">
                <h2 className="text-xl font-bold mb-1 text-zinc-900 truncate">{product.title}</h2>
                <div className="text-zinc-600 mb-3 line-clamp-2 min-h-[2.5em]">{product.description}</div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-extrabold text-2xl text-zinc-900">{product.variants[0]?.price ?? "-"}₽</span>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-blue-600 hover:underline font-medium text-base px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 