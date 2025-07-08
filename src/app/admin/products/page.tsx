import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "admin") return <div className="text-red-600">403 Forbidden</div>;
  const products = await prisma.product.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="bg-zinc-900 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-800">Add Product</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-t">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Image</th>
              <th className="py-2 text-left">Title</th>
              <th className="py-2 text-left">Category</th>
              <th className="py-2 text-center">Available</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">
                  {p.images?.[0] ? (
                    <Image src={p.images[0]} alt={p.title} width={48} height={48} className="rounded object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-zinc-200 rounded" />
                  )}
                </td>
                <td className="py-2">{p.title}</td>
                <td className="py-2">{p.category}</td>
                <td className="py-2 text-center">{p.available ? "Yes" : "No"}</td>
                <td className="py-2 text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-blue-600 hover:underline mr-2">Edit</Link>
                  {/* Delete button will be added in client component */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 