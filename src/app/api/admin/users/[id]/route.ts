import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, context: { params: { id: string } }) {
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
  try {
    const deleted = await prisma.user.delete({ where: { id } });
    return NextResponse.json({ deleted });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to delete user' }, { status: 500 });
  }
} 