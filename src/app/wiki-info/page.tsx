'use client';

import { useState } from 'react';
import { Window98 } from '@/components/ui/window-98';
import { ArrowLeft } from 'lucide-react';

export default function WikiInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black relative overflow-hidden">
      {/* CRT Effects */}
      <div className="matrix-rain" />
      
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ff00' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H0v-2h20v2.5zm0 2V23H0v-2h20v-.5zM0 18h20v-2H0v2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="p-8">
        {/* Back Button */}
        <button 
          onClick={() => window.close()}
          className="btn-98 mb-4 flex items-center space-x-2"
        >
          <ArrowLeft size={16} />
          <span>Close Window</span>
        </button>

        {/* Main Wiki Window */}
        <div className="flex justify-center">
          <Window98 
            title="BACKROOMS_DOCUMENTATION.HTM - Internet Explorer"
            className="w-full max-w-5xl"
            maximizable
          >
            <div className="bg-white text-black p-6 font-mono">
              {/* Browser-style address bar */}
              <div className="border-2 border-gray-400 p-2 mb-4 bg-gray-100">
                <div className="text-xs">
                  <span className="font-bold">Address:</span> file:///C:/LIMINAL/DOCS/backrooms_documentation.htm
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 text-sm leading-relaxed">
                <div className="text-center border-b-2 border-black pb-4">
                  <h1 className="text-2xl font-bold mb-2">THE BACKROOMS</h1>
                  <p className="text-gray-600">Classified Documentation - Level 0 through ∞</p>
                </div>

                <div className="bg-yellow-100 border-2 border-yellow-600 p-4">
                  <p className="font-bold text-red-700">⚠️ WARNING:</p>
                  <p>The following document contains information about anomalous spatial phenomena. 
                  Distribution is restricted to authorized personnel only.</p>
                </div>

                <section>
                  <h2 className="text-lg font-bold mb-3 border-b border-gray-400">OVERVIEW</h2>
                  <p>
                    The Backrooms represent an infinite maze of randomly segmented rooms, 
                    characterized by the smell of old moist carpet, the madness of mono-yellow, 
                    the endless background noise of fluorescent lights at maximum hum-buzz, 
                    and approximately six hundred million square miles of randomly segmented empty rooms to be trapped in.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold mb-3 border-b border-gray-400">ENTRY CONDITIONS</h2>
                  <p>
                    If you're not careful and you noclip out of reality in the wrong areas, 
                    you'll end up in the Backrooms, where it's nothing but the smell of old 
                    moist carpet, the madness of mono-yellow, and endless background noise of 
                    fluorescent lights at maximum hum-buzz, and God save you if you hear something 
                    wandering around nearby, because it sure as hell has heard you...
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold mb-3 border-b border-gray-400">LEVEL CLASSIFICATION</h2>
                  <div className="bg-gray-100 p-4 border border-gray-400">
                    <p className="mb-2"><strong>Level 0:</strong> The original yellow rooms with buzzing fluorescent lights</p>
                    <p className="mb-2"><strong>Level 1:</strong> Concrete hallways and industrial spaces</p>
                    <p className="mb-2"><strong>Level 2:</strong> Maintenance tunnels with hot pipes</p>
                    <p className="mb-2"><strong>Level 3:</strong> Electrical stations and machinery</p>
                    <p className="mb-2"><strong>Level 4:</strong> Abandoned offices at night</p>
                    <p><strong>Level ∞:</strong> Unknown phenomena beyond human comprehension</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold mb-3 border-b border-gray-400">ENTITIES</h2>
                  <div className="bg-red-50 border-2 border-red-300 p-4">
                    <p className="mb-2"><strong className="text-red-700">Class I - Passive:</strong> Generally harmless, may ignore humans</p>
                    <p className="mb-2"><strong className="text-orange-700">Class II - Neutral:</strong> Unpredictable behavior, approach with caution</p>
                    <p className="mb-2"><strong className="text-red-800">Class III - Hostile:</strong> Actively dangerous, avoid at all costs</p>
                    <p><strong className="text-purple-800">Class IV - Unknown:</strong> Properties undefined, extreme caution advised</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold mb-3 border-b border-gray-400">SURVIVAL GUIDE</h2>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Stay calm and conserve energy</li>
                    <li>Follow walls to avoid getting lost</li>
                    <li>Listen for sounds - both threats and other survivors</li>
                    <li>Mark your path with available materials</li>
                    <li>Ration any food or water you may have</li>
                    <li>Avoid suspicious areas or obvious traps</li>
                    <li>Trust your instincts - if it feels wrong, it probably is</li>
                  </ol>
                </section>

                <section>
                  <h2 className="text-lg font-bold mb-3 border-b border-gray-400">RESEARCH NOTES</h2>
                  <div className="bg-blue-50 border border-blue-300 p-4">
                    <p className="mb-2 font-bold">Dr. █████, Site-██:</p>
                    <p className="mb-2">
                      "The Backrooms appear to follow non-Euclidean geometry. Standard navigation 
                      methods fail consistently. Subjects report feeling watched despite no visible entities."
                    </p>
                    <p className="text-xs text-gray-600">
                      [REDACTED] - [DATA EXPUNGED] - [CLASSIFIED]
                    </p>
                  </div>
                </section>

                <div className="border-t-2 border-black pt-4 text-center text-xs text-gray-500">
                  <p>Document Classification: CONFIDENTIAL</p>
                  <p>Last Updated: ██/██/1998</p>
                  <p>For more information, access the BACKROOM-GEN.EXE application</p>
                </div>
              </div>
            </div>
          </Window98>
        </div>
      </div>
    </div>
  );
} 