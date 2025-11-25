import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Layers, Mic, Music, FileAudio, RotateCcw } from 'lucide-react';

export interface AudioTrack {
  id: string;
  label: string;
  src: string;
}

interface AudioDemoProps {
  title: string;
  tracks: AudioTrack[];
}

// Simulating audio visualization data (Sine wave + Random noise)
const generateBars = (count: number, seed: number) => {
  return Array.from({ length: count }, (_, i) => 
    Math.max(10, Math.abs(Math.sin(i * 0.5 + seed) * 100))
  );
};

export const AudioDemo: React.FC<AudioDemoProps> = ({ title, tracks }) => {
  const [activeTrackId, setActiveTrackId] = useState(tracks[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bars, setBars] = useState<number[]>(generateBars(40, 0));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto'; // Try to load immediately

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const p = (audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100;
            setProgress(p);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setBars(generateBars(40, 0));
    };

    // Error handling to prevent UI freezing if file missing
    const handleError = () => {
        console.warn("Audio source missing or format unsupported. Visualizer will still simulate.");
        // We don't stop isPlaying here to allow 'fake' demoing if desired, 
        // or you can uncomment below to stop:
        // setIsPlaying(false); 
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('error', handleError);

    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.removeEventListener('ended', handleEnded);
            audioRef.current.removeEventListener('error', handleError);
        }
    };
  }, []);

  // Handle Track Switching
  useEffect(() => {
      if (!audioRef.current) return;
      
      const selectedTrack = tracks.find(t => t.id === activeTrackId);
      if (selectedTrack) {
          const wasPlaying = !audioRef.current.paused || isPlaying;
          const currTime = audioRef.current.currentTime;
          
          audioRef.current.src = selectedTrack.src;
          // Restore timestamp to sync tracks (Semantic/Acoustic alignment)
          if (isFinite(currTime)) {
            audioRef.current.currentTime = currTime;
          }

          if (wasPlaying) {
              audioRef.current.play().catch(e => console.log("Auto-play blocked or waiting interaction"));
          }
      }
  }, [activeTrackId, tracks]);

  // Visualizer Loop (Simulated)
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      // Update bars every 50ms to create animation
      interval = setInterval(() => {
        setBars(generateBars(40, Date.now() / 100));
      }, 50);
    } else {
        // Static bars when paused
        setBars(generateBars(40, 0));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Play/Pause Toggle
  const togglePlayback = () => {
      if (!audioRef.current) return;

      if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
      } else {
          // Ensure src is set
          if (!audioRef.current.src || audioRef.current.src === '') {
               const t = tracks.find(track => track.id === activeTrackId);
               if (t) audioRef.current.src = t.src;
          }
          
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
                .then(() => setIsPlaying(true))
                .catch(error => {
                    console.error("Playback failed (likely missing file):", error);
                    // Force playing state to true to show animation even if file missing (Demo Mode)
                    setIsPlaying(true); 
                });
          }
      }
  };

  // Seek handler
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current) return;
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const ratio = x / bounds.width;
      const newTime = ratio * (audioRef.current.duration || 10); // Default to 10s if no duration
      
      if (isFinite(newTime)) {
          audioRef.current.currentTime = newTime;
          setProgress(ratio * 100);
      }
  };

  // Helper for styles
  const getTheme = () => {
      const lowerId = activeTrackId.toLowerCase();
      if (lowerId.includes('vocal')) return { color: 'bg-cyan-600', text: 'text-cyan-600', icon: <Mic size={18} /> };
      if (lowerId.includes('instr') || lowerId.includes('acc')) return { color: 'bg-violet-600', text: 'text-violet-600', icon: <Music size={18} /> };
      return { color: 'bg-blue-600', text: 'text-blue-600', icon: <Layers size={18} /> };
  };

  const theme = getTheme();

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 ${theme.text}`}>
                {theme.icon}
             </div>
             <div>
                <h3 className="font-bold text-gray-900 leading-tight">{title}</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                   {tracks.find(t => t.id === activeTrackId)?.label}
                </p>
             </div>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
            {tracks.map(track => {
                 const isActive = activeTrackId === track.id;
                 return (
                    <button 
                        key={track.id}
                        onClick={() => setActiveTrackId(track.id)}
                        className={`
                            px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap
                            ${isActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}
                        `}
                    >
                        {track.label}
                    </button>
                 );
            })}
        </div>
      </div>

      {/* Visualizer Area */}
      <div className="h-28 bg-gray-50/50 rounded-2xl border border-gray-100 mb-5 flex items-end justify-center gap-[3px] p-5 overflow-hidden relative">
        {bars.map((h, i) => (
            <div 
                key={i} 
                className={`w-2 rounded-full transition-all duration-100 ease-in-out opacity-80 ${theme.color}`}
                style={{ 
                    height: `${isPlaying ? h * (0.4 + Math.random() * 0.6) : h * 0.3}%`,
                    opacity: isPlaying ? 0.9 : 0.4
                }}
            ></div>
        ))}
        
        {/* Playback Status Overlay if paused */}
        {!isPlaying && progress === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
                <Play size={32} className="text-gray-400 opacity-50" />
            </div>
        )}
      </div>

      {/* Progress & Transport */}
      <div className="flex items-center gap-4">
        <button 
            onClick={togglePlayback}
            className={`w-12 h-12 rounded-full text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md ${theme.color}`}
        >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
        
        <div className="flex-1 cursor-pointer group py-2" onClick={handleSeek}>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
                <div 
                    className={`absolute inset-y-0 left-0 transition-all duration-100 ease-linear ${theme.color}`} 
                    style={{ width: `${progress}%` }}
                ></div>
                {/* Hover indicator */}
                <div className="opacity-0 group-hover:opacity-100 absolute inset-y-0 bg-black/10 w-full transition-opacity"></div>
            </div>
        </div>

        <div className="text-xs font-mono font-medium text-gray-400 min-w-[3rem] text-right">
             {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
};

export default AudioDemo;
