import { NextRequest, NextResponse } from 'next/server';
import { saveLevel, getAllLevels } from '@/lib/supabase';
import { BackroomLevel } from '@/types/backroom';

// GET /api/levels - Fetch all levels
export async function GET() {
  try {
    const levels = await getAllLevels();
    return NextResponse.json({ success: true, levels });
  } catch (error) {
    console.error('Error fetching levels:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch levels' },
      { status: 500 }
    );
  }
}

// POST /api/levels - Save a level
export async function POST(request: NextRequest) {
  try {
    const body: { level: BackroomLevel; authorName?: string } = await request.json();
    
    if (!body.level) {
      return NextResponse.json(
        { success: false, error: 'Level data is required' },
        { status: 400 }
      );
    }

    const result = await saveLevel(body.level, body.authorName);
    
    return NextResponse.json({
      success: true,
      id: result.id,
      updated: result.updated,
    });
  } catch (error) {
    console.error('Error saving level:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save level' },
      { status: 500 }
    );
  }
} 