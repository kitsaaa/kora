"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [variants, setVariants] = useState([{ size: "", price: 0 }]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  function handleVariantChange(idx: number, field: string, value: string | number) {
    setVariants(vs => vs.map((v, i) => i === idx ? { ...v, [field]: value } : v));
  }
  function addVariant() {
    setVariants(vs => [...vs, { size: "", price: 0 }]);
  }
  function removeVariant(idx: number) {
    setVariants(vs => vs.filter((_, i) => i !== idx));
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
      const data = await res.json();
      if (res.ok && data.url) uploaded.push(data.url);
      else setError(data.error || "Image upload failed");
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
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, category, available, images, variants }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Product created!");
      setTimeout(() => router.push("/admin/products"), 1000);
    } else {
      setError(data.error || "Failed to create product");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded shadow-md border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">Add Product</h2>
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
            <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded border" />
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-1">Variants</label>
        <div className="flex flex-col gap-2">
          {variants.map((v, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input type="text" placeholder="Size" className="input input-bordered flex-1" value={v.size} onChange={e => handleVariantChange(i, "size", e.target.value)} required />
              <input type="number" placeholder="Price" className="input input-bordered w-32" value={v.price} onChange={e => handleVariantChange(i, "price", Number(e.target.value))} required min={0} />
              <button type="button" className="text-red-600 hover:underline" onClick={() => removeVariant(i)} disabled={variants.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" className="text-blue-600 hover:underline mt-2" onClick={addVariant}>Add Variant</button>
        </div>
      </div>
      <button type="submit" className="bg-zinc-900 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-800 disabled:opacity-60" disabled={uploading}>Create Product</button>
    </form>
  );
} 