'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TerminalWindow, ProgressBar98, Window98 } from '@/components/ui/window-98';
import { Loader2, Image as ImageIcon, Save, Shuffle, AlertTriangle } from 'lucide-react';
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
  const [progress, setProgress] = useState(0);

  const randomPrompts = [
    'old vending machine',
    'flickering fluorescent lights',
    'endless office cubicles',
    'wet concrete walls',
    'distant humming sound',
    'yellow wallpaper peeling',
    'poolrooms with chlorine smell',
    'infinite stairwell',
    'buzzing ceiling fan',
    'mossy brick tunnel'
  ];

  const generateLevel = async (promptText: string) => {
    if (!promptText.trim()) {
      toast.error('ERROR: No input detected');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      setProgress(100);
      setCurrentLevel(data.level);
      onLevelGenerated?.(data.level);
      toast.success('Level generated successfully');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Generation failed');
    } finally {
      clearInterval(progressTimer);
      setIsGenerating(false);
      setProgress(0);
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
        throw new Error(data.error || 'Image generation failed');
      }

      setCurrentLevel(prev => prev ? { ...prev, imageUrl: data.imageUrl } : null);
      toast.success('Image generated successfully');
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Image generation failed');
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
        throw new Error(data.error || 'Save failed');
      }

      toast.success(data.updated ? 'Level updated in database' : 'Level saved to database');
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error instanceof Error ? error.message : 'Save failed');
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
    <div className="space-y-4">
      {/* Input Terminal */}
      <TerminalWindow title="C:\LIMINAL\PROMPT_INPUT.EXE" className="w-full">
        <div className="space-y-2">
          <div className="text-green-400">
            <span className="text-yellow-400">liminal@backrooms:~$</span> Enter spatial anomaly trigger:
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">&gt;</span>
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="old vending machine..."
                className="terminal-input flex-1"
                maxLength={500}
                disabled={isGenerating}
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="btn-98 flex items-center space-x-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <span>EXECUTE</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleRandomPrompt}
                disabled={isGenerating}
                className="btn-98 flex items-center space-x-1"
              >
                <Shuffle className="w-3 h-3" />
                <span>RANDOM</span>
              </button>
            </div>

            {isGenerating && (
              <ProgressBar98 
                progress={progress} 
                label="Parsing liminal space..." 
              />
            )}
          </form>
        </div>
      </TerminalWindow>

      {/* Generated Level Display */}
      {currentLevel && (
        <Window98 
          title="ANOMALY_REPORT.TXT - Notepad"
          className="w-full"
          maximizable
        >
          <div className="bg-white text-black p-6 font-mono text-base space-y-6">
            {/* Header */}
            <div className="border-b border-gray-400 pb-3">
              <div className="text-xl font-bold">{currentLevel.name}</div>
              <div className="text-gray-600 text-sm">
                CLASSIFICATION: SPATIAL ANOMALY | SOURCE: &ldquo;{currentLevel.prompt}&rdquo;
              </div>
            </div>

            {/* Image */}
            {currentLevel.imageUrl && (
              <div className="border-2 border-gray-400 p-3">
                <div className="text-sm text-gray-600 mb-3">VISUAL_DOCUMENTATION.JPG</div>
                <Image
                  src={currentLevel.imageUrl}
                  alt={currentLevel.name}
                  width={512}
                  height={512}
                  className="w-full max-w-md mx-auto border border-gray-400"
                />
              </div>
            )}

            {/* Environment Description */}
            <div>
              <div className="font-bold text-sm text-gray-700 mb-2">ENVIRONMENTAL_DATA:</div>
              <div className="pl-4 border-l-2 border-gray-400 text-base leading-relaxed">
                {currentLevel.visualDescription}
              </div>
            </div>

            {/* Hazards */}
            <div>
              <div className="font-bold text-sm text-gray-700 mb-2 flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>THREAT_ASSESSMENT:</span>
              </div>
              <div className="pl-4 space-y-2">
                {currentLevel.hazards.map((hazard, index) => (
                  <div key={index} className="text-red-700 text-base">
                    [{String(index + 1).padStart(2, '0')}] {hazard}
                  </div>
                ))}
              </div>
            </div>

            {/* Lore */}
            <div>
              <div className="font-bold text-sm text-gray-700 mb-2">DISCOVERY_LOG:</div>
              <div className="pl-4 border-l-2 border-gray-400 text-base text-justify leading-relaxed">
                {currentLevel.lore}
              </div>
            </div>

            {/* Story Hook */}
            <div>
              <div className="font-bold text-sm text-gray-700 mb-2">SURVIVOR_TRANSMISSION:</div>
              <div className="bg-gray-100 p-4 border border-gray-400 italic text-base leading-relaxed">
                &ldquo;{currentLevel.storyHook}&rdquo;
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-400 pt-4 space-y-3">
              <div className="flex space-x-2">
                <button
                  onClick={generateImage}
                  disabled={isGeneratingImage}
                  className="btn-98 flex items-center space-x-1"
                >
                  {isGeneratingImage ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>CAPTURING...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3" />
                      <span>CAPTURE_IMAGE</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={saveLevel}
                  disabled={isSaving}
                  className="btn-98 flex items-center space-x-1"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>SAVING...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3 h-3" />
                      <span>SAVE_TO_DB</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">RESEARCHER_ID:</span>
                <input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Anonymous"
                  className="terminal-input !bg-white !text-black !border-gray-400 text-sm px-3 py-2 !min-h-8"
                />
                <span className="text-sm text-gray-500">
                  (Optional field for database entry)
                </span>
              </div>
            </div>
          </div>
        </Window98>
      )}
    </div>
  );
} 