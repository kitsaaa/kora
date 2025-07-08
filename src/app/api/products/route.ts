import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { title: 'asc' },
    include: { variants: true },
  });
  return NextResponse.json({ products });
} 