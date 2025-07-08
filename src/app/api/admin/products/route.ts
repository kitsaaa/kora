import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { title, slug, category, available, images, variants } = await req.json();
  if (!title || !slug || !category || !Array.isArray(images) || !Array.isArray(variants) || variants.length === 0) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  try {
    const product = await prisma.product.create({
      data: {
        title,
        slug,
        category,
        available,
        images,
        variants: {
          create: variants.map((v: { size: string; price: number }) => ({ size: v.size, price: v.price })),
        },
      },
      include: { variants: true },
    });
    return NextResponse.json({ product });
  } catch (e: unknown) {
    const error = e as Error;
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
} 