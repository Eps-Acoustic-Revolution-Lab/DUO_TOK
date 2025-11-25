import React, { useEffect, useRef } from 'react';
import { select, range, scaleLinear, line, curveBasis } from 'd3';

interface WaveformVisualizerProps {
  tracks?: number; // 1, 2, or 4
  height?: number;
  colors?: string[];
  labels?: string[];
}

export const DualTrackVisualizer: React.FC<WaveformVisualizerProps> = ({ 
  tracks = 2, 
  height = 300,
  colors = ['#0891b2', '#7c3aed', '#ea580c', '#16a34a'], // Cyan, Violet, Orange, Green
  labels = ['Vocal', 'Other', 'Drums', 'Bass']
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    
    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'transparent');
      
    svg.selectAll('*').remove();

    // Generators
    const n = 80; // number of points
    const data = range(n).map(i => i);

    // Scales
    const x = scaleLinear().domain([0, n - 1]).range([0, width]);
    // Y domain depends on number of tracks to stack them or overlap them
    // For 4 tracks, we might want to separate them slightly or overlap.
    // Let's overlap them but vary amplitude.
    const y = scaleLinear().domain([-1, 1]).range([height, 0]);

    // Create lines based on track count
    const activeColors = colors.slice(0, tracks);
    const activeLabels = labels.slice(0, tracks);

    const paths = activeColors.map((color, i) => {
      return svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2.5)
        .attr('stroke-opacity', tracks > 2 ? 0.7 : 0.8) // Lower opacity for more tracks
        .attr('stroke-linecap', 'round');
    });

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.08;

      paths.forEach((path, i) => {
        const lineGen = line<number>()
          .x(d => x(d))
          .y(d => {
            // Unique offset for each track so they don't look identical
            const offset = x(d) / (40 + i * 10) + time + (i * 100);
            
            // Different behavior for "Vocal" vs "Bass" etc sim
            let amplitude = 0.25;
            if (tracks === 4) amplitude = 0.15; // Smaller amplitude for MSS

            // Complex wave function
            const wave = Math.sin(offset * 2) * amplitude + 
                         Math.cos(offset * (3 + i)) * (amplitude * 0.5);
            
            // Center vertically based on index if we wanted stacking, 
            // but overlapping looks more "spectral". 
            // Let's add a slight vertical offset for visual separation if tracks > 2
            const verticalShift = tracks > 2 ? (i - (tracks-1)/2) * 0.15 : 0;

            return y(wave + verticalShift);
          })
          .curve(curveBasis);

        path.attr('d', lineGen);
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [tracks, height, colors, labels]);

  // Determine grid density based on size
  const gridSize = height < 150 ? '10px_10px' : '20px_20px';

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden rounded-xl bg-gray-50 border border-gray-200 shadow-inner transition-all duration-500" style={{ height: `${height}px` }}>
      
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"
        style={{ backgroundSize: gridSize }}
      ></div>

      {/* Labels Overlay */}
      <div className="absolute top-3 left-4 flex flex-col gap-2 z-10 pointer-events-none">
        {range(tracks).map((i) => (
          <div key={i} className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ backgroundColor: colors[i] }}></div>
             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide bg-white/60 backdrop-blur px-1.5 py-0.5 rounded-md">
               {labels[i]}
             </span>
          </div>
        ))}
      </div>

      <svg ref={svgRef} className="w-full h-full relative z-0" />
    </div>
  );
};