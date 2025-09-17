import { NextRequest, NextResponse } from 'next/server';
import { generateBackroomImage } from '@/lib/openai';
import { BackroomLevel } from '@/types/backroom';

export async function POST(request: NextRequest) {
  try {
    const body: { level: BackroomLevel } = await request.json();
    
    if (!body.level || !body.level.visualDescription) {
      return NextResponse.json(
        { success: false, error: 'Level data is required' },
        { status: 400 }
      );
    }

    const imageUrl = await generateBackroomImage(body.level);

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate image. Please try again.' 
      },
      { status: 500 }
    );
  }
} 