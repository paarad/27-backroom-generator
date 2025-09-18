'use client';

import { ReactNode, useState } from 'react';
import { X, Minimize2, Square } from 'lucide-react';

interface Window98Props {
  title: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  minimizable?: boolean;
  maximizable?: boolean;
}

export function Window98({ 
  title, 
  children, 
  className = "",
  onClose,
  minimizable = false,
  maximizable = false
}: Window98Props) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className={`window-98 ${className} ${isMinimized ? 'h-8' : ''}`}>
      {/* Title Bar */}
      <div className="window-title">
        <span>{title}</span>
        <div className="flex gap-1">
          {minimizable && (
            <button 
              className="window-control-btn"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 size={8} />
            </button>
          )}
          {maximizable && (
            <button className="window-control-btn">
              <Square size={8} />
            </button>
          )}
          {onClose && (
            <button 
              className="window-control-btn close-btn"
              onClick={onClose}
            >
              <X size={8} />
            </button>
          )}
        </div>
      </div>
      
      {/* Window Content */}
      {!isMinimized && (
        <div className="window-content">
          {children}
        </div>
      )}
    </div>
  );
}

export function TerminalWindow({ title, children, className = "" }: Omit<Window98Props, 'onClose'>) {
  return (
    <div className={`bg-black border-2 border-gray-600 ${className}`}>
      {/* Terminal Title Bar */}
      <div className="bg-gray-800 text-gray-300 px-3 py-2 text-sm font-mono border-b border-gray-600">
        {title}
      </div>
      
      {/* Terminal Content */}
      <div className="bg-black text-green-400 p-6 font-mono text-base">
        {children}
      </div>
    </div>
  );
}

export function ProgressBar98({ progress, label }: { progress: number; label?: string }) {
  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-mono text-gray-300">{label}</div>}
      <div className="progress-98">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 