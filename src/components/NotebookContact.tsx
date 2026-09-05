import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Mail, Linkedin, Check, RotateCcw, Send, Sparkles } from 'lucide-react';
import { ProfileDetails } from '../types';
import { getSocialUrls } from '../data/profile';
import { sound } from '../utils/sound';

interface NotebookContactProps {
  profile: ProfileDetails;
  direction: number;
  onNavigate: (page: number) => void;
}

export const NotebookContact: React.FC<NotebookContactProps> = ({ profile, direction, onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scratchpadNote, setScratchpadNote] = useState('');
  const socials = getSocialUrls(profile);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    sound.playChime();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendScratchpad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scratchpadNote.trim()) return;
    sound.playClick();
    const encoded = encodeURIComponent(
      `Hi Satyajit! I left this note in your 3D Portfolio Notebook:\n\n"${scratchpadNote.trim()}"`
    );
    window.open(`${socials.whatsappUrl}?text=${encoded}`, '_blank');
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
        {/* LEFT PAGE: Direct Dispatch Channels (WhatsApp, Email & Availability Memo) */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e7decb] dark:border-[#332b24] pb-8 md:pb-0 pl-3 sm:pl-5 md:pl-2 md:pr-8 lg:md:pr-12">
          <div>
            {/* Left Page Top Header */}
            <div className="flex items-center justify-between border-b border-[#e2d6bf] dark:border-[#332b24] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                  DISPATCH DESK • ENTRY 05A
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4ebd9] dark:bg-[#2c231c] text-[#713f12] dark:text-[#fbbf24] border border-[#d9ccb4] dark:border-[#42352a]">
                  INSIDE BACK COVER
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[#854d0e] dark:bg-[#78350f] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
                PAGE 05 • LEFT
              </span>
            </div>

            {/* Vintage Airmail Stripe Trim */}
            <div className="mb-4">
              <div className="h-1.5 w-full airmail-border rounded-full opacity-70" />
            </div>

            <h2 className="font-serif-book text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] dark:text-white leading-tight mb-2">
              Got something to <span className="italic font-bold text-amber-900 dark:text-amber-300">build</span>?
            </h2>

            <p className="text-xs sm:text-sm text-[#574d3f] dark:text-[#b8ac9c] mb-4 leading-relaxed">
              Send the brief, an architectural sketch, or just say hello. I reply on WhatsApp fastest, email a close second.
            </p>

            {/* Direct Dispatch Cards */}
            <div className="space-y-3">
              {/* WhatsApp Priority Dispatch */}
              <a
                href={`${socials.whatsappUrl}?text=${encodeURIComponent(
                  `Hi ${profile.name}! I saw your 3D Notebook portfolio. I would like to discuss building a website for my business.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 bg-[#fbf9f3] dark:bg-[#1f1b18] hover:bg-[#f4ebd9] dark:hover:bg-[#28221d] rounded-xl border border-[#ded5c2] dark:border-[#382f27] transition-all flex items-center justify-between group shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-bold">
                      [TELEGRAM DISPATCH]
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> WhatsApp Direct
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
                    {profile.whatsappFormatted}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Chat ↗
                </span>
              </a>

              {/* Email Card */}
              <div
                onClick={handleCopyEmail}
                className="p-3 bg-[#fbf9f3] dark:bg-[#1f1b18] hover:bg-[#f4ebd9] dark:hover:bg-[#28221d] rounded-xl border border-[#ded5c2] dark:border-[#382f27] transition-all flex items-center justify-between cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div>
                  <span className="text-[9px] font-mono text-amber-800 dark:text-amber-400 uppercase tracking-wider block font-bold mb-0.5">
                    [POSTAL DISPATCH]
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 truncate">
                    <Mail className="w-4 h-4 text-amber-700 dark:text-amber-400" /> {profile.email}
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
                    Click to copy address
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">
                  {copiedEmail ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </span>
                  ) : (
                    'Copy 📋'
                  )}
                </span>
              </div>
            </div>

            {/* Taped Availability Memo */}
            <div className="relative mt-4 p-3 bg-[#f5ede0] dark:bg-[#251f1b] rounded-xl border border-[#ded3bd] dark:border-[#3d332a] text-xs font-mono text-[#443c33] dark:text-[#d1c7b7] shadow-xs">
              <div className="washi-tape-top absolute -top-2 left-6 w-16 h-3 pointer-events-none" />
              <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold text-[10px] mb-1">
                <Sparkles className="w-3 h-3" />
                <span>AVAILABILITY LOG // 2026:</span>
              </div>
              Currently accepting client commissions. Websites delivered turnkey with domain & hosting setup within days.
            </div>
          </div>

          {/* Left Page Bottom Footer */}
          <div className="pt-3 mt-4 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between text-[10px] font-mono text-[#786b59] dark:text-[#a89b88]">
            <span>NOTEBOOK Nº 01 • DIRECT CHANNELS</span>
            <span className="font-bold text-amber-800 dark:text-amber-400">
              [ 05 / 05 • A ]
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PAGE: Social Wires, Interactive Scratchpad Memo & Cover Return      */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between pt-8 md:pt-0 pl-3 sm:pl-5 md:pl-8 lg:md:pl-12 md:pr-2">
          <div>
            {/* Right Page Top Header */}
            <div className="flex items-center justify-between border-b border-[#e2d6bf] dark:border-[#332b24] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-[#786b59] dark:text-[#a89b88] uppercase font-semibold">
                  TELEGRAPH & PROFESSIONAL • ENTRY 05B
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="px-2 py-0.5 bg-[#854d0e] dark:bg-[#78350f] text-amber-100 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">
                PAGE 05 • RIGHT
              </span>
            </div>

            {/* LinkedIn Professional Dispatch Card */}
            <div className="mb-4">
              <a
                id="contact-linkedin-link"
                href={socials.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 bg-[#fbf9f3] dark:bg-[#1f1b18] hover:bg-[#f4ebd9] dark:hover:bg-[#28221d] rounded-xl border border-[#ded5c2] dark:border-[#382f27] transition-all flex items-center justify-between shadow-xs hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-mono text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider">
                        [PROFESSIONAL NETWORK]
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                    <div className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                      LinkedIn Profile
                    </div>
                    <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
                      Connect & discuss bespoke web engineering
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 group-hover:translate-x-1 transition-transform pr-1">
                  Connect ↗
                </span>
              </a>
            </div>

            {/* Interactive Scratchpad Form */}
            <div className="p-3 bg-[#fefcf8] dark:bg-[#1a1715] rounded-xl border border-[#ded5c2] dark:border-[#382f27] shadow-xs relative">
              <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono text-[#786b59] dark:text-[#a89b88]">
                <span className="font-bold uppercase tracking-wider">QUICK MEMO DISPATCH:</span>
                <span className="font-handwriting text-amber-900 dark:text-amber-300 text-sm">Leave a note ✍</span>
              </div>
              <form onSubmit={handleSendScratchpad}>
                <textarea
                  id="scratchpad-input"
                  value={scratchpadNote}
                  onChange={e => setScratchpadNote(e.target.value)}
                  placeholder="e.g. 'Hey Satyajit, I need a modern restaurant website with online menu and table bookings...'"
                  rows={3}
                  className="w-full p-2 text-xs font-mono bg-[#f6efe2] dark:bg-[#241e19] text-stone-900 dark:text-stone-100 rounded-lg border border-[#e2d6bf] dark:border-[#382f27] focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none placeholder:text-stone-400 dark:placeholder:text-stone-500"
                />
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPageTurn();
                      onNavigate(0);
                    }}
                    className="flex items-center gap-1 text-[10px] font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                    title="Flip back to the cover page"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Return to Cover</span>
                  </button>
                  <button
                    type="submit"
                    disabled={!scratchpadNote.trim()}
                    className={`flex items-center gap-1 px-3 py-1 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded text-xs font-mono font-bold shadow-xs cursor-pointer transition-all ${
                      !scratchpadNote.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>Dispatch</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Page Bottom Footer */}
          <div className="pt-3 mt-4 border-t border-[#ded5c2] dark:border-[#382f27] flex items-center justify-between text-[10px] font-mono text-[#786b59] dark:text-[#a89b88]">
            <span className="rubber-stamp px-2 py-0.5 text-[8px] font-bold text-amber-800 dark:text-amber-500 border-amber-800/60 dark:border-amber-500/60 rounded-xs">
              END OF VOLUME Nº 01
            </span>
            <span className="font-bold text-amber-800 dark:text-amber-400">
              [ 05 / 05 • B ]
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
