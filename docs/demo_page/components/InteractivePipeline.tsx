import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DualTrackVisualizer } from './DualTrackVisualizer';
import { 
  Settings2, Radio, BrainCircuit, Mic, Music2, Layers, 
  ArrowRight, Zap, Grid3X3, Activity, Type, Disc, Sparkles
} from 'lucide-react';

// --- UTILS & SUB-COMPONENTS ---

const COLORS = {
  vocal: '#0891b2', // Cyan
  inst: '#7c3aed',  // Violet
  mix: '#2563EB',   // Blue
  accent: '#ea580c' // Orange
};

// 1. Mel Spectrogram Visualizer
const MelSpectrogram: React.FC<{ color?: string }> = ({ color = COLORS.mix }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const draw = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      const barWidth = 5; // Bigger bars
      const numBars = Math.ceil(w / barWidth);

      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < numBars; i++) {
        for (let j = 0; j < 6; j++) { 
           const x = w - (i * barWidth) + (frame * 0.5 % barWidth);
           // Scrolling noise pattern
           const value = Math.sin(i * 0.15 + j * 0.8 + frame * 0.02) * 0.5 + 0.5;
           
           ctx.fillStyle = color;
           ctx.globalAlpha = value * 0.8;
           const barH = (h / 6) - 1;
           const y = j * (h / 6);
           
           if (value > 0.2) {
             ctx.fillRect(x, y, barWidth - 1, barH);
           }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [color]);

  return (
    <div className="w-24 h-14 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden relative shadow-md">
      <canvas ref={canvasRef} width={96} height={56} />
      <div className="absolute bottom-1 right-1.5 text-[8px] text-white/50 font-mono font-bold tracking-wider">MEL</div>
    </div>
  );
};

// 2. Chroma Visualizer (Heatmap Grid)
const ChromaGrid: React.FC = () => {
  return (
    <div className="w-24 h-14 bg-black rounded-lg border border-gray-800 p-0.5 grid grid-cols-8 gap-[1px] overflow-hidden relative shadow-md">
       {Array.from({ length: 32 }).map((_, i) => (
         <motion.div 
            key={i}
            className="bg-green-500 rounded-[1px]"
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ duration: 1.5, delay: Math.random() * 2, repeat: Infinity }}
         />
       ))}
       <div className="absolute bottom-1 right-1.5 text-[8px] text-white/50 font-mono font-bold tracking-wider z-10 bg-black/40 px-1 rounded">CHROMA</div>
    </div>
  );
};

// 3. Lyrics Visualizer (Scrolling Text)
const LyricsScroll: React.FC<{ text?: string; muted?: boolean }> = ({ text = "♫ Hit the rhyme. 似乎是最好的回答 ♫", muted = false }) => {
  return (
    <div className={`w-24 h-14 bg-white rounded-lg border border-gray-200 overflow-hidden relative flex items-center justify-center shadow-md ${muted ? 'bg-gray-50' : ''}`}>
       {muted ? (
         <span className="text-[9px] font-mono text-gray-400 font-bold">[EMPTY]</span>
       ) : (
         <motion.div 
           className="whitespace-nowrap text-[9px] font-mono text-gray-700 font-bold"
           animate={{ x: ['100%', '-100%'] }}
           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
         >
           {text}
         </motion.div>
       )}
       <div className="absolute bottom-1 right-1.5 text-[8px] text-gray-400 font-mono font-bold tracking-wider">LYRICS</div>
    </div>
  );
};

// 4. MSS Mask Visualizer
const MSSMasks: React.FC = () => {
  return (
    <div className="w-24 h-14 bg-gray-900 rounded-lg border border-gray-700 flex flex-col justify-between p-[2px] relative shadow-md">
       {[0,1,2,3].map(i => (
         <div key={i} className="h-[22%] w-full flex gap-[1px] opacity-90">
            {Array.from({length: 10}).map((_, j) => (
              <motion.div 
                key={j}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: j * 0.08 + i * 0.2 }}
                className="flex-1 rounded-[1px]"
                style={{ backgroundColor: ['#0891b2', '#7c3aed', '#ea580c', '#16a34a'][i] }}
              />
            ))}
         </div>
       ))}
       <div className="absolute bottom-0.5 right-1 text-[8px] text-white/80 font-mono font-bold bg-black/60 px-1 rounded tracking-wider">MSS</div>
    </div>
  );
}

// Node Components
const TransformerStack: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => {
  const layers = 6; 
  return (
    <div className="relative flex flex-col items-center justify-center w-28 h-24 bg-white rounded-xl border border-gray-200 shadow-xl group overflow-hidden">
       
       {/* Animated Data Flow Background Hint */}
       {active && (
         <motion.div 
           className="absolute inset-0 bg-gradient-to-t from-blue-50/0 via-blue-50/50 to-blue-50/0"
           animate={{ y: ['100%', '-100%'] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         />
       )}

       <div className="flex flex-col gap-1 mb-2 z-10 w-full px-5">
         {Array.from({ length: layers }).map((_, i) => {
           // Reverse index for bottom-up flow animation logic
           const reverseIndex = layers - 1 - i;
           return (
             <motion.div 
                key={i} 
                className="w-full h-1 rounded-full bg-gray-100"
                animate={active ? { 
                  backgroundColor: ['#f3f4f6', '#3b82f6', '#f3f4f6'],
                  scaleX: [1, 1.05, 1]
                } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: reverseIndex * 0.15, // Bottom-up delay
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
             />
           );
         })}
       </div>
       <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest border-t border-gray-100 pt-1.5 w-full text-center z-10 bg-white/80 backdrop-blur-sm">
          {label}
       </div>
       <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-gray-900 text-white rounded text-[8px] flex items-center justify-center font-mono font-bold shadow-sm z-20">
         12L
       </div>
    </div>
  );
};

const NoiseInjection: React.FC = () => (
  <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center relative shadow-md z-10 shrink-0">
     <div className="absolute inset-0 rounded-full border border-amber-100 animate-ping opacity-20"></div>
     <Zap size={20} className="text-amber-500 fill-amber-500" />
     {[...Array(6)].map((_, i) => (
       <motion.div
         key={i}
         className="absolute w-1 h-1 bg-amber-400 rounded-full"
         animate={{ 
            x: [0, (Math.random()-0.5)*25], 
            y: [0, (Math.random()-0.5)*25], 
            opacity: [1, 0],
            scale: [1, 0]
         }}
         transition={{ duration: 1, repeat: Infinity, delay: i*0.15 }}
       />
     ))}
     <div className="absolute -bottom-5 text-[9px] font-bold text-amber-700 whitespace-nowrap tracking-wider bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-100">+ NOISE</div>
  </div>
);

const SimVQ: React.FC = () => (
  <div className="w-16 h-16 bg-white rounded-xl border-2 border-indigo-200 grid grid-cols-3 gap-1 p-1 shadow-md relative z-10 shrink-0">
    {[...Array(9)].map((_, i) => (
      <motion.div
        key={i}
        className="rounded-[1px] bg-indigo-50"
        animate={{ backgroundColor: ['#e0e7ff', '#6366f1', '#e0e7ff'] }}
        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
      />
    ))}
    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-700 whitespace-nowrap tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-100">SimVQ</div>
  </div>
);

const FlowLine: React.FC<{ active?: boolean, width?: string, vertical?: boolean }> = ({ active = true, width = "40px", vertical = false }) => (
  <div className={`relative flex items-center justify-center ${vertical ? 'h-8 w-[2px] flex-col' : `h-[2px]`}`} style={{ width: vertical ? '2px' : width }}>
     <div className={`bg-gray-200 rounded-full ${vertical ? 'w-full h-full' : 'h-full w-full'}`} />
     {active && (
       <motion.div 
         className={`absolute bg-brand-accent rounded-full ${vertical ? 'w-full h-1/3' : 'h-full w-1/3'}`}
         animate={vertical ? { y: [-15, 45], opacity: [0, 1, 0] } : { x: [-20, 60], opacity: [0, 1, 0] }}
         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
       />
     )}
  </div>
);

// --- MAIN COMPONENT ---

export const InteractivePipeline: React.FC = () => {
  const [stage, setStage] = useState<2 | 3>(2);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Controls */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl mb-8 border border-gray-200 shadow-inner">
        <button
          onClick={() => setStage(2)}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2.5 ${
            stage === 2 ? 'bg-white text-brand-text shadow-sm ring-1 ring-black/5 scale-105' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Settings2 size={16} />
          Stage 2: Stabilization
        </button>
        <button
          onClick={() => setStage(3)}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2.5 ${
            stage === 3 ? 'bg-white text-brand-text shadow-sm ring-1 ring-black/5 scale-105' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Radio size={16} />
          Stage 3: Discretization
        </button>
      </div>

      {/* Visualizer Container */}
      <div className="w-full bg-white rounded-[2.5rem] border border-gray-200 shadow-xl p-6 md:p-8 overflow-x-auto custom-scrollbar">
         {/* Intrinsic Width Container: Allow flex to determine width, removed fixed min-width to fit screens better */}
         <div className="flex items-center justify-center relative min-w-max mx-auto">
           
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-[0.03] bg-[size:30px_30px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] pointer-events-none" />

           <AnimatePresence mode="wait">
             
             {/* === STAGE 2: STABILIZATION === */}
             {stage === 2 && (
               <motion.div 
                  key="stage2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-1"
               >
                  {/* 1. Input - Taller block for 4 tracks */}
                  <div className="flex flex-col items-center gap-2 shrink-0 w-44">
                    <div className="border-2 border-gray-100 bg-white p-1.5 rounded-2xl shadow-sm w-full">
                      {/* Height increased to 160px to show all track labels */}
                      <DualTrackVisualizer tracks={4} height={160} />
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-widest">MIX AUDIO</div>
                  </div>

                  <FlowLine width="30px" />

                  {/* 2. Encoder */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                     <div className="bg-gray-50/80 p-2 rounded-2xl border border-gray-100 flex items-center gap-2 shadow-sm">
                        <TransformerStack label="Encoder" active />
                     </div>
                  </div>

                  <FlowLine width="30px" />

                  {/* 3. Noise Injection */}
                  <NoiseInjection />

                  <FlowLine width="30px" />

                  {/* 4. Decoder */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                     <TransformerStack label="Decoder" active />
                  </div>

                  <FlowLine width="40px" />

                  {/* 5. Multi-Task Outputs */}
                  <div className="flex flex-col gap-3 border-l-2 border-gray-100 pl-6 relative py-2">
                     {/* Branching lines graphic */}
                     <div className="absolute top-0 bottom-0 left-0 w-6 flex flex-col justify-center">
                        {/* Top Branch */}
                        <div className="absolute top-[12%] left-[-1px] w-6 h-[2px] bg-gray-200 origin-left rotate-[-35deg] rounded-full"></div>
                        <div className="absolute top-[37%] left-[-1px] w-6 h-[2px] bg-gray-200 origin-left rotate-[-12deg] rounded-full"></div>
                        <div className="absolute bottom-[37%] left-[-1px] w-6 h-[2px] bg-gray-200 origin-left rotate-[12deg] rounded-full"></div>
                        <div className="absolute bottom-[12%] left-[-1px] w-6 h-[2px] bg-gray-200 origin-left rotate-[35deg] rounded-full"></div>
                     </div>

                     <div className="flex items-center gap-3 group">
                        <MelSpectrogram />
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Reconstruction</span>
                     </div>
                     <div className="flex items-center gap-3 group">
                        <ChromaGrid />
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Chroma</span>
                     </div>
                     <div className="flex items-center gap-3 group">
                        <LyricsScroll />
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Transcription</span>
                     </div>
                     <div className="flex items-center gap-3 group">
                        <MSSMasks />
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Separation</span>
                     </div>
                  </div>

               </motion.div>
             )}

             {/* === STAGE 3: DUAL DISCRETIZATION === */}
             {stage === 3 && (
               <motion.div 
                  key="stage3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8 py-4"
               >
                  {/* PARALLEL STREAMS CONTAINER */}
                  <div className="relative flex flex-col gap-10">
                     
                     {/* Shared Architecture Background Box */}
                     <div className="absolute top-[-16px] bottom-[-16px] left-[180px] right-[180px] border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 -z-10" />
                     <div className="absolute top-[-32px] left-[50%] -translate-x-1/2 text-[10px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100 whitespace-nowrap">SHARED WEIGHTS (BATCHED)</div>

                     {/* --- VOCAL STREAM --- */}
                     <div className="flex items-center gap-4">
                        {/* Input */}
                        <div className="w-36 flex flex-col items-center gap-2 shrink-0">
                          <div className="border-2 border-cyan-100 bg-cyan-50/30 p-1.5 rounded-xl w-full shadow-sm">
                            <DualTrackVisualizer tracks={1} height={40} colors={[COLORS.vocal]} labels={['Vocal']} />
                          </div>
                        </div>
                        
                        <FlowLine width="20px" />
                        
                        {/* Encoder */}
                        <div className="shrink-0 scale-90 origin-center">
                           <TransformerStack label="Encoder" active />
                        </div>

                        <FlowLine width="20px" />

                        {/* SimVQ */}
                        <div className="shrink-0 scale-90">
                           <SimVQ />
                        </div>

                        <FlowLine width="20px" />

                        {/* Decoder */}
                        <div className="shrink-0 scale-90 origin-center">
                           <TransformerStack label="Decoder" active />
                        </div>

                        <FlowLine width="40px" />

                        {/* Tasks */}
                        <div className="flex flex-col gap-1.5 scale-100 origin-left border-l-2 border-cyan-100 pl-4">
                           <div className="flex gap-2 items-center"><MelSpectrogram color={COLORS.vocal} /></div>
                           <div className="flex gap-2 items-center"><ChromaGrid /></div>
                           <div className="flex gap-2 items-center"><LyricsScroll /></div>
                        </div>
                     </div>

                     {/* --- INST STREAM --- */}
                     <div className="flex items-center gap-4">
                        {/* Input */}
                        <div className="w-36 flex flex-col items-center gap-2 shrink-0">
                          <div className="border-2 border-violet-100 bg-violet-50/30 p-1.5 rounded-xl w-full shadow-sm">
                            <DualTrackVisualizer tracks={1} height={40} colors={[COLORS.inst]} labels={['Inst']} />
                          </div>
                        </div>
                        
                        <FlowLine width="20px" />
                        
                        {/* Encoder */}
                        <div className="shrink-0 scale-90 origin-center opacity-70 grayscale-[0.3] hover:grayscale-0 hover:opacity-100 transition-all">
                           <TransformerStack label="Encoder" active />
                        </div>

                        <FlowLine width="20px" />

                        {/* SimVQ */}
                        <div className="shrink-0 scale-90">
                           <SimVQ />
                        </div>

                        <FlowLine width="20px" />

                        {/* Decoder */}
                        <div className="shrink-0 scale-90 origin-center opacity-70 grayscale-[0.3] hover:grayscale-0 hover:opacity-100 transition-all">
                           <TransformerStack label="Decoder" active />
                        </div>

                        <FlowLine width="40px" />

                        {/* Tasks */}
                        <div className="flex flex-col gap-1.5 scale-100 origin-left border-l-2 border-violet-100 pl-4">
                           <div className="flex gap-2 items-center"><MelSpectrogram color={COLORS.inst} /></div>
                           <div className="flex gap-2 items-center"><ChromaGrid /></div>
                           <div className="flex gap-2 items-center"><LyricsScroll muted /></div>
                        </div>
                     </div>

                  </div>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
      </div>
      
      {/* Caption */}
      <div className="mt-8 max-w-2xl text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700 shadow-sm">
          <Sparkles size={14} />
          {stage === 2 
            ? "Stage 2: Stabilizing semantics via Multi-task Learning & Noise Injection"
            : "Stage 3: Parallel Discretization of Vocal & Instrumental tracks"
          }
        </div>
      </div>
    </div>
  );
};