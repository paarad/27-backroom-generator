import OpenAI from 'openai';
import { BackroomLevel } from '@/types/backroom';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBackroomLevel(prompt: string): Promise<BackroomLevel> {
  const systemPrompt = `You are an expert at creating terrifying and surreal "backrooms" levels. 
  
Given a user's prompt (object, phrase, or vibe), create a detailed backrooms level with the following structure:

1. Level Name & Number: Creative name with a level number (e.g., "Level 173: The Breathing Hall")
2. Visual Environment Description: Detailed description of what the space looks like (2-3 sentences)
3. Hazards & Threats: List of 3-4 specific dangers or entities (as array)
4. Lore: One paragraph about the origin, rumors, or discovery of this level
5. Story Hook: A creepy entry log, survivor tape quote, or cryptic message that draws readers in

Make it genuinely unsettling but not gratuitously gory. Focus on psychological horror, liminal spaces, and the uncanny.

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text. Do not wrap your response in backticks or code formatting.

Return in this exact format:
{
  "levelNumber": number,
  "name": "Level X: The [Name]",
  "visualDescription": "description here",
  "hazards": ["hazard1", "hazard2", "hazard3"],
  "lore": "lore paragraph here",
  "storyHook": "story hook here"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Create a backrooms level based on: ${prompt}` }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    // Clean the response by removing markdown code blocks if present
    const cleanedContent = content
      .replace(/```json\s*/g, '')
      .replace(/```\s*$/g, '')
      .trim();

    // Parse the JSON response
    let levelData;
    try {
      levelData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw content:', content);
      console.error('Cleaned content:', cleanedContent);
      throw new Error('Failed to parse AI response as JSON');
    }
    
    return {
      ...levelData,
      prompt,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error generating backroom level:', error);
    throw new Error('Failed to generate backroom level');
  }
}

export async function generateBackroomImage(level: BackroomLevel): Promise<string> {
  try {
    const imagePrompt = `A haunting, liminal space: ${level.visualDescription}. 
    Style: atmospheric horror, dim lighting, uncanny valley, liminal space aesthetic, 
    photorealistic but unsettling. No people visible. Focus on the architectural and environmental details.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error('No image URL generated');
    }

    return imageUrl;
  } catch (error) {
    console.error('Error generating backroom image:', error);
    throw new Error('Failed to generate backroom image');
  }
} 