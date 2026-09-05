import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface CardArtProps {
  project: Project;
  className?: string;
}

export const CardArt: React.FC<CardArtProps> = ({ project, className = '' }) => {
  const { cardCoverArt, cardColor, title, category, tier } = project;

  // Render distinctive visual themes according to project category & aesthetic
  const getThemeContent = () => {
    switch (project.id) {
      case 'marigold':
        return (
          <div className="w-full h-full bg-[#1c1917] p-3 flex flex-col justify-between border border-amber-500/30 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-500/10 blur-xl" />
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-amber-400/80 tracking-widest uppercase">Bhubaneswar</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">Rooftop</span>
            </div>
            <div className="text-center py-2">
              <div className="text-[10px] tracking-[0.25em] font-serif text-amber-200/60 uppercase">Hotel Marigold</div>
              <div className="text-xl font-serif text-amber-400 font-bold tracking-wider">MARIGOLD</div>
              <div className="text-[8px] tracking-widest text-amber-300/80 font-mono mt-0.5">FINE DINING & BANQUET</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-amber-200/50 pt-1 border-t border-amber-500/20">
              <span>EST. 2024</span>
              <span>4.9 ★ RATED</span>
            </div>
          </div>
        );

      case 'narulas':
        return (
          <div className="w-full h-full bg-[#2a1b15] p-3 flex flex-col justify-between border border-orange-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-orange-400/80 tracking-wider">HERITAGE TASTE</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-500/30">Catering</span>
            </div>
            <div className="text-center py-2">
              <div className="text-xl font-serif text-orange-200 font-bold tracking-wide">NARULA'S</div>
              <div className="text-[8px] tracking-widest text-orange-400/80 font-mono mt-0.5">AUTHENTIC NORTH INDIAN</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-orange-200/50 pt-1 border-t border-orange-500/20">
              <span>ROYAL CUISINE</span>
              <span>1-TAP MENU</span>
            </div>
          </div>
        );

      case 'the-aromas':
        return (
          <div className="w-full h-full bg-[#1b231e] p-3 flex flex-col justify-between border border-emerald-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-emerald-400/80 tracking-wider">GOURMET BISTRO</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">Café</span>
            </div>
            <div className="text-center py-2">
              <div className="text-xl font-serif text-emerald-200 font-bold tracking-wide">THE AROMAS</div>
              <div className="text-[8px] tracking-widest text-emerald-400/80 font-mono mt-0.5">ROASTS • PASTRIES • BRUNCH</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-emerald-200/50 pt-1 border-t border-emerald-500/20">
              <span>ARTISANAL BEANS</span>
              <span>ORDER DESK</span>
            </div>
          </div>
        );

      case 'fitness-garage':
      case 'knockout':
        return (
          <div className="w-full h-full bg-[#18181b] p-3 flex flex-col justify-between border border-rose-500/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-rose-600/10 -rotate-45 transform origin-top-right" />
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-rose-400 font-bold tracking-wider">PERFORMANCE</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30 font-bold">24/7 OPEN</span>
            </div>
            <div className="text-center py-2">
              <div className="text-xl font-display font-black text-white tracking-wider uppercase">{title}</div>
              <div className="text-[8px] font-mono text-rose-400 tracking-widest uppercase mt-0.5 font-semibold">STRENGTH • RECOVERY • COMBAT</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400 pt-1 border-t border-zinc-800">
              <span>HIGH CONVERSION</span>
              <span>PASS TRIAL ↗</span>
            </div>
          </div>
        );

      case 'hf-plumbing':
      case 'florin-handyman':
      case 'j-brick':
        return (
          <div className="w-full h-full bg-[#1e2229] p-3 flex flex-col justify-between border border-blue-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-blue-400 font-bold tracking-wider">CERTIFIED CONTRACTOR</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">24/7 Callout</span>
            </div>
            <div className="text-center py-2">
              <div className="text-lg font-display font-bold text-white tracking-wide uppercase">{title}</div>
              <div className="text-[8px] font-mono text-blue-300/80 tracking-widest mt-0.5">RESIDENTIAL & COMMERCIAL</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400 pt-1 border-t border-blue-900/40">
              <span>RAPID ESTIMATE</span>
              <span>DIRECT DISPATCH</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-[#1f1f23] p-3 flex flex-col justify-between border border-zinc-700/50 relative overflow-hidden" style={{ backgroundColor: cardColor || '#1f1f23' }}>
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">{category}</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold">{tier}</span>
            </div>
            <div className="text-center py-2">
              <div className="text-lg font-display font-bold text-white tracking-wide">{title}</div>
              <div className="text-[8px] font-mono text-zinc-300/80 tracking-wider mt-0.5 uppercase">{cardCoverArt.subtitle || category}</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400 pt-1 border-t border-white/10">
              <span>TURNKEY CODE</span>
              <span>100 LIGHTHOUSE</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      {getThemeContent()}
      
      {/* Light sheen animation across card */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', repeatDelay: 2 }}
        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transform -skew-x-12"
      />
    </div>
  );
};
