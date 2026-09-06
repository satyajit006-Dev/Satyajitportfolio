import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, ProfileDetails, TabItem } from '../types';
import { NotebookCover } from './NotebookCover';
import { NotebookAbout } from './NotebookAbout';
import { NotebookWork } from './NotebookWork';
import { NotebookStack } from './NotebookStack';
import { NotebookContact } from './NotebookContact';
import { sound } from '../utils/sound';

interface NotebookContainerProps {
  projects: Project[];
  profile: ProfileDetails;
  currentPage: number;
  onPageChange: (page: number) => void;
  onOpenMonitor: (project: Project) => void;
}

export const NotebookContainer: React.FC<NotebookContainerProps> = ({
  projects,
  profile,
  currentPage,
  onPageChange,
  onOpenMonitor
}) => {
  const [direction, setDirection] = useState<number>(0);

  // Elastic band toggle for tactile pocket diary interaction
  const [isElasticClosed, setIsElasticClosed] = useState<boolean>(false);

  const tabs: TabItem[] = [
    { id: 'cover', label: 'COVER', page: 0, color: 'from-[#8b2626] to-[#6d1b1b]' },
    { id: 'about', label: 'ABOUT', page: 1, color: 'from-[#8b2626] to-[#6d1b1b]' },
    { id: 'work', label: 'WORK', page: 2, color: 'from-[#8b2626] to-[#6d1b1b]' },
    { id: 'stack', label: 'STACK', page: 3, color: 'from-[#8b2626] to-[#6d1b1b]' },
    { id: 'contact', label: 'CONTACT', page: 4, color: 'from-[#8b2626] to-[#6d1b1b]' }
  ];

  // Thumb tab labels for the mobile pocket diary
  const pocketTabs = [
    { id: 'cvr', label: 'CVR', num: '01', page: 0, bg: 'bg-[#8b2626]', text: 'text-amber-100' },
    { id: 'abt', label: 'ABT', num: '02', page: 1, bg: 'bg-[#92400e]', text: 'text-amber-100' },
    { id: 'wrk', label: 'WRK', num: '03', page: 2, bg: 'bg-[#155e75]', text: 'text-cyan-100' },
    { id: 'stk', label: 'STK', num: '04', page: 3, bg: 'bg-[#581c87]', text: 'text-purple-100' },
    { id: 'con', label: 'CON', num: '05', page: 4, bg: 'bg-[#065f46]', text: 'text-emerald-100' },
  ];

  const goToPage = (newPage: number) => {
    if (newPage === currentPage || newPage < 0 || newPage > 4) return;
    setDirection(newPage > currentPage ? 1 : -1);
    sound.playPageTurn();
    onPageChange(newPage);
  };

  const nextPage = () => {
    if (currentPage < 4) goToPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const progressPercent = Math.round(((currentPage + 1) / 5) * 100);

  // Common Page Content Renderer
  const renderPageContent = () => (
    <AnimatePresence mode="wait" custom={direction}>
      {currentPage === 0 && (
        <NotebookCover
          key="page-0"
          profile={profile}
          direction={direction}
          onNavigate={goToPage}
        />
      )}
      {currentPage === 1 && (
        <NotebookAbout
          key="page-1"
          profile={profile}
          direction={direction}
        />
      )}
      {currentPage === 2 && (
        <NotebookWork
          key="page-2"
          projects={projects}
          profile={profile}
          direction={direction}
          onOpenMonitor={onOpenMonitor}
        />
      )}
      {currentPage === 3 && (
        <NotebookStack
          key="page-3"
          profile={profile}
          direction={direction}
        />
      )}
      {currentPage === 4 && (
        <NotebookContact
          key="page-4"
          profile={profile}
          direction={direction}
          onNavigate={goToPage}
        />
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative w-full flex flex-col items-center py-1 sm:py-3 select-none">
      {/* Top Archival Diary Info Header */}
      <div className="w-full max-w-6xl flex items-center justify-between px-3 sm:px-6 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-xs animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#786b59] dark:text-[#a89b88] uppercase">
            ARCHIVAL WORKBOOK • {tabs[currentPage]?.label}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW: FIXED & TAILORED POCKET DIARY (Block on mobile only)       */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full max-w-[390px] mx-auto my-1 px-2">
        <div className="relative w-full pr-8">
          {/* Stepped Thumb-Cut Side Index Tabs on the right edge (Reserved space prevents clipping) */}
          <div className="absolute right-0 top-12 flex flex-col gap-2 z-30">
            {pocketTabs.map(tab => {
              const isActive = currentPage === tab.page;
              return (
                <button
                  key={tab.id}
                  id={`pocket-tab-${tab.id}`}
                  onClick={() => goToPage(tab.page)}
                  className={`relative w-8 h-10 flex flex-col items-center justify-center rounded-r-lg border border-l-0 border-black/30 shadow-md font-mono transition-all cursor-pointer ${
                    tab.bg
                  } ${tab.text} ${
                    isActive
                      ? 'translate-x-1 shadow-lg ring-2 ring-amber-400 font-bold scale-105 brightness-110'
                      : 'opacity-85 hover:opacity-100 hover:translate-x-0.5'
                  }`}
                  title={`Flip to ${tabs[tab.page]?.label}`}
                >
                  <span className="text-[8px] font-bold opacity-80 leading-none">{tab.num}</span>
                  <span className="text-[9px] font-bold tracking-tighter uppercase leading-none mt-0.5">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pocket Diary Outer Leatherette Binder Frame */}
          <div className="relative w-full bg-[#3b2e23] dark:bg-[#161310] p-3 rounded-[24px] pocket-book-shadow border-4 border-[#271d15] dark:border-[#0e0c0a] transition-all">
            {/* Perimeter Stitching Line */}
            <div className="pocket-stitch absolute inset-2 pointer-events-none" />

            {/* Brass Corner Rivets */}
            <div className="brass-rivet absolute top-2.5 left-2.5 w-3 h-3 rounded-full pointer-events-none" />
            <div className="brass-rivet absolute top-2.5 right-2.5 w-3 h-3 rounded-full pointer-events-none" />
            <div className="brass-rivet absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full pointer-events-none" />
            <div className="brass-rivet absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full pointer-events-none" />

            {/* Vertical Elastic Closure Ribbon Band (Non-blocking with pointer-events-none) */}
            <div
              className={`pocket-elastic-band absolute top-0 bottom-0 right-4 w-3.5 rounded-xs z-20 pointer-events-none transition-all duration-300 ${
                isElasticClosed ? 'opacity-90 shadow-xl' : 'opacity-20'
              }`}
            />

            {/* Playful Strap Snap Toggle in upper right corner */}
            <button
              onClick={() => {
                sound.playClick();
                setIsElasticClosed(!isElasticClosed);
              }}
              className="absolute top-2 right-2.5 z-30 px-1.5 py-0.5 rounded bg-black/50 text-[8px] font-mono text-amber-200 border border-amber-900/60 cursor-pointer shadow-xs"
              title="Click to toggle Moleskine strap"
            >
              {isElasticClosed ? 'LOCKED' : 'STRAP'}
            </button>

            {/* Pocket Diary Inner Page Paper Body */}
            <div className="relative w-full min-h-[560px] max-h-[72vh] bg-[#fcfbf7] dark:bg-[#1a1715] text-[#1c1917] dark:text-[#f3f4f6] rounded-[18px] shadow-inner border-2 border-[#e7e1d5] dark:border-[#2b241e] overflow-hidden flex flex-col justify-between">
              {/* Ruled paper texture */}
              <div className="absolute inset-0 bg-lined-paper opacity-30 dark:opacity-10 pointer-events-none" />

              {/* Red vertical margin line on left side */}
              <div className="absolute top-0 bottom-0 left-4 w-[1.5px] bg-red-400/35 dark:bg-red-500/25 pointer-events-none z-20" />

              {/* Pocket Diary Top Header Bar */}
              <div className="w-full bg-[#f4ebd9] dark:bg-[#221c17] px-3.5 py-2 border-b border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#786b59] dark:text-[#a89b88] font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span>POCKET MEMO • VOL. 01</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 bg-[#854d0e] text-amber-100 text-[9px] font-mono uppercase font-bold rounded">
                    {tabs[currentPage]?.label}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-stone-700 dark:text-stone-300">
                    [{currentPage + 1}/5]
                  </span>
                </div>
              </div>

              {/* Main Content Area with smooth touch scrolling */}
              <div className="relative w-full flex-1 p-3 overflow-y-auto overscroll-contain max-h-[calc(72vh-85px)] z-10">
                {renderPageContent()}
              </div>

              {/* Pocket Diary Bottom Navigation Bar */}
              <div className="w-full bg-[#f4ebd9] dark:bg-[#221c17] px-3 py-2 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between z-20 font-mono text-xs">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded bg-[#ebe1cc] dark:bg-[#2d251f] text-stone-800 dark:text-stone-200 border border-[#ded5c2] dark:border-[#382f27] font-bold text-xs ${
                    currentPage === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-stone-200'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {/* Progress bar */}
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400">
                    {progressPercent}%
                  </span>
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === 4}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded bg-[#ebe1cc] dark:bg-[#2d251f] text-stone-800 dark:text-stone-200 border border-[#ded5c2] dark:border-[#382f27] font-bold text-xs ${
                    currentPage === 4 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-stone-200'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Hanging Satin Bookmark Ribbon extending from bottom */}
            <div className="absolute -bottom-6 left-1/4 w-3.5 h-8 bg-gradient-to-b from-[#b91c1c] via-[#dc2626] to-[#991b1b] rounded-b-sm shadow-md pointer-events-none z-30 border border-red-800">
              <div className="absolute bottom-0 inset-x-0 h-2 bg-[#7f1d1d]" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEW: AUTHENTIC 3D LANDSCAPE ANGLED DESK JOURNAL (md and up)   */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col items-center w-full max-w-6xl xl:max-w-7xl mx-auto desk-landscape-perspective">
        {/* Top Tabs Bar */}
        <div className="w-full flex items-end justify-between px-6 lg:px-10 -mb-1 z-30">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {tabs.map(tab => {
              const isActive = currentPage === tab.page;
              return (
                <button
                  key={tab.id}
                  id={`notebook-tab-${tab.id}`}
                  onClick={() => goToPage(tab.page)}
                  className={`relative px-4 lg:px-6 py-2.5 text-xs font-mono font-bold tracking-wider rounded-t-xl transition-all duration-200 cursor-pointer border-t border-x ${
                    isActive
                      ? 'bg-[#fcfbf7] dark:bg-[#1a1715] text-[#1c1917] dark:text-white border-[#ded5c2] dark:border-[#382f27] -translate-y-1 shadow-md z-20'
                      : 'bg-[#ebe3d3] dark:bg-[#251f1a] text-[#786b59] dark:text-[#a89b88] hover:bg-[#f2ebdc] dark:hover:bg-[#2e2621] border-[#d8cdb8] dark:border-[#332b24] hover:-translate-y-0.5'
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-0 left-0 right-0 h-1 bg-amber-500 rounded-t-xl" />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Angled Landscape Desk Spread with 3D Depth */}
        <div className="relative w-full flex items-center justify-center desk-landscape-angle">
          {/* Left Arrow Button */}
          {currentPage > 0 && (
            <button
              onClick={prevPage}
              className="absolute -left-4 lg:-left-7 z-40 p-2.5 lg:p-3 rounded-full bg-white/95 dark:bg-stone-800/95 hover:bg-white dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 shadow-2xl border border-stone-300 dark:border-stone-700 transition-all hover:scale-110 active:scale-95 cursor-pointer"
              title="Previous Page (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Desk Leather Underlay Mat Chassis */}
          <div className="relative w-full bg-[#34271c] dark:bg-[#120f0c] p-3.5 lg:p-4 rounded-[32px] desk-mat-shadow border-4 border-[#221810] dark:border-[#0c0907] transition-all">
            {/* Perimeter Stitching Line */}
            <div className="pocket-stitch absolute inset-2 pointer-events-none" />

            {/* Brass Corner Rivets */}
            <div className="brass-rivet absolute top-3 left-3 w-3.5 h-3.5 rounded-full pointer-events-none" />
            <div className="brass-rivet absolute top-3 right-3 w-3.5 h-3.5 rounded-full pointer-events-none" />
            <div className="brass-rivet absolute bottom-3 left-3 w-3.5 h-3.5 rounded-full pointer-events-none" />
            <div className="brass-rivet absolute bottom-3 right-3 w-3.5 h-3.5 rounded-full pointer-events-none" />

            {/* Hanging Bookmark Ribbon at top */}
            <div className="absolute -top-3 left-28 w-5 h-10 bg-gradient-to-b from-[#b91c1c] via-[#dc2626] to-[#991b1b] rounded-t-sm shadow-md pointer-events-none z-40 border border-red-800">
              <div className="absolute top-0 inset-x-0 h-2 bg-[#7f1d1d]" />
            </div>

            {/* Open Two-Page Parchment Spread */}
            <div className="relative w-full min-h-[660px] lg:min-h-[720px] bg-[#fcfbf7] dark:bg-[#1a1715] text-[#1c1917] dark:text-[#f3f4f6] rounded-2xl lg:rounded-3xl border-2 border-[#e7e1d5] dark:border-[#2b241e] overflow-hidden flex flex-col justify-between paper-leaf-edge-left paper-leaf-edge-right">
              {/* Subtle paper grid pattern */}
              <div className="absolute inset-0 bg-grid-paper opacity-30 dark:opacity-5 pointer-events-none" />

              {/* Book Spine Center Gutter Fold Shadow (Simulating Open Two-Page Book) */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 lg:w-16 bg-gradient-to-r from-transparent via-black/15 dark:via-black/45 to-transparent pointer-events-none z-20" />

              {/* 3D Binder Spiral Coils along the spine */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-around pointer-events-none z-30 py-6">
                {Array.from({ length: 18 }).map((_, idx) => (
                  <div key={idx} className="relative w-6 h-3 flex items-center justify-center">
                    <div className="w-5 h-2 rounded-full bg-gradient-to-r from-stone-400 via-stone-200 to-stone-500 dark:from-stone-700 dark:via-stone-500 dark:to-stone-800 shadow-sm border border-stone-400/50" />
                    <div className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-stone-900/40 dark:bg-black/60" />
                    <div className="absolute -right-1 w-1.5 h-1.5 rounded-full bg-stone-900/40 dark:bg-black/60" />
                  </div>
                ))}
              </div>

              {/* Page Content */}
              <div className="relative w-full flex-1 p-6 lg:p-10 z-10">
                {renderPageContent()}
              </div>

              {/* Bottom Spine Finishing Edge */}
              <div className="w-full bg-[#f4ece0] dark:bg-[#201b18] px-6 lg:px-10 py-2.5 border-t border-[#ded5c2] dark:border-[#332b24] flex items-center justify-between z-20 text-[11px] font-mono text-[#786b59] dark:text-[#a89b88]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 uppercase">
                    {tabs[currentPage]?.label} SPREAD
                  </span>
                  <span>•</span>
                  <span>ARCHIVAL DESK NOTEBOOK</span>
                </div>

                {/* Reading progress track */}
                <div className="flex items-center gap-2.5">
                  <div className="w-28 sm:w-36 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="font-bold text-amber-700 dark:text-amber-400">
                    {progressPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          {currentPage < 4 && (
            <button
              onClick={nextPage}
              className="absolute -right-4 lg:-right-7 z-40 p-2.5 lg:p-3 rounded-full bg-white/95 dark:bg-stone-800/95 hover:bg-white dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 shadow-2xl border border-stone-300 dark:border-stone-700 transition-all hover:scale-110 active:scale-95 cursor-pointer"
              title="Next Page (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
