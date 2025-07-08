import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  // Read file as buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  // Upload to Cloudinary
  try {
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
        if (err || !result) reject(err);
        else resolve(result);
      }).end(buffer);
    });
    // @ts-ignore
    return NextResponse.json({ url: upload.secure_url });
  } catch (e) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
} 