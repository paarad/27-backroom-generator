import { NextRequest, NextResponse } from 'next/server';
import { generateBackroomLevel } from '@/lib/openai';
import { GenerationRequest, GenerationResponse } from '@/types/backroom';

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json();
    
    if (!body.prompt || body.prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (body.prompt.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Prompt is too long (max 500 characters)' },
        { status: 400 }
      );
    }

    const level = await generateBackroomLevel(body.prompt.trim());

    const response: GenerationResponse = {
      level,
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Generation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate backroom level. Please try again.' 
      },
      { status: 500 }
    );
  }
} 