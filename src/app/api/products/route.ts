import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { title: 'asc' },
    include: { variants: true },
  });
  return NextResponse.json({ products });
} 