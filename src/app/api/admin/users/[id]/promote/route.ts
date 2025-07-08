import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, context: { params: { id: string } }) {
  const { params } = await Promise.resolve(context);
  const id = typeof params.id === 'string' ? params.id : await params.id;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const admin = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!admin || admin.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const user = await prisma.user.update({
    where: { id },
    data: { role: 'admin' },
    select: { id: true, email: true, name: true, role: true, lastLogin: true, createdAt: true },
  });
  return NextResponse.json({ user });
} 