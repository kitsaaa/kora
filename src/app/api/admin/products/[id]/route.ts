import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { params } = await Promise.resolve(context);
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
    // Update product fields
    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        category,
        available,
        images,
      },
    });
    // Update variants: delete all and recreate (simple approach)
    await prisma.productVariant.deleteMany({ where: { productId: params.id } });
    await prisma.product.update({
      where: { id: params.id },
      data: {
        variants: {
          create: variants.map((v: any) => ({ size: v.size, price: v.price })),
        },
      },
    });
    const product = await prisma.product.findUnique({ where: { id: params.id }, include: { variants: true } });
    return NextResponse.json({ product });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = await Promise.resolve(context);
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    await prisma.productVariant.deleteMany({ where: { productId: params.id } });
    const deleted = await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ deleted });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to delete product' }, { status: 500 });
  }
} 