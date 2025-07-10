"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../CartProvider";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

// Add types for product and variant
interface ProductVariant {
  id: string;
  size: string;
  price: number;
  productId: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  available: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
  description?: string;
  variants: ProductVariant[];
}

async function getProduct(id: string) {
  const res = await fetch(`/api/products`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.products?.find((p: Product) => p.id === id) || null;
}

export default function ProductDetailsPageWrapper(props: { params: Promise<{ id: string }> }) {
  // This wrapper is needed to use hooks in a server component
  return <ProductDetailsPageClient {...props} />;
}

function ProductDetailsPageClient({ params }: { params: Promise<{ id: string }> }) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch product on mount
  useEffect(() => {
    (async () => {
      const { id } = await params;
      const prod = await getProduct(id);
      setProduct(prod);
      setLoading(false);
    })();
  }, [params]);

  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showSuccess]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!product) return notFound();

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    const variant = product.variants.find(v => v.id === selectedVariant);
    if (!variant) return;
    addToCart({
      productId: product.id,
      variantId: selectedVariant,
      quantity,
      title: product.title,
      variantLabel: variant.size,
      price: variant.price,
    });
    setShowSuccess(true);
  };

  // Add a dark green for category
  const CATEGORY_GREEN = "#17633a";
  return (
    <div className="relative max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-zinc-100 p-6 mt-8 text-zinc-900">
      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          Добавлено в корзину!
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center">
          {product.images && product.images.length > 0 && (
            <div className="relative w-full aspect-[4/3] bg-zinc-100 flex items-center justify-center rounded-xl overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain w-full h-full"
                priority={true}
              />
            </div>
          )}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.slice(1).map((img: string, i: number) => (
                <div key={i} className="relative w-20 h-16 bg-zinc-100 rounded overflow-hidden">
                  <Image src={img} alt="" fill className="object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-zinc-900">{product.title}</h1>
          <div className="mb-0.5">
            <span className="font-semibold">Категория:</span> <span style={{ color: CATEGORY_GREEN }}>{product.category}</span>
          </div>
          <div className="text-zinc-800 mb-2 text-base leading-relaxed">{product.description}</div>
          <div className="mb-2">
            <span className="font-semibold text-zinc-900">Variants:</span>
            <div className="mt-0 flex flex-col gap-2">
              {product.variants.map((v) => (
                <label
                  key={v.id}
                  className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-colors ${selectedVariant === v.id ? "border-[#2E6F40] bg-[#2E6F40]/10" : "border-zinc-200 bg-white hover:border-zinc-400"}`}
                >
                  <input
                    type="radio"
                    name="variant"
                    value={v.id}
                    checked={selectedVariant === v.id}
                    onChange={() => setSelectedVariant(v.id)}
                    className="accent-zinc-900"
                  />
                  <span className="font-medium text-zinc-900">{v.size}</span>
                  <span className="ml-2 text-zinc-900 font-bold" style={{ color: '#2E6F40' }}>{v.price}₽</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <label className="font-semibold text-zinc-900">Qty:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-16 px-2 py-1 border border-zinc-300 rounded text-zinc-900 bg-white"
            />
          </div>
          <button
            className={`mt-4 px-6 py-2 rounded font-semibold transition text-lg shadow-sm ${selectedVariant ? "text-white hover:bg-[#2E6F40]/90" : "bg-zinc-300 text-zinc-500 cursor-not-allowed"}`}
            style={selectedVariant ? { backgroundColor: '#2E6F40' } : {}}
            disabled={!selectedVariant}
            onClick={handleAddToCart}
          >
            В корзину
          </button>
          <Link href="/catalog" className="mt-2 hover:underline font-medium" style={{ color: '#2E6F40' }}>← Назад к каталогу</Link>
        </div>
      </div>
    </div>
  );
} 