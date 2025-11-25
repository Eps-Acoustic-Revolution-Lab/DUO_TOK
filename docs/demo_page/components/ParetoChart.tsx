import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

// Real data from Table 1
const data = [
  { name: 'MuCodec-LeVo', x: 8.10, y: 1.37, bitrate: 0.70, type: 'Existing', melLabel: '1.37' },
  { name: 'WavTokenizer', x: 38.2, y: 1.15, bitrate: 0.48, type: 'Existing', melLabel: '1.15' },
  { name: 'SemantiCodec', x: 15.5, y: 0.98, bitrate: 1.30, type: 'Existing', melLabel: '0.98' },
  { name: 'X-Codec', x: 47.5, y: 0.91, bitrate: 4.00, type: 'Existing', melLabel: '0.91' },
  { name: 'YuE', x: 46.2, y: 0.90, bitrate: 4.00, type: 'Existing', melLabel: '0.90' },
  { name: 'Encodec', x: 141.3, y: 0.78, bitrate: 6.00, type: 'Existing', melLabel: '0.78' },
  { name: 'DAC', x: 194.0, y: 0.73, bitrate: 6.00, type: 'Existing', melLabel: '0.73' },
  { name: 'Duo-Tok (ours)', x: 4.75, y: 0.93, bitrate: 0.75, type: 'Ours', melLabel: '0.74 (Voc) / 1.12 (Inst)' },
];

const CustomBubble = (props: any) => {
  const { cx, cy, payload } = props;
  const radius = 6 + Math.sqrt(payload.bitrate) * 10; 
  const isOurs = payload.type === 'Ours';
  const isYuE = payload.name === 'YuE';
  const labelY = isYuE ? cy + radius + 15 : cy - radius - 8;

  return (
    <g className="transition-all duration-300 hover:opacity-80 cursor-pointer">
      <circle 
        cx={cx} 
        cy={cy} 
        r={radius} 
        fill={isOurs ? "#2563EB" : "#FFFFFF"} 
        stroke={isOurs ? "#2563EB" : "#94a3b8"} 
        strokeWidth={isOurs ? 0 : 2}
        opacity={isOurs ? 1 : 0.7}
      />
      <text 
        x={cx} 
        y={labelY} 
        textAnchor="middle" 
        fill={isOurs ? "#1e3a8a" : "#475569"} 
        fontSize={12}
        fontWeight={isOurs ? "700" : "500"}
        style={{pointerEvents: 'none', textShadow: '0px 2px 4px white'}}
      >
        {payload.name}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-xl text-sm z-50">
        <p className="font-bold text-gray-900 mb-2 text-base">{data.name}</p>
        <div className="space-y-1 font-mono text-xs text-gray-600">
          <div className="flex justify-between gap-4">
            <span>PPL@1024:</span>
            <span className="font-bold text-gray-800">{data.x}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Mel L1:</span>
            <span className="font-bold text-gray-800">{data.melLabel}</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-gray-100 pt-1 mt-1">
            <span>Bitrate:</span>
            <span className="font-bold text-brand-accent">{data.bitrate} kbps</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const ParetoChart: React.FC = () => {
  return (
    <div className="w-full h-full bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 relative overflow-hidden group flex flex-col">
      {/* Legend */}
      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur border border-gray-200 p-4 rounded-xl z-10 shadow-soft max-w-[220px]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-white"></div>
            <span className="text-sm text-gray-600 font-medium">Existing codecs</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-brand-accent shadow-glow"></div>
            <span className="text-sm text-gray-900 font-bold">Duo-Tok (ours)</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-0 border-t-2 border-dashed border-gray-400"></div>
             <span className="text-xs text-gray-500 italic">Existing Pareto frontier</span>
          </div>
           <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 mt-1">
              Bubble area ∝ bitrate (0.5 - 6.0 kbps)
          </div>
        </div>
      </div>

      {/* Chart Container Wrapper */}
      <div className="relative flex-1 w-full min-h-[550px]">
        
        {/* 
          SVG Overlay for Pareto Frontier Curve.
          We strictly position this container to match the chart's margins:
          Top: 40px, Right: 40px, Bottom: 60px, Left: 60px.
          Overflow hidden ensures the curve never bleeds into the axis area.
        */}
        <div className="absolute top-[40px] left-[60px] right-[40px] bottom-[60px] overflow-hidden pointer-events-none z-0">
           <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* 
                Curve logic:
                Starts Higher (Top-Left) -> M 0 5
                Steeper Tilt -> Q 35 60 -> 100 95 (Bottom-Right)
              */}
              <path 
                d="M 0 5 Q 35 60 100 95" 
                fill="none" 
                stroke="#94a3b8" 
                strokeWidth="2" 
                strokeDasharray="6 6"
                vectorEffect="non-scaling-stroke"
                className="opacity-50"
              />
           </svg>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 40, right: 40, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            
            <XAxis 
              type="number" 
              dataKey="x" 
              name="PPL" 
              scale="log" 
              domain={[3, 250]} 
              tickCount={6}
              stroke="#94a3b8"
              tick={{fill: '#64748b', fontSize: 12}}
              ticks={[5, 10, 20, 50, 100, 200]}
            >
               <Label 
                value="LM perplexity (normalized)" 
                offset={0} 
                position="bottom" 
                fill="#1e293b" 
                style={{ fontSize: '14px', fontWeight: 600, marginTop: 20 }} 
              />
              <Label 
                value="← better generation" 
                offset={25} 
                position="bottom" 
                fill="#64748b" 
                style={{ fontSize: '12px', fontStyle: 'italic' }} 
              />
            </XAxis>
            
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Mel L1" 
              domain={[0.65, 1.45]} 
              stroke="#94a3b8"
              tick={{fill: '#64748b', fontSize: 12}}
              tickCount={8}
            >
              <Label 
                value="Mel L1 distance" 
                angle={-90} 
                position="left" 
                offset={20}
                fill="#1e293b" 
                style={{ fontSize: '14px', fontWeight: 600 }} 
              />
               <Label 
                value="better reconstruction ↓" 
                angle={-90} 
                position="left" 
                offset={45}
                fill="#64748b" 
                style={{ fontSize: '12px', fontStyle: 'italic' }} 
              />
            </YAxis>
            
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#e2e8f0' }} />
            
            <Scatter 
              data={data} 
              shape={<CustomBubble />}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};