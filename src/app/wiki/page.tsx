'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { BackroomLevel } from '@/types/backroom';

export default function WikiPage() {
  const [levels, setLevels] = useState<BackroomLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const response = await fetch('/api/levels');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch levels');
      }
      
      setLevels(data.levels);
    } catch (error) {
      console.error('Error fetching levels:', error);
      setError(error instanceof Error ? error.message : 'Failed to load levels');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto py-8">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading backroom levels...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto py-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Error Loading Wiki</h1>
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={fetchLevels}>Try Again</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Generator
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Backroom Wiki
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Explore the endless catalog of community-generated backroom levels. 
              Each one a unique journey into the surreal and terrifying.
            </p>
            <div className="mt-4 text-slate-400">
              <p>{levels.length} levels discovered</p>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        {levels.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Levels Found</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to create and save a backroom level to the wiki!
              </p>
              <Link href="/">
                <Button>Generate Your First Level</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <Card key={level.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Level Image */}
                {level.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={level.imageUrl}
                      alt={level.name}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-xl">{level.name}</CardTitle>
                  <CardDescription>
                    Based on: &ldquo;{level.prompt}&rdquo;
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Environment */}
                  <div>
                    <h4 className="font-semibold mb-1">Environment</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {level.visualDescription}
                    </p>
                  </div>

                  {/* Hazards */}
                  <div>
                    <h4 className="font-semibold mb-2">Threats</h4>
                    <div className="flex flex-wrap gap-1">
                      {level.hazards.slice(0, 3).map((hazard, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {hazard}
                        </Badge>
                      ))}
                      {level.hazards.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{level.hazards.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Lore Preview */}
                  <div>
                    <h4 className="font-semibold mb-1">Lore</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {level.lore}
                    </p>
                  </div>

                  {/* Story Hook */}
                  <div>
                    <h4 className="font-semibold mb-1">Story Hook</h4>
                    <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary pl-2 line-clamp-2">
                      {level.storyHook}
                    </blockquote>
                  </div>

                  {/* Metadata */}
                  <div className="pt-2 border-t text-xs text-muted-foreground space-y-1">
                    {level.authorName && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>Created by {level.authorName}</span>
                      </div>
                    )}
                    {level.createdAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(level.createdAt)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-slate-400">
          <p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              ← Generate a new level
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
} 