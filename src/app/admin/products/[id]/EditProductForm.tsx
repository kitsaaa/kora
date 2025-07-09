"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ProductVariant = { id?: string; size: string; price: number };
type Product = { id: string; title: string; slug: string; category: string; available: boolean; images: string[]; variants: ProductVariant[] };

export default function EditProductForm({ product }: { product: Product }) {
  const [title, setTitle] = useState(product.title);
  const [slug, setSlug] = useState(product.slug);
  const [category, setCategory] = useState(product.category);
  const [available, setAvailable] = useState(product.available);
  const [images, setImages] = useState<string[]>(product.images || []);
  const [uploading, setUploading] = useState(false);
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants.map((v) => ({ id: v.id, size: v.size, price: v.price })));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  function handleVariantChange(idx: number, field: string, value: string | number) {
    setVariants((vs) => vs.map((v, i) => i === idx ? { ...v, [field]: value } : v));
  }
  function addVariant() {
    setVariants((vs) => [...vs, { size: "", price: 0 }]);
  }
  function removeVariant(idx: number) {
    setVariants((vs) => vs.filter((_, i) => i !== idx));
  }
  function removeImage(idx: number) {
    setImages((imgs) => imgs.filter((_, i) => i !== idx));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    setError("");
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      
      // Safely parse JSON response
      let data;
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        console.error("Failed to parse upload response:", e);
        setError("Image upload failed - invalid response");
        setUploading(false);
        return;
      }
      
      if (res.ok && data?.url) {
        uploaded.push(data.url);
      } else {
        setError(data?.error || "Image upload failed");
        setUploading(false);
        return;
      }
    }
    setImages(imgs => [...imgs, ...uploaded]);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title || !slug || !category || variants.some(v => !v.size || !v.price)) {
      setError("Please fill all fields and add at least one variant.");
      return;
    }
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, category, available, images, variants }),
    });
    
    // Safely parse JSON response
    let data;
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      console.error("Failed to parse response:", e);
      setError("Failed to update product - invalid response");
      return;
    }
    
    if (res.ok) {
      setSuccess("Product updated!");
      setTimeout(() => router.push("/admin/products"), 1000);
    } else {
      setError(data?.error || "Failed to update product");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(true);
    setError("");
    const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    
    // Safely parse JSON response
    let data;
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      console.error("Failed to parse delete response:", e);
      setError("Failed to delete product - invalid response");
      setDeleting(false);
      return;
    }
    
    if (res.ok) {
      router.push("/admin/products");
    } else {
      setError(data?.error || "Failed to delete product");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded shadow-md border border-zinc-200 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">Edit Product</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <input type="text" placeholder="Title" className="input input-bordered" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="text" placeholder="Slug" className="input input-bordered" value={slug} onChange={e => setSlug(e.target.value)} required />
      <input type="text" placeholder="Category" className="input input-bordered" value={category} onChange={e => setCategory(e.target.value)} required />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} /> Available
      </label>
      <div>
        <label className="block mb-1">Images</label>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        <div className="flex gap-2 mt-2 flex-wrap">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <Image src={url} alt="" width={64} height={64} className="w-16 h-16 object-cover rounded border" />
              <button type="button" className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded px-1 opacity-80 group-hover:opacity-100" onClick={() => removeImage(i)}>✕</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-1">Variants</label>
        <div className="flex flex-col gap-2">
          {variants.map((v, i: number) => (
            <div key={v.id || i} className="flex gap-2 items-center">
              <input type="text" placeholder="Size" className="input input-bordered flex-1" value={v.size} onChange={e => handleVariantChange(i, "size", e.target.value)} required />
              <input type="number" placeholder="Price" className="input input-bordered w-32" value={v.price} onChange={e => handleVariantChange(i, "price", Number(e.target.value))} required min={0} />
              <button type="button" className="text-red-600 hover:underline" onClick={() => removeVariant(i)} disabled={variants.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" className="text-blue-600 hover:underline mt-2" onClick={addVariant}>Add Variant</button>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-zinc-900 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-800 disabled:opacity-60" disabled={uploading}>Update Product</button>
        <button type="button" className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 disabled:opacity-60" onClick={handleDelete} disabled={deleting}>Delete</button>
      </div>
    </form>
  );
} 