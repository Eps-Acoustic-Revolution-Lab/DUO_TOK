import React from 'react';
import { FileText, Github, Clock, Trophy, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-10 px-4 bg-brand-bg">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient -z-10" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>

      <div className="max-w-5xl w-full text-center space-y-2 z-10 relative">
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-gray-900 leading-none mt-8 mb-4">
          DUO-TOK
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 pb-2">
          Dual-Track Semantic Music Tokenizer
        </h2>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed mt-6 mb-8">
          A novel tokenizer that bridges the gap between <span className="font-semibold text-gray-900 bg-yellow-100 px-1">high-fidelity reconstruction</span> and <span className="font-semibold text-gray-900 bg-blue-100 px-1">language-model learnability</span> for vocal-accompaniment generation.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-8">
          <button className="group flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium shadow-lg shadow-gray-900/20 hover:bg-black hover:scale-105 transition-all duration-200">
            <FileText size={18} />
            <span>Read Paper</span>
          </button>
          
          <a 
            href="https://github.com/Eps-Acoustic-Revolution-Lab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium border border-gray-200 shadow-sm hover:border-gray-300 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
          >
            <Github size={18} />
            <span>View Code</span>
            <span className="absolute -top-2 -right-2 flex items-center gap-1 bg-brand-accent text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              <Clock size={10} />
              COMING SOON
            </span>
          </a>
        </div>

        {/* Separator */}
        <div className="w-24 h-1 bg-gray-200 rounded-full mx-auto mb-8"></div>

        {/* Authors Row - Moved Here */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg font-medium text-gray-600 mb-16">
          <a href="https://github.com/Amulopapa67" className="hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent/30">Rui Lin</a>
          <a href="https://github.com/wuzhiyue111" className="hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent/30">Zhiyue Wu</a>
          <a href="https://github.com/shwj114514" className="hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent/30">JiaHe Lei</a>
          <a href="https://github.com/DDDPG" className="hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent/30">Kangdi Wang</a>
          <a href="https://github.com/StravMeowsky" className="hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent/30">WeiXiong Chen</a>
          <a href="https://github.com/DaiJunYu-1995" className="hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent/30">Junyu Dai</a>
          <a href="https://www.yinchaoyongxian.com/" className="hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent/30">Tao Jiang</a>
          <span className="text-gray-400 text-sm flex items-center"> (εar-lab)</span>
        </div>

        {/* Bottom Stats Grid */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-gray-200">
            <div className="group cursor-default pl-4 border-l-2 border-transparent hover:border-brand-accent transition-all">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1 group-hover:text-brand-accent transition-colors">Affiliation</p>
              <p className="text-sm font-medium text-gray-900">εar-lab, initi:AI Ltd</p>
            </div>
            
             <div className="group cursor-default pl-4 border-l-2 border-transparent hover:border-brand-accent transition-all">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1 group-hover:text-brand-accent transition-colors">Efficiency</p>
              <p className="text-sm font-medium text-gray-900">0.75 kbps Bitrate</p>
            </div>

            <div className="group cursor-default pl-4 border-l-2 border-transparent hover:border-brand-accent transition-all">
              <div className="flex items-center gap-1.5 mb-1">
                 <Trophy size={12} className="text-brand-accent" />
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold group-hover:text-brand-accent transition-colors">SOTA PPL</p>
              </div>
              <p className="text-sm font-bold text-gray-900">Lowest @ 1024</p>
            </div>

            <div className="group cursor-default pl-4 border-l-2 border-transparent hover:border-brand-accent transition-all">
               <div className="flex items-center gap-1.5 mb-1">
                 <Zap size={12} className="text-brand-accent" />
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold group-hover:text-brand-accent transition-colors">SOTA Quality</p>
              </div>
              <p className="text-sm font-bold text-gray-900">Highest MTT@AP</p>
            </div>
        </div>
      </div>
    </section>
  );
};