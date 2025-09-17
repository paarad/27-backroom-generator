import { BackroomGenerator } from '@/components/BackroomGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Backroom Generator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            An AI-powered storytelling tool that creates surreal and terrifying backroom levels 
            from any object or phrase. Generate infinite haunted spaces for your horror content.
          </p>
        </div>

        {/* Main Generator */}
        <BackroomGenerator />

        {/* Footer */}
        <footer className="text-center mt-16 text-slate-400">
          <p>Powered by OpenAI GPT-4o & DALL-E 3</p>
          <p className="mt-2">
            <a 
              href="/wiki" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Browse the Backroom Wiki →
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
