import React from 'react';

export const ComparisonTable: React.FC = () => {
  return (
    <div className="overflow-x-auto bg-white custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-mono bg-gray-50/50">
            <th className="p-4 font-semibold whitespace-nowrap min-w-[160px] text-left">Model</th>
            <th className="p-4 font-semibold whitespace-nowrap text-center">Bitrate (kbps)</th>
            <th className="p-4 font-bold text-brand-accent whitespace-nowrap text-center">PPL @ 1024 ↓</th>
            <th className="p-4 font-bold text-brand-accent whitespace-nowrap text-center">MTT@AP ↑</th>
             <th className="p-4 font-semibold whitespace-nowrap text-center">STOI ↑</th>
            <th className="p-4 font-semibold whitespace-nowrap text-center">Mel L1 ↓</th>
            <th className="p-4 font-semibold whitespace-nowrap text-center">PESQ ↑</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          <tr className="border-b border-gray-50 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
            <td className="p-4 font-bold text-brand-accent flex items-center gap-2 whitespace-nowrap text-left">
              Duo-Tok (Ours)
              <span className="px-1.5 py-0.5 bg-brand-accent text-white text-[10px] rounded font-mono">SOTA</span>
            </td>
            <td className="p-4 whitespace-nowrap text-center">0.75</td>
            <td className="p-4 text-brand-accent font-bold text-base whitespace-nowrap text-center">4.75</td>
            <td className="p-4 text-brand-accent font-bold text-base whitespace-nowrap text-center">0.35</td>
            <td className="p-4 font-medium whitespace-nowrap text-center">0.56 / 0.63</td>
            <td className="p-4 font-medium whitespace-nowrap text-center">0.74 / 1.12</td>
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-center">1.82 / 1.21</td>
          </tr>
          <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-left">MuCodec-LeVo</td>
            <td className="p-4 whitespace-nowrap text-center">0.70</td>
            <td className="p-4 whitespace-nowrap text-center">8.10</td>
            <td className="p-4 whitespace-nowrap text-center">0.26</td>
            <td className="p-4 whitespace-nowrap text-center">0.57</td>
            <td className="p-4 whitespace-nowrap text-center">1.37</td>
            <td className="p-4 whitespace-nowrap text-center">1.21</td>
          </tr>
          <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-left">YuE</td>
            <td className="p-4 whitespace-nowrap text-center">4.00</td>
            <td className="p-4 whitespace-nowrap text-center">46.2</td>
             <td className="p-4 whitespace-nowrap text-center">0.32</td>
             <td className="p-4 whitespace-nowrap text-center">0.75</td>
            <td className="p-4 whitespace-nowrap text-center">0.90</td>
            <td className="p-4 whitespace-nowrap text-center">1.84</td>
          </tr>
          <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-left">X-Codec</td>
            <td className="p-4 whitespace-nowrap text-center">4.00</td>
            <td className="p-4 whitespace-nowrap text-center">47.5</td>
             <td className="p-4 whitespace-nowrap text-center">0.32</td>
             <td className="p-4 whitespace-nowrap text-center">0.76</td>
            <td className="p-4 whitespace-nowrap text-center">0.91</td>
            <td className="p-4 whitespace-nowrap text-center">1.85</td>
          </tr>
          <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-left">WavTokenizer</td>
            <td className="p-4 whitespace-nowrap text-center">0.48</td>
            <td className="p-4 whitespace-nowrap text-center">38.2</td>
             <td className="p-4 whitespace-nowrap text-center">0.17</td>
             <td className="p-4 whitespace-nowrap text-center">0.49</td>
            <td className="p-4 whitespace-nowrap text-center">1.15</td>
            <td className="p-4 whitespace-nowrap text-center">1.14</td>
          </tr>
           <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-left">SemantiCodec</td>
            <td className="p-4 whitespace-nowrap text-center">1.30</td>
            <td className="p-4 whitespace-nowrap text-center">15.5</td>
             <td className="p-4 whitespace-nowrap text-center">0.32</td>
             <td className="p-4 whitespace-nowrap text-center">0.60</td>
            <td className="p-4 whitespace-nowrap text-center">0.98</td>
            <td className="p-4 whitespace-nowrap text-center">1.32</td>
          </tr>
           <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-left">Encodec</td>
            <td className="p-4 whitespace-nowrap text-center">6.00</td>
            <td className="p-4 whitespace-nowrap text-center">141.3</td>
             <td className="p-4 whitespace-nowrap text-center">0.18</td>
             <td className="p-4 whitespace-nowrap text-center">0.85</td>
            <td className="p-4 whitespace-nowrap text-center">0.78</td>
            <td className="p-4 whitespace-nowrap text-center">2.27</td>
          </tr>
          <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-left">DAC</td>
            <td className="p-4 whitespace-nowrap text-center">6.00</td>
            <td className="p-4 whitespace-nowrap text-center">194.0</td>
             <td className="p-4 whitespace-nowrap text-center">0.20</td>
             <td className="p-4 whitespace-nowrap text-center">0.86</td>
            <td className="p-4 whitespace-nowrap text-center">0.73</td>
            <td className="p-4 whitespace-nowrap text-center">2.66</td>
          </tr>
        </tbody>
      </table>
      <div className="p-4 text-xs text-gray-400 font-mono text-right bg-gray-50/30 border-t border-gray-100">
        * Comparison on Codec-Evaluation Benchmark (Table 1)
      </div>
    </div>
  );
};