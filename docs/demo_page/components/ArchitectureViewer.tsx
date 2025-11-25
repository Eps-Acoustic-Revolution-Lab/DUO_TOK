import React, { useState } from 'react';
import { AudioLines, BrainCircuit, Shuffle, Layers, ArrowRight } from 'lucide-react';

const stages = [
  {
    id: 1,
    title: "SSL Pretraining",
    subtitle: "BEST-RQ Style",
    icon: <AudioLines size={24} />,
    description: "We pretrain a 24-layer Transformer encoder on large-scale audio using masked prediction. This establishes a semantic foundation for the music representation.",
    tags: ["Masked Prediction", "Mel Spectrogram", "Transformer"]
  },
  {
    id: 2,
    title: "Semantic Stabilization",
    subtitle: "Multi-task + Noise",
    icon: <BrainCircuit size={24} />,
    description: "The encoder is fine-tuned with Gaussian Noise Injection at the bottleneck. Auxiliary tasks (ASR, Chroma, Source Separation) act as semantic guardrails.",
    tags: ["Gaussian Noise", "Lyric Alignment", "Source Awareness"]
  },
  {
    id: 3,
    title: "Dual Discretization",
    subtitle: "SimVQ Routing",
    icon: <Shuffle size={24} />,
    description: "The encoder is frozen. We introduce hard routing to send Vocals and Accompaniment to separate codebooks (32k size each), ensuring semantic decoupling.",
    tags: ["Frozen Encoder", "Hard Routing", "Dual Codebooks"]
  },
  {
    id: 4,
    title: "Latent Diffusion",
    subtitle: "High-Fidelity Decoding",
    icon: <Layers size={24} />,
    description: "Finally, we train a Latent Diffusion Decoder to reconstruct high-fidelity audio from the discrete tokens, targeting the 50Hz ear-VAE latent space.",
    tags: ["DiT-style", "50Hz Latent", "Reconstruction"]
  }
];

export const ArchitectureViewer: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      
      {/* Navigation / Diagram View */}
      <div className="w-full lg:w-1/2 grid grid-cols-1 gap-3">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(index)}
            className={`
              relative p-5 rounded-2xl text-left transition-all duration-200 border group
              flex items-center gap-5
              ${activeStage === index 
                ? 'bg-white border-brand-accent shadow-lg shadow-brand-accent/5 scale-[1.02] z-10' 
                : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'}
            `}
          >
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm border
              ${activeStage === index 
                ? 'bg-brand-accent text-white border-brand-accent' 
                : 'bg-gray-50 text-gray-400 border-gray-100 group-hover:bg-white group-hover:text-brand-accent'}
            `}>
              {stage.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className={`font-mono text-xs uppercase tracking-wider font-bold mb-1 ${activeStage === index ? 'text-brand-accent' : 'text-gray-400'}`}>
                  Stage 0{stage.id}
                </h4>
                {activeStage === index && <ArrowRight size={16} className="text-brand-accent" />}
              </div>
              <h3 className={`text-lg font-bold ${activeStage === index ? 'text-gray-900' : 'text-gray-600'}`}>
                {stage.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Details View */}
      <div className="w-full lg:w-1/2 bg-white border border-gray-200 shadow-xl shadow-gray-200/50 rounded-3xl p-8 min-h-[450px] flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-gradient-to-br from-brand-accent/10 to-purple-100/50 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-[60px]" />

        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-brand-accent mb-6">
             {stages[activeStage].icon}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{stages[activeStage].title}</h2>
          <p className="text-brand-accent font-mono text-sm mb-8 bg-blue-50 inline-block px-3 py-1 rounded-full border border-blue-100">
            {stages[activeStage].subtitle}
          </p>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {stages[activeStage].description}
          </p>

          <div className="flex flex-wrap gap-2">
            {stages[activeStage].tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};