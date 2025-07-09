import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function getProduct(id: string) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.products?.find((p: any) => p.id === id) || null;
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-zinc-100 p-6 mt-8">
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
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">{product.title}</h1>
          <div className="text-zinc-600 mb-2">{product.description}</div>
          <div className="mb-4">
            <span className="font-semibold text-zinc-700">Category:</span> {product.category}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-zinc-700">Variants:</span>
            <ul className="mt-1 ml-4 list-disc text-zinc-700">
              {product.variants.map((v: any, i: number) => (
                <li key={i}>
                  {v.size} — <span className="font-bold">{v.price}₽</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="mt-4 bg-zinc-900 text-white px-6 py-2 rounded font-semibold hover:bg-zinc-800 transition">Add to Cart</button>
          <Link href="/catalog" className="mt-2 text-blue-600 hover:underline">← Back to catalog</Link>
        </div>
      </div>
    </div>
  );
} 