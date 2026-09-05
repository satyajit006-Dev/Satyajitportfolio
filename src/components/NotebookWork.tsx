import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Monitor,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { Project, ProfileDetails } from '../types';
import { getSocialUrls } from '../data/profile';
import { sound } from '../utils/sound';

interface NotebookWorkProps {
  projects: Project[];
  profile: ProfileDetails;
  direction: number;
  onOpenMonitor: (project: Project) => void;
}

// Visual art card renderer
const CardArt: React.FC<{ project: Project }> = ({ project }) => {
  const art = project.cardCoverArt;
  if (!art) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center p-3 text-center"
        style={{ backgroundColor: project.cardColor || '#1c1917' }}
      >
        <span className="font-serif text-base font-bold text-white tracking-wide">
          {project.title}
        </span>
        <span className="text-[10px] font-mono text-amber-300/80 uppercase mt-1">
          {project.category}
        </span>
      </div>
    );
  }

  const bgPatterns: Record<string, string> = {
    dots: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
    grid: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
    linen: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%)',
    slant: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 0, transparent 8px)'
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-3.5 select-none overflow-hidden"
      style={{
        backgroundColor: project.cardColor || '#1c1917',
        backgroundImage: bgPatterns[art.bgPattern || 'linen'],
        backgroundSize: art.bgPattern === 'dots' ? '12px 12px' : '16px 16px'
      }}
    >
      <div className="flex items-center justify-between z-10">
        <span
          className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded font-bold"
          style={{
            backgroundColor: `${art.accentColor || '#eab308'}25`,
            color: art.accentColor || '#eab308',
            border: `1px solid ${art.accentColor || '#eab308'}50`
          }}
        >
          {project.tier}
        </span>
        <span className="text-[10px] font-mono text-white/50">{project.specs?.loadTime || '0.3s'}</span>
      </div>

      <div className="z-10 my-auto py-1">
        <div
          className="font-serif-book text-xl font-bold tracking-tight text-white leading-tight"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          {art.title || project.title}
        </div>
        {art.subtitle && (
          <div className="text-[10px] font-mono tracking-widest text-amber-300/90 uppercase mt-0.5">
            {art.subtitle}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-stone-300/80 border-t border-white/10 pt-1.5 z-10">
        <span className="truncate max-w-[130px]">{project.category}</span>
        <span className="text-amber-400 font-bold">100 SCORE</span>
      </div>
    </div>
  );
};

export const NotebookWork: React.FC<NotebookWorkProps> = ({
  projects,
  profile,
  direction,
  onOpenMonitor
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [sheetIndex, setSheetIndex] = useState<number>(0);
  const socials = getSocialUrls(profile);

  const filterOptions = ['All', 'Hospitality', 'Fitness', 'Commerce', 'Services'];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'All') return true;
    return p.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const CARDS_PER_SHEET = 4; // 2 on Left Page, 2 on Right Page
  const totalSheets = Math.max(1, Math.ceil(filteredProjects.length / CARDS_PER_SHEET));
  const currentSheet = Math.min(sheetIndex, totalSheets - 1);

  const currentSheetProjects = filteredProjects.slice(
    currentSheet * CARDS_PER_SHEET,
    (currentSheet + 1) * CARDS_PER_SHEET
  );

  // Divide into left and right page projects
  const leftPageProjects = currentSheetProjects.slice(0, 2);
  const rightPageProjects = currentSheetProjects.slice(2, 4);

  const handleFilterChange = (option: string) => {
    sound.playClick();
    setActiveFilter(option);
    setSheetIndex(0);
  };

  const nextSheet = () => {
    if (currentSheet < totalSheets - 1) {
      sound.playPageTurn();
      setSheetIndex(currentSheet + 1);
    }
  };

  const prevSheet = () => {
    if (currentSheet > 0) {
      sound.playPageTurn();
      setSheetIndex(currentSheet - 1);
    }
  };

  // Helper card renderer
  const renderCard = (project: Project, idx: number) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.3 }}
      className="relative p-3 bg-[#fefdfa] dark:bg-[#1e1a17] rounded-xl border border-[#ded5c2] dark:border-[#382f27] shadow-sm flex flex-col justify-between hover:shadow-md hover:border-amber-500/70 transition-all group"
    >
      <div className="washi-tape-corner absolute -top-2 -left-2 w-7 h-3.5 transform -rotate-45 pointer-events-none" />
      <div className="washi-tape-corner absolute -top-2 -right-2 w-7 h-3.5 transform rotate-45 pointer-events-none" />

      <div>
        {/* Header: Serial & Status */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-[#857460] dark:text-[#a08e7a] font-bold uppercase tracking-wider">
              REF #{project.id.toUpperCase().slice(0, 8)}
            </span>
            <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-300/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              LIVE
            </span>
          </div>
          <span className="rubber-stamp px-1.5 py-0.5 text-[8px] font-mono font-bold text-amber-800 dark:text-amber-400 border-amber-800/60 dark:border-amber-400/60 rounded-xs">
            {project.tier}
          </span>
        </div>

        {/* Cover Art Visual */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          title={`Open live site: ${project.title}`}
          className="block relative w-full h-28 rounded-lg overflow-hidden mb-2 border border-[#ded5c2] dark:border-[#382f27] shadow-inner group/art cursor-pointer"
        >
          <CardArt project={project} />
          <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover/art:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1 backdrop-blur-[1px]">
            <ExternalLink className="w-4 h-4 text-amber-300 animate-bounce" />
            <span className="font-mono text-[10px] bg-stone-900/90 px-2 py-0.5 rounded-md border border-amber-300/40">
              Open Live Site ↗
            </span>
          </div>
        </a>

        {/* Titles */}
        <div className="flex items-baseline justify-between gap-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif-book text-base font-bold text-stone-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400 transition-colors truncate"
          >
            {project.title}
          </a>
          <span className="text-[9px] font-mono text-amber-700 dark:text-amber-400 font-semibold shrink-0">
            {project.category.split('/')[0]}
          </span>
        </div>

        <p className="text-[11px] text-[#574d3f] dark:text-[#b8ac9c] line-clamp-2 leading-tight my-1">
          {project.description}
        </p>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {project.techStack.slice(0, 3).map(tech => (
            <span
              key={tech}
              className="text-[8px] font-mono px-1 py-0.2 bg-[#f2ebd9] dark:bg-[#28211b] text-[#574d3f] dark:text-[#c4b5a2] rounded border border-[#ded5c2] dark:border-[#382f27]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-2.5 pt-2 border-t border-[#ded5c2] dark:border-[#332b24] flex items-center justify-between font-mono">
        <button
          id={`work-preview-btn-${project.id}`}
          onClick={() => {
            sound.playCardSelect();
            onOpenMonitor(project);
          }}
          title="Inspect in Simulated Device Screen"
          className="flex items-center gap-1 text-[11px] font-semibold text-[#574d3f] dark:text-[#c4b5a2] hover:text-[#1c1917] dark:hover:text-white transition-colors cursor-pointer"
        >
          <Monitor className="w-3 h-3 text-amber-600" />
          <span>Inspect</span>
        </button>

        <a
          href={`${socials.whatsappUrl}?text=${encodeURIComponent(
            `Hi ${profile.name}! I saw your "${project.title}" project card in your notebook portfolio. Can you give me a quote for a ${project.tier} build with domain and 3 months service for my business?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          <span>Inquire</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );

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
        {/* LEFT PAGE: Archive Header, Filters & First 2 Projects                     */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e7decb] dark:border-[#332b24] pb-8 md:pb-0 pl-3 sm:pl-5 md:pl-2 md:pr-8 lg:md:pr-12">
          <div>
            {/* Left Page Top Header */}
            <div className="flex items-center justify-between border-b border-[#e2d6bf] dark:border-[#332b24] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                  FIELD ARCHIVE • ENTRY 03A
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4ebd9] dark:bg-[#2c231c] text-[#713f12] dark:text-[#fbbf24] border border-[#d9ccb4] dark:border-[#42352a]">
                  {filteredProjects.length} BUILDS
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[#854d0e] dark:bg-[#78350f] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
                PAGE 03 • LEFT
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-book text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] dark:text-white mb-2">
              Shipped client builds.
            </h2>

            {/* Commission Ledger Note */}
            <div className="relative p-2.5 mb-3.5 bg-[#fef9eb] dark:bg-[#231e1a] border border-[#ded2b8] dark:border-[#3d3328] rounded-xl text-xs font-mono text-stone-800 dark:text-stone-200 shadow-xs">
              <div className="washi-tape-top absolute -top-2 left-8 w-16 h-3.5 pointer-events-none" />
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[11px] leading-tight">
                  <strong className="text-amber-900 dark:text-amber-300">COMMISSION:</strong> Custom Domain + 3 Months Free Service Included with each tier.
                </span>
              </div>
            </div>

            {/* Washi-Tape Category Filters */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3.5">
              <div className="flex flex-wrap gap-1">
                {filterOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all cursor-pointer border ${
                      activeFilter === option
                        ? 'bg-[#1c1917] dark:bg-[#fafafa] text-white dark:text-zinc-950 font-bold border-transparent shadow-xs'
                        : 'bg-[#ede4d4] dark:bg-[#27211c] text-[#635544] dark:text-[#c4b5a2] hover:bg-[#e4dac7] border-[#ded5c2] dark:border-[#382f27]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Sub-sheet Paginator */}
              <div className="flex items-center gap-1 font-mono text-[10px]">
                <button
                  onClick={prevSheet}
                  disabled={currentSheet === 0}
                  className={`p-1 rounded bg-[#ebe1cc] dark:bg-[#2d251f] border border-[#ded5c2] dark:border-[#382f27] ${
                    currentSheet === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-stone-200'
                  }`}
                  title="Previous sheet"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <span className="font-bold text-amber-900 dark:text-amber-300 px-1">
                  Sheet {currentSheet + 1}/{totalSheets}
                </span>
                <button
                  onClick={nextSheet}
                  disabled={currentSheet >= totalSheets - 1}
                  className={`p-1 rounded bg-[#ebe1cc] dark:bg-[#2d251f] border border-[#ded5c2] dark:border-[#382f27] ${
                    currentSheet >= totalSheets - 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-stone-200'
                  }`}
                  title="Next sheet"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Left Page Cards Container */}
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {leftPageProjects.map((project, idx) => renderCard(project, idx))}
              </AnimatePresence>
              {leftPageProjects.length === 0 && (
                <div className="p-6 text-center text-xs font-mono text-stone-500 border border-dashed border-stone-300 dark:border-stone-700 rounded-xl">
                  No projects under "{activeFilter}". Select another category above.
                </div>
              )}
            </div>
          </div>

          {/* Left Page Bottom Footer */}
          <div className="pt-3 mt-4 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between text-[10px] font-mono text-[#786b59] dark:text-[#a89b88]">
            <span>NOTEBOOK Nº 01 • WORK EXHIBIT</span>
            <span className="font-bold text-amber-800 dark:text-amber-400">
              SHEET {currentSheet + 1} OF {totalSheets}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PAGE: Right Header, Next 2 Projects & Studio Drawer Memo            */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between pt-8 md:pt-0 pl-3 sm:pl-5 md:pl-8 lg:md:pl-12 md:pr-2">
          <div>
            {/* Right Page Top Header */}
            <div className="flex items-center justify-between border-b border-[#e2d6bf] dark:border-[#332b24] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                  SCRAPBOOK EXHIBIT • ENTRY 03B
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="px-2 py-0.5 bg-[#854d0e] dark:bg-[#78350f] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
                PAGE 03 • RIGHT
              </span>
            </div>

            {/* Instruction strip */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 mb-3.5">
              <span className="flex items-center gap-1 text-[11px]">
                <Monitor className="w-3.5 h-3.5 text-amber-600" />
                <span>Tap "Inspect" for interactive screen demo</span>
              </span>
              <span className="text-[10px] text-amber-800 dark:text-amber-400 font-bold">
                13 LIVE SITES
              </span>
            </div>

            {/* Right Page Cards Container */}
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {rightPageProjects.map((project, idx) => renderCard(project, idx + 2))}
              </AnimatePresence>

              {/* Taped Studio Commission Note Card when on last page or odd count */}
              {rightPageProjects.length < 2 && (
                <div className="p-3.5 bg-[#f5ede0] dark:bg-[#251f1b] rounded-xl border border-[#ded3bd] dark:border-[#3d332a] text-xs font-mono text-[#443c33] dark:text-[#d1c7b7] shadow-xs relative">
                  <div className="washi-tape-top absolute -top-2 left-6 w-16 h-3.5 pointer-events-none" />
                  <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold text-xs mb-1">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>HAVE A CUSTOM BRIEF?</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-2">
                    Every design is handcrafted from scratch for real conversion. Domain, hosting, and 3 months of updates included.
                  </p>
                  <a
                    href={`${socials.whatsappUrl}?text=${encodeURIComponent(
                      `Hi ${profile.name}! I would like to commission a new bespoke website for my business.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[10px] font-bold shadow-xs"
                  >
                    <span>Request a Quote on WhatsApp</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Page Bottom Footer */}
          <div className="pt-3 mt-4 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between text-[10px] font-mono text-[#786b59] dark:text-[#a89b88]">
            <span className="rubber-stamp px-2 py-0.5 text-[8px] font-bold text-amber-800 dark:text-amber-500 border-amber-800/60 dark:border-amber-500/60 rounded-xs">
              VERIFIED DEPLOYMENTS
            </span>
            <span className="font-bold text-amber-800 dark:text-amber-400">
              [ 03 / 05 ]
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
