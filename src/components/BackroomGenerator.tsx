'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Image as ImageIcon, Save, Shuffle } from 'lucide-react';
import { BackroomLevel } from '@/types/backroom';
import { toast } from 'sonner';

interface BackroomGeneratorProps {
  onLevelGenerated?: (level: BackroomLevel) => void;
}

export function BackroomGenerator({ onLevelGenerated }: BackroomGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<BackroomLevel | null>(null);
  const [authorName, setAuthorName] = useState('');

  const randomPrompts = [
    'vending machine',
    'soft buzzing',
    'mossy stairwell',
    'endless office cubicles',
    'flickering fluorescent lights',
    'wet concrete walls',
    'distant humming',
    'yellow wallpaper',
    'poolrooms',
    'liminal shopping mall'
  ];

  const generateLevel = async (promptText: string) => {
    if (!promptText.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate level');
      }

      setCurrentLevel(data.level);
      onLevelGenerated?.(data.level);
      toast.success('Backroom level generated!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate level');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    if (!currentLevel) return;

    setIsGeneratingImage(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: currentLevel }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setCurrentLevel(prev => prev ? { ...prev, imageUrl: data.imageUrl } : null);
      toast.success('Image generated!');
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate image');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const saveLevel = async () => {
    if (!currentLevel) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/levels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          level: currentLevel, 
          authorName: authorName.trim() || undefined 
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to save level');
      }

      toast.success('Level saved to the wiki!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save level');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRandomPrompt = () => {
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setPrompt(randomPrompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateLevel(prompt);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generate a Backroom Level</CardTitle>
          <CardDescription>
            Enter any object, phrase, or vibe to create a terrifying liminal space
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., vending machine, soft buzzing, endless hallway..."
                className="flex-1"
                maxLength={500}
                disabled={isGenerating}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleRandomPrompt}
                disabled={isGenerating}
              >
                <Shuffle className="w-4 h-4" />
              </Button>
              <Button type="submit" disabled={isGenerating || !prompt.trim()}>
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Generated Level Display */}
      {currentLevel && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{currentLevel.name}</CardTitle>
                <CardDescription>Based on: "{currentLevel.prompt}"</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={generateImage}
                  disabled={isGeneratingImage}
                >
                  {isGeneratingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
                <Button onClick={saveLevel} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save to Wiki
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image */}
            {currentLevel.imageUrl && (
              <div className="w-full">
                <img
                  src={currentLevel.imageUrl}
                  alt={currentLevel.name}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Environment</h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentLevel.visualDescription}
              </p>
            </div>

            <Separator />

            {/* Hazards */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Hazards & Threats</h3>
              <div className="flex flex-wrap gap-2">
                {currentLevel.hazards.map((hazard, index) => (
                  <Badge key={index} variant="destructive">
                    {hazard}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Lore */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Lore</h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentLevel.lore}
              </p>
            </div>

            <Separator />

            {/* Story Hook */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Story Hook</h3>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                {currentLevel.storyHook}
              </blockquote>
            </div>

            {/* Save Options */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="max-w-xs"
                />
                <span className="text-sm text-muted-foreground">
                  Add your name to be credited in the wiki
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 