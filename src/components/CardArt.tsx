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
      case 'bangalore-cafe':
        return (
          <div className="w-full h-full bg-[#13231a] p-3 flex flex-col justify-between border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/10 blur-xl" />
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-emerald-400/80 tracking-widest uppercase">BENGALURU</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">Vegetarian</span>
            </div>
            <div className="text-center py-2">
              <div className="text-[10px] tracking-[0.25em] font-serif text-emerald-200/60 uppercase">The Bangalore Cafe</div>
              <div className="text-xl font-serif text-emerald-400 font-bold tracking-wider">BANGALORE CAFE</div>
              <div className="text-[8px] tracking-widest text-emerald-300/80 font-mono mt-0.5">SHANTI NAGAR • VEG SPECIALTIES</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-emerald-200/50 pt-1 border-t border-emerald-500/20">
              <span>JAIN & VEGAN</span>
              <span>100 SCORE</span>
            </div>
          </div>
        );

      case 'hole-in-the-wall':
        return (
          <div className="w-full h-full bg-[#2a1c14] p-3 flex flex-col justify-between border border-amber-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-amber-400/80 tracking-wider">KORAMANGALA</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">All-Day</span>
            </div>
            <div className="text-center py-2">
              <div className="text-xl font-serif text-amber-200 font-bold tracking-wide">HOLE IN THE WALL</div>
              <div className="text-[8px] tracking-widest text-amber-400/80 font-mono mt-0.5">LEGENDARY WAFFLES & PANCAKES</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-amber-200/50 pt-1 border-t border-amber-500/20">
              <span>COSY DINER</span>
              <span>1-TAP MENU</span>
            </div>
          </div>
        );

      case 'swosti-restaurant':
        return (
          <div className="w-full h-full bg-[#271b12] p-3 flex flex-col justify-between border border-orange-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-orange-400/80 tracking-wider">SANKARIDIHA</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-500/30">Authentic</span>
            </div>
            <div className="text-center py-2">
              <div className="text-xl font-serif text-orange-200 font-bold tracking-wide">SWOSTI RESTAURANT</div>
              <div className="text-[8px] tracking-widest text-orange-400/80 font-mono mt-0.5">INDIAN CUISINE • ₹200-₹400</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-orange-200/50 pt-1 border-t border-orange-500/20">
              <span>TANDOOR & CURRIES</span>
              <span>DIRECT ORDER</span>
            </div>
          </div>
        );

      case 'eight-zero-cafe':
      case 'zeegri-bakery':
        return (
          <div className="w-full h-full bg-[#22171a] p-3 flex flex-col justify-between border border-rose-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-rose-400/80 tracking-wider">JARAKA, ODISHA</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30">Bakery & Cafe</span>
            </div>
            <div className="text-center py-2">
              <div className="text-xl font-serif text-rose-200 font-bold tracking-wide">{title.toUpperCase()}</div>
              <div className="text-[8px] tracking-widest text-rose-400/80 font-mono mt-0.5">CUSTOM CAKES • PIZZAS • TREATS</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-rose-200/50 pt-1 border-t border-rose-500/20">
              <span>FRESH DAILY</span>
              <span>WHATSAPP ORDERS</span>
            </div>
          </div>
        );

      case 'rd-fitness':
        return (
          <div className="w-full h-full bg-[#161618] p-3 flex flex-col justify-between border border-red-500/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/10 -rotate-45 transform origin-top-right" />
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-red-400 font-bold tracking-wider">JARAKA FITNESS</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 font-bold">GYM & CARDIO</span>
            </div>
            <div className="text-center py-2">
              <div className="text-xl font-black text-white tracking-wider uppercase">RD FITNESS</div>
              <div className="text-[8px] font-mono text-red-400 tracking-widest uppercase mt-0.5 font-semibold">STRENGTH • OLYMPIC • CONDITIONING</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400 pt-1 border-t border-zinc-800">
              <span>MEMBERSHIP TIERS</span>
              <span>FREE PASS ↗</span>
            </div>
          </div>
        );

      case 'aura-films':
        return (
          <div className="w-full h-full bg-[#0f0f12] p-3 flex flex-col justify-between border border-amber-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-amber-400/80 tracking-wider">CINEMA STUDIO</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">4K Films</span>
            </div>
            <div className="text-center py-2">
              <div className="text-xl font-serif text-white font-bold tracking-wide">AURA FILMS</div>
              <div className="text-[8px] font-mono text-amber-300/80 tracking-widest mt-0.5">WEDDING & COMMERCIAL PRODUCTION</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400 pt-1 border-t border-amber-900/40">
              <span>SHOWREEL MATRIX</span>
              <span>DATE INQUIRY</span>
            </div>
          </div>
        );

      case 'hexaloom-docs':
        return (
          <div className="w-full h-full bg-[#0f172a] p-3 flex flex-col justify-between border border-sky-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-sky-400 font-bold tracking-wider">WEB PLATFORM</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30 font-bold">AI DOCS</span>
            </div>
            <div className="text-center py-2">
              <div className="text-lg font-mono font-bold text-white tracking-wide uppercase">HEXALOOM DOCS</div>
              <div className="text-[8px] font-mono text-sky-300/80 tracking-widest mt-0.5">DOCUMENT AUTOMATION & PDF</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400 pt-1 border-t border-sky-900/40">
              <span>IN-BROWSER EXPORT</span>
              <span>CLIENT-SIDE</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-[#1c1917] p-3 flex flex-col justify-between border border-zinc-700/50 relative overflow-hidden" style={{ backgroundColor: cardColor || '#1c1917' }}>
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">{category}</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold">{tier}</span>
            </div>
            <div className="text-center py-2">
              <div className="text-lg font-display font-bold text-white tracking-wide">{title}</div>
              <div className="text-[8px] font-mono text-zinc-300/80 tracking-wider mt-0.5 uppercase">{cardCoverArt.subtitle || category}</div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400 pt-1 border-t border-white/10">
              <span>VERIFIED GITHUB BUILD</span>
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
