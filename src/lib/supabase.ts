import { createClient } from '@supabase/supabase-js';
import { BackroomLevel } from '@/types/backroom';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DatabaseLevel {
  id: string;
  level_number: number;
  name: string;
  visual_description: string;
  hazards: string[];
  lore: string;
  story_hook: string;
  image_url?: string;
  author_name?: string;
  created_at: string;
  prompt: string;
}

// Save a level to the database
export async function saveLevel(level: BackroomLevel, authorName?: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('backroom_generator_levels')
      .insert({
        level_number: level.levelNumber,
        name: level.name,
        visual_description: level.visualDescription,
        hazards: level.hazards,
        lore: level.lore,
        story_hook: level.storyHook,
        image_url: level.imageUrl,
        author_name: authorName,
        prompt: level.prompt,
      })
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Error saving level:', error);
    throw new Error('Failed to save level to database');
  }
}

// Get all levels from the database
export async function getAllLevels(): Promise<BackroomLevel[]> {
  try {
    const { data, error } = await supabase
      .from('backroom_generator_levels')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(transformDatabaseLevel);
  } catch (error) {
    console.error('Error fetching levels:', error);
    throw new Error('Failed to fetch levels from database');
  }
}

// Get a specific level by ID
export async function getLevel(id: string): Promise<BackroomLevel | null> {
  try {
    const { data, error } = await supabase
      .from('backroom_generator_levels')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Level not found
      }
      throw error;
    }

    return transformDatabaseLevel(data);
  } catch (error) {
    console.error('Error fetching level:', error);
    throw new Error('Failed to fetch level from database');
  }
}

// Transform database level to frontend format
function transformDatabaseLevel(dbLevel: DatabaseLevel): BackroomLevel {
  return {
    id: dbLevel.id,
    levelNumber: dbLevel.level_number,
    name: dbLevel.name,
    visualDescription: dbLevel.visual_description,
    hazards: dbLevel.hazards,
    lore: dbLevel.lore,
    storyHook: dbLevel.story_hook,
    imageUrl: dbLevel.image_url,
    authorName: dbLevel.author_name,
    createdAt: dbLevel.created_at,
    prompt: dbLevel.prompt,
  };
} 