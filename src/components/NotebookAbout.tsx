import React from 'react';
import { motion } from 'motion/react';
import { ProfileDetails } from '../types';
import { Sparkles, CheckCircle2, Award, Zap, Compass } from 'lucide-react';

interface NotebookAboutProps {
  profile: ProfileDetails;
  direction: number;
}

export const NotebookAbout: React.FC<NotebookAboutProps> = ({ profile, direction }) => {
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
        {/* ========================================================================= */}
        {/* LEFT PAGE: Philosophy, Story & Craft Creed                                */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e7decb] dark:border-[#332b24] pb-8 md:pb-0 pl-3 sm:pl-5 md:pl-2 md:pr-8 lg:md:pr-12">
          <div>
            {/* Left Page Top Header */}
            <div className="flex items-center justify-between border-b border-[#e2d6bf] dark:border-[#332b24] pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                  FIELD NOTES • VOL. 01
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4ebd9] dark:bg-[#2c231c] text-[#713f12] dark:text-[#fbbf24] border border-[#d9ccb4] dark:border-[#42352a]">
                  LOGGED // 2026
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[#854d0e] dark:bg-[#78350f] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
                PAGE 02 • LEFT
              </span>
            </div>

            {/* Section Tag */}
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 dark:text-amber-400 mb-2">
              <span className="font-semibold tracking-wider uppercase">PHILOSOPHY & ORIGIN:</span>
              <span className="italic font-serif">Self-directed engineering</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-book text-2xl sm:text-3xl font-normal tracking-tight text-[#1c1917] dark:text-white leading-tight mb-4">
              I build the{' '}
              <span className="highlighter-marker font-semibold text-[#1c1917] dark:text-white">whole thing</span>{' '}
              — design, code, deploy.
            </h2>

            <p className="text-xs sm:text-sm text-[#443c33] dark:text-[#d1c7b7] leading-relaxed mb-4">
              I'm a self-directed builder based in {profile.location.split('•')[0] || 'Bhubaneswar'}. Most of my projects start the same way: an ambitious business has a compelling real-world story, but no web presence that does it justice. I take the brief, art-direct it, build it in modern TypeScript, and put it live.
            </p>

            {/* Taped Kraft Paper Memo with Washi Tape */}
            <div className="relative p-3.5 my-3 bg-[#f5ede0] dark:bg-[#251f1b] rounded-xl border border-[#ded3bd] dark:border-[#3d332a] text-xs text-[#443c33] dark:text-[#d1c7b7] leading-relaxed shadow-xs transform -rotate-0.5">
              <div className="washi-tape-top absolute -top-2.5 left-8 w-16 h-4 pointer-events-none" />
              <div className="font-mono text-[10px] uppercase text-[#8a755d] dark:text-[#9e8b74] font-bold mb-1">
                RULE OF CRAFT:
              </div>
              Every project in this notebook is a bespoke front-end build —{' '}
              <span className="font-mono text-amber-900 dark:text-amber-300 font-semibold underline decoration-amber-400/50">
                custom type, motion choreography, responsive math
              </span>{' '}
              — never an off-the-shelf template. Restaurants get menus that read like printed paper. Gyms get kinetic energy. Trades get quote buttons where thumbs land.
            </div>

            <p className="text-xs text-[#574d3f] dark:text-[#b8ac9c] leading-relaxed">
              I work quickly and iterate in the open: build, deploy to a live URL, review on a real phone, and refine.{' '}
              <strong className="text-[#1c1917] dark:text-white font-bold">
                Shipping beats polishing in private.
              </strong>
            </p>
          </div>

          {/* Left Page Bottom Signature Stamp */}
          <div className="pt-4 mt-6 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between">
            <span className="font-handwriting text-xl sm:text-2xl text-amber-800 dark:text-amber-400 font-bold">
              Open for client commissions ✍
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c7e6b] dark:text-[#887a68]">
              NOTEBOOK Nº 01 • SEC B1
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PAGE: Polaroid Specimen, Studio Ledger & Principles                */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between pt-8 md:pt-0 pl-3 sm:pl-5 md:pl-8 lg:md:pl-12 md:pr-2">
          <div>
            {/* Right Page Top Header */}
            <div className="flex items-center justify-between border-b border-[#e2d6bf] dark:border-[#332b24] pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                  FIELD SPECIMEN • BHUBANESWAR
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="px-2 py-0.5 bg-[#854d0e] dark:bg-[#78350f] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
                PAGE 02 • RIGHT
              </span>
            </div>

            {/* Taped Polaroid Studio Specimen */}
            <div className="relative mx-auto w-full max-w-[240px] p-3 bg-white dark:bg-[#1a1715] rounded-sm shadow-xl border border-stone-200 dark:border-stone-800 transform rotate-1 hover:rotate-0 transition-transform duration-300 mb-5">
              <div className="washi-tape-corner absolute -top-3 -left-3 w-10 h-5 transform -rotate-35 pointer-events-none" />
              <div className="washi-tape-corner absolute -top-3 -right-3 w-10 h-5 transform rotate-35 pointer-events-none" />

              <div className="bg-[#24201d] text-stone-200 p-3 rounded-xs font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-700/80 mb-2">
                  <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> SATYAJIT.WORKSPACE
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="space-y-1 text-[11px]">
                  <p className="text-stone-400">// Primary Engine</p>
                  <p className="text-emerald-400 font-bold">React 19 + TypeScript</p>
                  <p className="text-stone-400 mt-1.5">// Verified Registry</p>
                  <p className="text-amber-300 font-bold">13 Shipped Client Sites</p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="font-handwriting text-sm font-bold text-stone-700 dark:text-stone-300">
                  Bhubaneswar Desk • 2026
                </span>
              </div>
            </div>

            {/* Ruled Ledger Table */}
            <div className="border-t border-b border-[#ded5c2] dark:border-[#382f27] divide-y divide-[#ece3d2] dark:divide-[#2e2620] font-mono text-xs mb-4">
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-[#786b59] dark:text-[#887a68] uppercase font-semibold">LIVE SITES</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 13 shipped
                </span>
              </div>
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-[#786b59] dark:text-[#887a68] uppercase font-semibold">LANGUAGE</span>
                <span className="font-bold text-[#1c1917] dark:text-white">Strict TypeScript</span>
              </div>
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-[#786b59] dark:text-[#887a68] uppercase font-semibold">DELIVERY</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">Days, not months</span>
              </div>
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-[#786b59] dark:text-[#887a68] uppercase font-semibold">TIMEZONE</span>
                <span className="font-semibold text-[#1c1917] dark:text-white">{profile.timezone}</span>
              </div>
            </div>

            {/* Three Field Principles */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#f7f0e4] dark:bg-[#221c17] border border-[#e2d8c3] dark:border-[#332b24]">
                <Zap className="w-3.5 h-3.5 text-amber-600 mx-auto mb-1" />
                <div className="text-[10px] font-mono font-bold text-stone-800 dark:text-stone-200">100/100</div>
                <div className="text-[8px] text-stone-500 uppercase font-mono">Lighthouse</div>
              </div>
              <div className="p-2 rounded-lg bg-[#f7f0e4] dark:bg-[#221c17] border border-[#e2d8c3] dark:border-[#332b24]">
                <Compass className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                <div className="text-[10px] font-mono font-bold text-stone-800 dark:text-stone-200">Bespoke</div>
                <div className="text-[8px] text-stone-500 uppercase font-mono">Zero Template</div>
              </div>
              <div className="p-2 rounded-lg bg-[#f7f0e4] dark:bg-[#221c17] border border-[#e2d8c3] dark:border-[#332b24]">
                <Award className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                <div className="text-[10px] font-mono font-bold text-stone-800 dark:text-stone-200">Turnkey</div>
                <div className="text-[8px] text-stone-500 uppercase font-mono">Domain + Host</div>
              </div>
            </div>
          </div>

          {/* Right Page Bottom Status Stamp */}
          <div className="pt-4 mt-6 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between">
            <span className="rubber-stamp px-2.5 py-0.5 text-[9px] font-mono font-bold text-amber-800 dark:text-amber-500 border-amber-800/60 dark:border-amber-500/60 rounded-sm transform rotate-2">
              CERTIFIED CRAFTSMANSHIP
            </span>
            <span className="font-mono text-[10px] text-amber-800 dark:text-amber-400 font-bold">
              [ 02 / 05 ]
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
