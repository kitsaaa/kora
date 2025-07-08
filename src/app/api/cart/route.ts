import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const cart = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: { product: { include: { variants: true } } },
  });
  return NextResponse.json({ cart });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const { productId, quantity } = await req.json();
  if (!productId || !quantity || quantity < 1) {
    return NextResponse.json({ error: 'Invalid product or quantity' }, { status: 400 });
  }
  const cartItem = await prisma.cartItem.upsert({
    where: { userId_productId: { userId: user.id, productId } },
    update: { quantity },
    create: { userId: user.id, productId, quantity },
  });
  return NextResponse.json({ cartItem });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const { productId } = await req.json();
  if (!productId) {
    return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
  }
  await prisma.cartItem.deleteMany({ where: { userId: user.id, productId } });
  return NextResponse.json({ success: true });
} 