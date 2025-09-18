-- Backroom Generator Database Schema for Existing Supabase Project
-- Unique table names to avoid conflicts with existing tables
-- Run this in your Supabase SQL editor

-- Create the main backroom levels table with unique name
CREATE TABLE backroom_generator_levels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level_number INTEGER,
  name TEXT NOT NULL,
  visual_description TEXT NOT NULL,
  hazards TEXT[] NOT NULL,
  lore TEXT NOT NULL,
  story_hook TEXT NOT NULL,
  image_url TEXT,
  author_name TEXT,
  prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for backroom images (if you want to store images locally)
INSERT INTO storage.buckets (id, name, public)
VALUES ('backroom-generator-images', 'backroom-generator-images', true);

-- Enable Row Level Security
ALTER TABLE backroom_generator_levels ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to read levels
CREATE POLICY "backroom_generator_public_read" ON backroom_generator_levels
  FOR SELECT USING (true);

-- Allow anyone to insert new levels
CREATE POLICY "backroom_generator_public_insert" ON backroom_generator_levels
  FOR INSERT WITH CHECK (true);

-- Create storage policy for image uploads (optional)
CREATE POLICY "backroom_generator_images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'backroom-generator-images');

CREATE POLICY "backroom_generator_images_public_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'backroom-generator-images');

-- Create indexes for better performance
CREATE INDEX idx_backroom_generator_levels_created_at ON backroom_generator_levels(created_at DESC);
CREATE INDEX idx_backroom_generator_levels_level_number ON backroom_generator_levels(level_number);
CREATE INDEX idx_backroom_generator_levels_author ON backroom_generator_levels(author_name) WHERE author_name IS NOT NULL;
CREATE INDEX idx_backroom_generator_levels_prompt ON backroom_generator_levels USING gin(to_tsvector('english', prompt));

-- Create a view for public statistics with unique name
CREATE VIEW backroom_generator_stats AS
SELECT 
  COUNT(*) as total_levels,
  COUNT(DISTINCT author_name) as total_authors,
  COUNT(*) FILTER (WHERE image_url IS NOT NULL) as levels_with_images,
  MAX(created_at) as latest_level,
  MIN(created_at) as first_level,
  AVG(array_length(hazards, 1)) as avg_hazards_per_level
FROM backroom_generator_levels;

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_backroom_generator_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER trigger_backroom_generator_updated_at
  BEFORE UPDATE ON backroom_generator_levels
  FOR EACH ROW
  EXECUTE FUNCTION update_backroom_generator_updated_at();

-- Optional: Create a function to generate level numbers automatically
CREATE OR REPLACE FUNCTION get_next_backroom_level_number()
RETURNS INTEGER AS $$
DECLARE
  next_num INTEGER;
BEGIN
  SELECT COALESCE(MAX(level_number), 0) + 1
  INTO next_num
  FROM backroom_generator_levels;
  
  RETURN next_num;
END;
$$ LANGUAGE plpgsql; 