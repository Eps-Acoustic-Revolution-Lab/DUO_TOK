
import React from 'react';
import { Hero } from './components/Hero';
import { ParetoChart } from './components/ParetoChart';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { ComparisonTable } from './components/ComparisonTable';
import { InteractivePipeline } from './components/InteractivePipeline';
import { AudioDemo, AudioTrack } from './components/AudioDemo';
import { Info, Volume2, Mic2, Activity, Brain, Check, X } from 'lucide-react';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-16 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight mb-4">{title}</h2>
    <p className="text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>
  </div>
);

// Demo Data Configuration
const DEMO_SAMPLE_1: AudioTrack[] = [
  { id: 'mix_1', label: 'Mix', src: '/duotok_mix_recon.wav' },
  { id: 'vocal_1', label: 'Vocal', src: '/duotok_vocal_recon.wav' },
  { id: 'instr_1', label: 'Accompaniment', src: '/duotok_accompany_recon.wav' },
];

const DEMO_SAMPLE_2: AudioTrack[] = [
  { id: 'mix_2', label: 'Mix', src: '/duotok_mix_recon_2.wav' },
  { id: 'vocal_2', label: 'Vocal', src: '/duotok_vocal_recon_2.wav' },
  { id: 'instr_2', label: 'Accompaniment', src: '/duotok_accompany_recon_2.wav' },
];

function App() {
  return (
    <div className="bg-brand-bg min-h-screen text-brand-text font-sans selection:bg-brand-accent selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-brand-border bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-brand-text text-white flex items-center justify-center font-mono font-bold rounded-lg">
                ε
             </div>
             <span className="text-xl font-bold tracking-tight text-brand-text">DUO-TOK</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#problem" className="hover:text-brand-accent transition-colors">Paper Figure</a>
            <a href="#architecture" className="hover:text-brand-accent transition-colors">Architecture</a>
            <a href="#demos" className="hover:text-brand-accent transition-colors">Audio Demos</a>
            <a href="#results" className="hover:text-brand-accent transition-colors">Benchmarks</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />

        {/* The Problem Section */}
        <section id="problem" className="py-24 px-6 bg-white border-y border-brand-border">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title="The Reconstruction-Generation Gap" 
              subtitle="Optimizing for both high-fidelity audio and language model learnability has historically been a zero-sum game. Duo-Tok shifts the Pareto frontier."
            />
            
            <div className="grid lg:grid-cols-12 gap-12 items-stretch">
              {/* Left Column: Text explanation */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="space-y-6">
                   <p className="text-gray-600 leading-relaxed">
                     Current audio tokenizers force researchers to choose between two extremes, limiting the potential of Music GenAI models.
                   </p>

                   {/* Comparison Cards */}
                   <div className="grid grid-cols-1 gap-4">
                      {/* Card 1: Acoustic */}
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-purple-200 transition-colors">
                         <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                           <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                             <Activity size={18} />
                           </div>
                           <div>
                              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Acoustic Codecs</h3>
                              <span className="text-[10px] text-gray-500">Pure Reconstruction</span>
                           </div>
                         </div>
                         <ul className="space-y-2.5 text-xs text-gray-600">
                           <li className="flex gap-2 items-start">
                              <span className="font-semibold text-gray-900 min-w-[60px]">Focus:</span> 
                              <span>Waveform Fidelity</span>
                           </li>
                           <li className="flex gap-2 items-start">
                              <span className="font-semibold text-gray-900 min-w-[60px]">Models:</span> 
                              <span>Encodec, DAC</span>
                           </li>
                           <li className="flex gap-2 items-center text-green-700 bg-green-50 p-1.5 rounded">
                              <Check size={12} className="shrink-0"/> 
                              <span className="font-medium">Excellent Audio Detail</span>
                           </li>
                           <li className="flex gap-2 items-center text-red-600 bg-red-50 p-1.5 rounded">
                              <X size={12} className="shrink-0"/> 
                              <span className="font-medium">High PPL (Hard to Model)</span>
                           </li>
                         </ul>
                      </div>

                      {/* Card 2: Semantic */}
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-cyan-200 transition-colors">
                         <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                           <div className="p-2 bg-cyan-100 text-cyan-700 rounded-lg">
                             <Brain size={18} />
                           </div>
                           <div>
                              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Semantic Codecs</h3>
                              <span className="text-[10px] text-gray-500">Structure Oriented</span>
                           </div>
                         </div>
                           <ul className="space-y-2.5 text-xs text-gray-600">
                           <li className="flex gap-2 items-start">
                              <span className="font-semibold text-gray-900 min-w-[60px]">Focus:</span> 
                              <span>Linguistic Content</span>
                           </li>
                           <li className="flex gap-2 items-start">
                              <span className="font-semibold text-gray-900 min-w-[60px]">Models:</span> 
                              <span>SemantiCodec, Mucodec</span>
                           </li>
                           <li className="flex gap-2 items-center text-green-700 bg-green-50 p-1.5 rounded">
                              <Check size={12} className="shrink-0"/> 
                              <span className="font-medium">Low PPL (Easy to Model)</span>
                           </li>
                           <li className="flex gap-2 items-center text-red-600 bg-red-50 p-1.5 rounded">
                              <X size={12} className="shrink-0"/> 
                              <span className="font-medium">Poor Reconstruction</span>
                           </li>
                         </ul>
                      </div>
                   </div>
                </div>
              </div>

              {/* Right Column: The Chart */}
              <div className="lg:col-span-8 min-h-[600px] h-full">
                <ParetoChart />
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-24 px-6 bg-brand-bg relative overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeader 
              title="Four-Stage Pipeline" 
              subtitle="A progressive training strategy that separates semantic understanding from acoustic reconstruction."
            />
            <ArchitectureViewer />
          </div>
        </section>

        {/* Dual Track Visualizer Section */}
        <section className="py-24 px-6 bg-white border-y border-brand-border">
          <div className="max-w-5xl mx-auto text-center">
             <SectionHeader 
              title="Dual Track Modeling" 
              subtitle="Explicitly modeling vocals and instruments as separate codebooks enables editability and better LM performance."
            />
            
            <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 mt-4">Pipeline Architecture</h3>
              <InteractivePipeline />
            </div>
          </div>
        </section>

        {/* Audio Demos Section */}
        <section id="demos" className="py-24 px-6 bg-brand-bg border-b border-brand-border">
          <div className="max-w-6xl mx-auto">
            <SectionHeader 
              title="Reconstruction Samples" 
              subtitle="Demonstration of high-fidelity reconstruction quality at 0.75kbps."
            />
            
            <div className="grid md:grid-cols-2 gap-8">
               <AudioDemo 
                 title="Sample 1" 
                 tracks={DEMO_SAMPLE_1}
               />
               <AudioDemo 
                 title="Sample 2" 
                 tracks={DEMO_SAMPLE_2}
               />
            </div>

          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="Benchmark Results" 
              subtitle="State-of-the-art performance on the Codec-Evaluation benchmark, specifically excelling in low-bitrate scenarios."
            />
            <div className="bg-white rounded-2xl shadow-soft border border-brand-border overflow-hidden">
              <ComparisonTable />
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl flex gap-4 items-start">
              <Info className="text-brand-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-900 font-bold text-sm mb-1">Why PPL matters?</h4>
                <p className="text-sm text-blue-700">
                  Perplexity (PPL) measures how "surprised" a Language Model is by the tokens. Lower PPL means the token sequence is more predictable and structured, leading to vastly better generation capabilities in downstream Music GenAI models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-brand-border bg-white text-center text-gray-500 text-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center font-mono font-bold rounded-lg mb-4">
                ε
             </div>
            <p className="mb-6 font-medium text-gray-900">© 2025 εar-lab, initi:AI Ltd.</p>
            <div className="flex gap-8 font-medium text-gray-600">
              <a href="#" className="hover:text-brand-accent transition-colors">Paper PDF</a>
              <a href="#" className="hover:text-brand-accent transition-colors">GitHub Repo</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
            </div>
            <p className="mt-8 text-xs text-gray-400 max-w-lg leading-relaxed">
              This is a demo visualization page based on the research paper "DUO-TOK: Dual-Track Semantic Music Tokenizer for Vocal–Accompaniment Generation".
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;
