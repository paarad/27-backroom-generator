'use client';

import { useState, useEffect } from 'react';
import { BackroomGenerator } from '@/components/BackroomGenerator';
import { Window98 } from '@/components/ui/window-98';

export default function Home() {
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [showMainWindow, setShowMainWindow] = useState(true);
  const [showWikiWindow, setShowWikiWindow] = useState(false);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    }, 1000);

    // Boot sequence
    const bootTimer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(bootTimer);
          setTimeout(() => setShowBootScreen(false), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => {
      clearInterval(timer);
      clearInterval(bootTimer);
    };
  }, []);

  if (showBootScreen) {
    return (
      <div className="boot-screen min-h-screen flex flex-col justify-center items-start pl-8 space-y-4">
        <div className="space-y-2">
          <div className="boot-text">BACKROOM-GEN.EXE</div>
          <div className="text-gray-400">Version 1.0.0</div>
          <div className="text-gray-400">© 1998 Liminal Dynamics Corp.</div>
        </div>
        
        <div className="mt-8 space-y-2">
          <div className="text-yellow-400">Warning: Experimental access protocol detected</div>
          <div className="text-red-400">Connecting to unknown network layers...</div>
          <div className="text-blue-400">Initializing spatial anomaly parser...</div>
        </div>

        <div className="mt-8 w-96">
          <div className="text-gray-300 mb-2">Loading system components...</div>
          <div className="progress-98">
            <div 
              className="progress-fill"
              style={{ width: `${bootProgress}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">{bootProgress}% Complete</div>
        </div>

        {bootProgress === 100 && (
          <div className="text-green-400 animate-pulse">
            System ready. Press any key to continue...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="matrix-rain" />
      
      {/* Yellow Backrooms Background (fallback) */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='backroom-yellow' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Crect width='50' height='50' fill='%23F4E76E'/%3E%3Crect x='0' y='0' width='25' height='25' fill='%23F7EA7A'/%3E%3Crect x='25' y='25' width='25' height='25' fill='%23F7EA7A'/%3E%3Cline x1='0' y1='25' x2='50' y2='25' stroke='%23E6D052' stroke-width='1'/%3E%3Cline x1='25' y1='0' x2='25' y2='50' stroke='%23E6D052' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23backroom-yellow)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>

      {/* Optional Custom Background Image (overlay) */}
      {/* <div className="absolute inset-0 opacity-15">
        <div className="w-full h-full" style={{
          backgroundImage: `url('/br-bg.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
      </div> */}
      
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url('/br-bg3.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
      </div>
      
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ff00' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H0v-2h20v2.5zm0 2V23H0v-2h20v-.5zM0 18h20v-2H0v2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-300 border-t-2 border-white border-l-0 border-r-0 border-b-0 h-8 flex items-center justify-between px-2 z-50">
        <div className="flex items-center space-x-2">
          <button className="btn-98 !px-2 !py-1 flex items-center space-x-1">
            <div className="w-4 h-4 bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">◊</span>
            </div>
            <span>Start</span>
          </button>
          <div className="w-px h-4 bg-gray-600" />
          <button 
            className={`btn-98 !px-2 !py-1 text-xs ${showMainWindow ? '!bg-gray-500' : ''}`}
            onClick={() => setShowMainWindow(!showMainWindow)}
          >
            BACKROOM-GEN.EXE
          </button>
          {showWikiWindow && (
            <button 
              className={`btn-98 !px-2 !py-1 text-xs !bg-gray-500`}
              onClick={() => setShowWikiWindow(!showWikiWindow)}
            >
              WIKI.HTM
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-black">
          <div className="border border-gray-600 px-2 py-1 bg-gray-200">
            {currentTime}
          </div>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="p-4 pb-12">
        {/* Desktop Icons */}
        <div className="absolute top-4 left-4 space-y-4">
          <div className="flex flex-col items-center space-y-1 w-20 cursor-pointer hover:bg-blue-600 hover:bg-opacity-20 p-1 rounded">
            <div className="w-8 h-8 bg-yellow-500 border border-black flex items-center justify-center">
              <span className="text-black text-xs">📁</span>
            </div>
            <span className="text-white text-xs text-center font-mono">My Levels</span>
          </div>
          
          <div 
            className="flex flex-col items-center space-y-1 w-20 cursor-pointer hover:bg-blue-600 hover:bg-opacity-20 p-1 rounded"
            onClick={() => setShowMainWindow(true)}
          >
            <div className="w-8 h-8 bg-green-500 border border-black flex items-center justify-center">
              <span className="text-black text-xs font-bold">BR</span>
            </div>
            <span className="text-white text-xs text-center font-mono">Backroom Gen</span>
          </div>
          
          <div 
            className="flex flex-col items-center space-y-1 w-20 cursor-pointer hover:bg-blue-600 hover:bg-opacity-20 p-1 rounded"
            onClick={() => setShowWikiWindow(true)}
          >
            <div className="w-8 h-8 bg-blue-500 border border-black flex items-center justify-center">
              <span className="text-white text-xs font-bold">📖</span>
            </div>
            <span className="text-white text-xs text-center font-mono">Backroom Wiki</span>
          </div>
        </div>

        {/* Main Application Window */}
        {showMainWindow && (
          <div className="flex justify-center items-start pt-8">
            <Window98 
              title="BACKROOM-GEN.EXE - Spatial Anomaly Generator"
              className="w-full max-w-6xl"
              minimizable
              maximizable
              onClose={() => setShowMainWindow(false)}
            >
              <div className="bg-gray-200 text-black">
                {/* Menu Bar */}
                <div className="border-b border-gray-400 bg-gray-100 px-2 py-1">
                  <div className="flex space-x-4 text-xs">
                    <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">File</span>
                    <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Generate</span>
                    <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Database</span>
                    <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Help</span>
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-black text-green-400 p-2 text-xs font-mono border-b border-gray-400">
                  <div className="flex justify-between">
                    <span>STATUS: CONNECTED TO LIMINAL NETWORK</span>
                    <span className="animate-pulse">● SIGNAL: STRONG</span>
                  </div>
                  <div className="text-yellow-400">
                    WARNING: Reality anchor not detected. Spatial distortions possible.
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-4">
                  <BackroomGenerator />
                </div>
              </div>
            </Window98>
          </div>
        )}

        {/* Wiki Window */}
        {showWikiWindow && (
          <div className="flex justify-center items-start pt-16" style={{ left: '50px', position: 'relative' }}>
            <Window98 
              title="BACKROOMS_DOCUMENTATION.HTM - Internet Explorer"
              className="w-full max-w-5xl"
              minimizable
              maximizable
              onClose={() => setShowWikiWindow(false)}
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
        )}
      </div>
    </div>
  );
}
