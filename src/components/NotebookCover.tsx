import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProfileDetails } from '../types';
import { sound } from '../utils/sound';

interface NotebookCoverProps {
  profile: ProfileDetails;
  direction: number;
  onNavigate: (page: number) => void;
}

export const NotebookCover: React.FC<NotebookCoverProps> = ({ profile, direction, onNavigate }) => {
  return (
    <motion.div
      custom={direction}
      initial={{ opacity: 0, rotateY: direction > 0 ? -12 : 12, x: direction > 0 ? 30 : -30 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      exit={{ opacity: 0, rotateY: direction > 0 ? 12 : -12, x: direction > 0 ? -30 : 30 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="w-full h-full relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full gap-8 md:gap-0">
        {/* Left Column: Owner & Ledger */}
        <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e7decb] dark:border-[#332b24] pb-8 md:pb-0 pl-3 sm:pl-5 md:pl-2 md:pr-8 lg:md:pr-12">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                THIS BOOK BELONGS TO:
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4ebd9] dark:bg-[#2c231c] text-[#713f12] dark:text-[#fbbf24] border border-[#d9ccb4] dark:border-[#42352a]">
                VOL. 01
              </span>
            </div>
            
            <h2 className="font-serif-book text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1c1917] dark:text-[#fafafa]">
              {profile.name}
            </h2>
            <p className="font-serif-book italic text-sm sm:text-base text-[#574d3f] dark:text-[#c4b5a2] mt-2 leading-relaxed">
              {profile.shortNote}
            </p>

            <div className="mt-6 border-t border-b border-[#e2d6bf] dark:border-[#332b24] divide-y divide-[#ece3d2] dark:divide-[#2d241d] font-mono text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#8c7e6b] dark:text-[#887a68] uppercase tracking-wider font-semibold">BASED</span>
                <span className="text-[#292524] dark:text-[#e7e5e4] font-medium">{profile.location}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#8c7e6b] dark:text-[#887a68] uppercase tracking-wider font-semibold">DOING</span>
                <span className="text-[#292524] dark:text-[#e7e5e4] font-medium">Front-end & product websites</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#8c7e6b] dark:text-[#887a68] uppercase tracking-wider font-semibold">SHIPPED</span>
                <span className="text-[#292524] dark:text-[#e7e5e4] font-bold text-amber-700 dark:text-amber-400">13 live client demos</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#8c7e6b] dark:text-[#887a68] uppercase tracking-wider font-semibold">STACK</span>
                <span className="text-[#292524] dark:text-[#e7e5e4] font-medium">TypeScript • React • Next.js</span>
              </div>
            </div>
          </div>

          {/* Yellow sticky note with washi tape */}
          <div
            onClick={() => {
              sound.playClick();
              onNavigate(4);
            }}
            className="mt-8 relative p-4 bg-[#fef08a] dark:bg-[#ca8a04]/90 text-[#713f12] dark:text-zinc-950 rounded-lg shadow-md border border-[#facc15] transform -rotate-1 hover:rotate-0 transition-transform cursor-pointer"
          >
            <div className="washi-tape-top absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 pointer-events-none" />
            <p className="font-handwriting text-xl sm:text-2xl font-bold leading-snug">
              {profile.availability}
            </p>
          </div>
        </div>

        {/* Right Column: Hero Statement & CTAs */}
        <div className="flex flex-col justify-between pt-8 md:pt-0 pl-3 sm:pl-5 md:pl-8 lg:md:pl-12 md:pr-2">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-[11px] font-mono tracking-widest text-[#786b59] dark:text-[#d4c7b5] uppercase font-semibold">
                {profile.tagline}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-book text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium tracking-tight text-[#1c1917] dark:text-[#ffffff] leading-[1.12]"
            >
              Websites that{' '}
              <span className="relative inline-block italic font-serif-book font-bold text-amber-900 dark:text-amber-200">
                <span className="relative z-10">ship</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-x-0 bottom-1 h-3.5 bg-gradient-to-r from-amber-300/80 via-yellow-300/70 to-amber-200/60 dark:from-amber-600/40 dark:via-amber-500/40 dark:to-yellow-500/30 -rotate-1 rounded-xs -z-0 origin-left"
                />
              </span>
              , not sit in drafts.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 text-sm sm:text-base md:text-lg text-[#574d3f] dark:text-[#d1c7b7] leading-relaxed max-w-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3.5 mt-8"
            >
              <button
                id="cover-flip-work-btn"
                onClick={() => {
                  sound.playPageTurn();
                  onNavigate(2);
                }}
                className="flex items-center gap-2 px-5 py-3 bg-[#1c1917] dark:bg-[#fafafa] hover:bg-zinc-800 dark:hover:bg-white text-[#fafafa] dark:text-zinc-950 font-bold text-sm rounded-xl shadow-lg transition-all active:scale-95 group cursor-pointer"
              >
                <span>Flip to the work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="cover-say-hello-btn"
                onClick={() => {
                  sound.playPageTurn();
                  onNavigate(4);
                }}
                className="px-5 py-3 bg-transparent hover:bg-[#ede6d8] dark:hover:bg-[#2b241e] text-[#1c1917] dark:text-[#fafafa] font-semibold text-sm border border-[#cfc4b0] dark:border-[#3d332a] rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                Say hello
              </button>
            </motion.div>
          </div>

          {/* Page Footer */}
          <div className="flex items-center justify-between border-t border-[#e2d6bf] dark:border-[#332b24] pt-4 mt-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c7e6b] dark:text-[#887a68]">
              NOTEBOOK Nº 01
            </span>
            <span className="px-2.5 py-1 bg-[#854d0e] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
              PAGE 01 • COVER
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
