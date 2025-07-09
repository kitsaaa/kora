import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return <div className="text-red-600 p-8">User not found</div>;
  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded shadow p-8 border border-zinc-200">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center text-3xl text-zinc-500">
          {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
        </div>
        <div className="text-xl font-bold">{user.name || "No name set"}</div>
        <div className="text-zinc-600">{user.email}</div>
      </div>
      <div className="text-sm text-zinc-500 text-center">
        This is your profile page. More features coming soon!
      </div>
    </div>
  );
} 