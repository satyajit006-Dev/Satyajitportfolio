import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileCheck, Clock, Server, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { ProfileDetails } from '../types';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileDetails;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl max-h-[85vh] bg-[#fcfbf9] dark:bg-[#1c1815] text-stone-900 dark:text-stone-100 rounded-2xl shadow-2xl border border-stone-300 dark:border-stone-800 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-100/70 dark:bg-[#231e1a]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-xl border border-amber-400/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-book font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                  Terms & Conditions
                </h3>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  Website Development & Delivery Agreement • {profile.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <p className="text-xs leading-relaxed">
                Every website built by <strong>{profile.name}</strong> includes a custom domain name registration, zero-cost monthly cloud hosting configuration, and 3 months of complimentary maintenance.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                <FileCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>1. Scope of Work & Deliverables</span>
              </div>
              <p>
                All website packages encompass responsive layout development (mobile, tablet, desktop), performance optimization, interactive animations, SEO meta tags, and full frontend source code delivery via private or public GitHub repository.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                <Server className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>2. Domain Registration & Hosting</span>
              </div>
              <p>
                Website builds include 1 year of primary custom domain registration (e.g. .com, .in, .store where standard registration pricing applies). Sites are deployed to modern edge hosting networks (Vercel Edge or Cloudflare Pages) where ongoing hosting costs are $0/month.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>3. Turnaround & Milestones</span>
              </div>
              <p>
                Single-page and lead-generation websites are typically deployed for client review within 24 to 48 hours. Multi-page applications or comprehensive commercial catalogs ship within 3 to 5 business days upon receipt of initial content and brand guidelines.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>4. 3-Month Maintenance & Revisions</span>
              </div>
              <p>
                Clients receive 90 days of free ongoing technical support and maintenance starting from the official deployment date. This covers text adjustments, photo additions, menu updates, contact information updates, and browser compatibility patches.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>5. Intellectual Property & Code Ownership</span>
              </div>
              <p>
                Upon final project settlement, 100% full intellectual property rights, asset ownership, and source code transfer to the client. There are no lock-ins, recurring licensing fees, or proprietary software restrictions.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-[#181412] flex items-center justify-between">
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              Last updated: 2026 • {profile.name}
            </span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-mono font-bold text-xs rounded-xl shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              I Understand & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
