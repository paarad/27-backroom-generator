export interface BackroomLevel {
  id?: string;
  levelNumber?: number;
  name: string;
  visualDescription: string;
  hazards: string[];
  lore: string;
  storyHook: string;
  imageUrl?: string;
  authorName?: string;
  createdAt?: string;
  prompt: string;
}

export interface GenerationRequest {
  prompt: string;
  includeImage?: boolean;
}

export interface GenerationResponse {
  level: BackroomLevel;
  success: boolean;
  error?: string;
} 