import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Wrench, CheckCircle2, RotateCw } from 'lucide-react';
import { ProfileDetails } from '../types';
import { getSocialUrls } from '../data/profile';
import { sound } from '../utils/sound';

interface NotebookStackProps {
  profile: ProfileDetails;
  direction: number;
}

interface IndexCardData {
  id: string;
  cardNumber: string;
  frontTitle: string;
  frontSubtitle: string;
  backCategory: string;
  backItems: string[];
  backFooter: string;
  stampText: string;
}

export const NotebookStack: React.FC<NotebookStackProps> = ({ profile, direction }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const socials = getSocialUrls(profile);

  const cards: IndexCardData[] = [
    {
      id: 'card-1',
      cardNumber: 'CARD 01 // CORE',
      frontTitle: 'Languages',
      frontSubtitle: 'Core web foundations & strict typing standards.',
      backCategory: 'LANGUAGES & RUNTIME',
      backItems: [
        '• TypeScript 5.8 (Strict Mode)',
        '• JavaScript (Modern ES2024)',
        '• Semantic HTML5 Markup',
        '• Modern CSS3 & PostCSS'
      ],
      backFooter: '100% Type-Safe Architecture',
      stampText: 'STRICT TYPES'
    },
    {
      id: 'card-2',
      cardNumber: 'CARD 02 // ENGINES',
      frontTitle: 'Frameworks',
      frontSubtitle: 'Modern client execution & rendering engines.',
      backCategory: 'RENDERING ENGINES',
      backItems: [
        '• React 19 Client Hydration',
        '• Next.js App Router & SSR',
        '• Vite Bundler (Instant HMR)',
        '• Motion Orchestration'
      ],
      backFooter: '0ms Startup Overheads',
      stampText: 'HIGH FPS'
    },
    {
      id: 'card-3',
      cardNumber: 'CARD 03 // STYLING',
      frontTitle: 'Styling & Design',
      frontSubtitle: 'Zero-runtime utility CSS & typography.',
      backCategory: 'STYLING TOKENS',
      backItems: [
        '• Tailwind CSS v4 Engine',
        '• Radix UI Headless Primitives',
        '• Lucide SVG Vector Icons',
        '• Mathematical Font Scaling'
      ],
      backFooter: 'Zero CSS Bloat Guaranteed',
      stampText: 'RESPONSIVE'
    },
    {
      id: 'card-4',
      cardNumber: 'CARD 04 // DEVOPS',
      frontTitle: 'Tooling & Deploy',
      frontSubtitle: 'Edge delivery networks, hosting & DNS.',
      backCategory: 'DEVOPS PIPELINES',
      backItems: [
        '• Vercel Edge Global Hosting',
        '• Git & GitHub CI/CD Workflows',
        '• Google Lighthouse 100/100',
        '• Cloudflare SSL & Custom DNS'
      ],
      backFooter: 'Global CDN Delivery',
      stampText: 'VERIFIED'
    },
    {
      id: 'card-5',
      cardNumber: 'CARD 05 // ERGONOMICS',
      frontTitle: 'UX & Motion',
      frontSubtitle: 'Art direction, micro-interactions & thumb reach.',
      backCategory: 'INTERACTION DESIGN',
      backItems: [
        '• Mobile-First Ergonomics',
        '• Dark & Warm Light Tokens',
        '• Custom Micro-Interactions',
        '• High-Conversion CTA Layouts'
      ],
      backFooter: 'Tailored for Thumbs',
      stampText: 'CRAFTED'
    },
    {
      id: 'card-6',
      cardNumber: 'CARD 06 // TURNKEY',
      frontTitle: 'Turnkey Package',
      frontSubtitle: 'Every build delivered ready for real customers.',
      backCategory: 'DELIVERY PROMISE',
      backItems: [
        '• 100/100 Lighthouse Performance',
        '• Custom Domain Name Included',
        '• 3 Months Maintenance Included',
        '• Swift 24-72h Turnaround'
      ],
      backFooter: 'Shipped Ready to Launch',
      stampText: 'INCLUDED'
    }
  ];

  const handleCardClick = (id: string) => {
    sound.playCardSelect();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const leftCards = cards.slice(0, 3);
  const rightCards = cards.slice(3, 6);

  const renderCard = (card: IndexCardData, index: number) => {
    const isFlipped = !!flippedCards[card.id];
    return (
      <div
        key={card.id}
        onClick={() => handleCardClick(card.id)}
        className="cursor-pointer select-none group perspective-1000"
      >
        <div
          className={`relative w-full min-h-[110px] p-3 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md ${
            isFlipped
              ? 'bg-[#f4ebd9] dark:bg-[#251f1a] border-amber-500/80 text-[#29221b] dark:text-[#f3efe8]'
              : 'bg-[#fbf9f4] dark:bg-[#1e1a17] border-[#ded5c2] dark:border-[#382f27] hover:border-amber-400/60'
          }`}
        >
          {/* Top Paperclip or Washi tape */}
          <div className="washi-tape-corner absolute -top-2 -left-2 w-6 h-3 transform -rotate-45 pointer-events-none" />

          {/* Front / Back Toggle Content */}
          {!isFlipped ? (
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono font-bold tracking-widest text-amber-800 dark:text-amber-400 uppercase">
                  {card.cardNumber}
                </span>
                <span className="rubber-stamp px-1.5 py-0.2 text-[8px] font-mono font-bold text-stone-600 dark:text-stone-400 border-stone-400 dark:border-stone-600 rounded-xs">
                  {card.stampText}
                </span>
              </div>
              <h3 className="font-serif-book text-base font-bold text-stone-900 dark:text-white leading-snug">
                {card.frontTitle}
              </h3>
              <p className="text-[11px] text-[#574d3f] dark:text-[#b8ac9c] leading-tight mt-0.5">
                {card.frontSubtitle}
              </p>
              <div className="flex items-center justify-between text-[9px] font-mono text-stone-500 dark:text-stone-400 pt-1.5 mt-1 border-t border-[#ded5c2] dark:border-[#382f27]">
                <span className="flex items-center gap-1">
                  <RotateCw className="w-2.5 h-2.5 text-amber-600" />
                  <span>Tap to inspect spec</span>
                </span>
                <span className="font-bold text-amber-700 dark:text-amber-400">SPEC ↗</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono font-bold text-amber-900 dark:text-amber-300">
                  {card.backCategory}
                </span>
                <span className="text-[9px] font-mono text-stone-500">FLIPPED</span>
              </div>
              <div className="space-y-0.5 text-[11px] font-mono text-stone-800 dark:text-stone-200">
                {card.backItems.map((item, i) => (
                  <div key={i} className="truncate">{item}</div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-emerald-700 dark:text-emerald-400 pt-1.5 mt-1 border-t border-amber-300/40 font-bold">
                <span>✓ {card.backFooter}</span>
                <span className="text-stone-500 font-normal">Tap to flip</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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
        {/* LEFT PAGE: Core Tooling, Languages, Frameworks & Styling                 */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e7decb] dark:border-[#332b24] pb-8 md:pb-0 pl-3 sm:pl-5 md:pl-2 md:pr-8 lg:md:pr-12">
          <div>
            {/* Left Page Top Header */}
            <div className="flex items-center justify-between border-b border-[#e2d6bf] dark:border-[#332b24] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                  TOOLING SPEC • ENTRY 04A
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4ebd9] dark:bg-[#2c231c] text-[#713f12] dark:text-[#fbbf24] border border-[#d9ccb4] dark:border-[#42352a]">
                  CLIENT ENGINES
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[#854d0e] dark:bg-[#78350f] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
                PAGE 04 • LEFT
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-book text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] dark:text-white mb-1">
              Technical Arsenal.
            </h2>
            <p className="text-xs text-[#574d3f] dark:text-[#b8ac9c] leading-relaxed mb-3">
              Zero-bloat, strict-typed modern web primitives. Tap any index card to flip and review the technical spec.
            </p>

            {/* Left 3 Index Cards */}
            <div className="space-y-2.5">
              {leftCards.map((card, idx) => renderCard(card, idx))}
            </div>
          </div>

          {/* Left Page Bottom Footer */}
          <div className="pt-3 mt-4 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between text-[10px] font-mono text-[#786b59] dark:text-[#a89b88]">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-600" />
              <span>FRONTEND RUNTIMES</span>
            </span>
            <span className="font-bold text-amber-800 dark:text-amber-400">
              [ 04 / 05 • A ]
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PAGE: DevOps, Mobile Ergonomics & Turnkey Standards                 */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between pt-8 md:pt-0 pl-3 sm:pl-5 md:pl-8 lg:md:pl-12 md:pr-2">
          <div>
            {/* Right Page Top Header */}
            <div className="flex items-center justify-between border-b border-[#e2d6bf] dark:border-[#332b24] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                  PRODUCTION RIGOR • ENTRY 04B
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="px-2 py-0.5 bg-[#854d0e] dark:bg-[#78350f] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
                PAGE 04 • RIGHT
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-book text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] dark:text-white mb-1">
              Production Standards.
            </h2>
            <p className="text-xs text-[#574d3f] dark:text-[#b8ac9c] leading-relaxed mb-3">
              Edge deployment, mobile-first thumb ergonomies, and turnkey maintenance included on every single project.
            </p>

            {/* Right 3 Index Cards */}
            <div className="space-y-2.5">
              {rightCards.map((card, idx) => renderCard(card, idx + 3))}
            </div>
          </div>

          {/* Right Page Bottom Footer */}
          <div className="pt-3 mt-4 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between text-[10px] font-mono text-[#786b59] dark:text-[#a89b88]">
            <span className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>100/100 LIGHTHOUSE GUARANTEE</span>
            </span>
            <span className="font-bold text-amber-800 dark:text-amber-400">
              [ 04 / 05 • B ]
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
