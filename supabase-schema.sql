-- Backroom Generator Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Create the backroom_levels table
CREATE TABLE backroom_levels (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE backroom_levels ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to read levels
CREATE POLICY "Allow public read" ON backroom_levels
  FOR SELECT USING (true);

-- Allow anyone to insert new levels
CREATE POLICY "Allow public insert" ON backroom_levels
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_backroom_levels_created_at ON backroom_levels(created_at DESC);
CREATE INDEX idx_backroom_levels_level_number ON backroom_levels(level_number);
CREATE INDEX idx_backroom_levels_author ON backroom_levels(author_name) WHERE author_name IS NOT NULL;

-- Optional: Create a view for public statistics
CREATE VIEW public_stats AS
SELECT 
  COUNT(*) as total_levels,
  COUNT(DISTINCT author_name) as total_authors,
  COUNT(*) FILTER (WHERE image_url IS NOT NULL) as levels_with_images,
  MAX(created_at) as latest_level
FROM backroom_levels; 