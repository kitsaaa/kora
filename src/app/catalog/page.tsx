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
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Catalog</h1>
      {loading ? (
        <div className="text-center text-zinc-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-zinc-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-zinc-900 rounded shadow p-4 flex flex-col">
              {product.images && product.images.length > 0 && (
                <Image src={product.images[0]} alt={product.title} width={400} height={300} className="w-full h-48 object-cover rounded mb-4" />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <div className="text-zinc-600 mb-2 line-clamp-2">{product.description}</div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-lg">{product.variants[0]?.price ?? "-"}₽</span>
                <Link href={`/product/${product.id}`} className="text-blue-600 hover:underline font-medium">Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 