import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddProductForm from "./AddProductForm";

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");
  // Only allow admin
  // (You could fetch user and check role here, or in the form component)
  return <AddProductForm />;
} 