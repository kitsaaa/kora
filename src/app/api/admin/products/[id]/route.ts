import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { title, slug, category, available, images, variants, description } = await req.json();
  if (!title || !slug || !category || !Array.isArray(images) || !Array.isArray(variants) || variants.length === 0) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  try {
    // Update product fields
    await prisma.product.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        available,
        images,
        description,
      },
    });
    // Update variants: delete all and recreate (simple approach)
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    await prisma.product.update({
      where: { id },
      data: {
        variants: {
          create: variants.map((v: { size: string; price: number }) => ({ size: v.size, price: v.price })),
        },
      },
    });
    const product = await prisma.product.findUnique({ where: { id }, include: { variants: true } });
    return NextResponse.json({ product });
  } catch (e: unknown) {
    const error = e as Error;
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    const deleted = await prisma.product.delete({ where: { id } });
    return NextResponse.json({ deleted });
  } catch (e: unknown) {
    const error = e as Error;
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
} 