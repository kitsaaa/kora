import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }
    
    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Cloudinary
    const upload = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          resource_type: 'image',
          folder: 'ecommerce-products' // Optional: organize uploads in a folder
        }, 
        (err, result) => {
          if (err || !result) {
            reject(err || new Error('Upload failed'));
          } else {
            resolve(result as CloudinaryUploadResult);
          }
        }
      ).end(buffer);
    });
    
    return NextResponse.json({ 
      url: upload.secure_url,
      success: true 
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 