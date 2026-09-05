import React from 'react';
import { Volume2, VolumeX, Sun, Moon, Sparkles, MessageCircle, FileText, Settings2, Linkedin } from 'lucide-react';
import { ProfileDetails } from '../types';
import { getSocialUrls } from '../data/profile';
import { sound } from '../utils/sound';

interface HeaderProps {
  profile: ProfileDetails;
  isDark: boolean;
  soundEnabled: boolean;
  onToggleDark: () => void;
  onToggleSound: () => void;
  onOpenQuestionnaire: () => void;
  onOpenChat: () => void;
  onOpenEditProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  isDark,
  soundEnabled,
  onToggleDark,
  onToggleSound,
  onOpenQuestionnaire,
  onOpenChat,
  onOpenEditProfile
}) => {
  const socials = getSocialUrls(profile);

  return (
    <header className="w-full bg-[#fcfbf8]/90 dark:bg-[#181513]/90 backdrop-blur-md border-b border-[#e5ddce] dark:border-[#2f2721] sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 tracking-tight">
              {profile.name}
            </span>
            <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
              3D Notepad Nº 01
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-stone-500 dark:text-stone-400 pl-3 border-l border-stone-300 dark:border-stone-700">
            <span>Tailored Pricing • Domain + 3Mo Service Included</span>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Ask Assistant */}
          <button
            id="header-ask-btn"
            onClick={() => {
              sound.playClick();
              onOpenChat();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-400/40 rounded-xl text-xs font-mono font-bold transition-all active:scale-95 cursor-pointer"
            title="Ask Questions About Website Builds & Pricing"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Ask {profile.name}</span>
          </button>

          {/* Instant Quote / Questionnaire */}
          <button
            id="header-quote-btn"
            onClick={() => {
              sound.playClick();
              onOpenQuestionnaire();
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono rounded-xl shadow-xs transition-all active:scale-95 border border-amber-400/60 cursor-pointer"
            title="Instant Website Quote Calculator"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quote</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            id="header-whatsapp-btn"
            href={`${socials.whatsappUrl}?text=${encodeURIComponent(`Hi ${profile.name}! I saw your 3D Notebook Portfolio. I would love to get a quote for a website build.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono rounded-xl shadow-xs transition-all active:scale-95"
            title={`Direct WhatsApp with ${profile.name}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* LinkedIn */}
          <a
            id="header-linkedin-btn"
            href={socials.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-stone-700 dark:text-stone-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl border border-stone-200 dark:border-stone-800 transition-colors text-xs font-mono font-semibold"
            title={`LinkedIn: ${profile.name}`}
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          {/* Audio toggle */}
          <button
            id="header-sound-btn"
            onClick={() => {
              onToggleSound();
            }}
            className="p-1.5 sm:px-2 sm:py-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Dark mode toggle */}
          <button
            id="header-theme-btn"
            onClick={() => {
              sound.playClick();
              onToggleDark();
            }}
            className="p-1.5 sm:px-2 sm:py-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer"
            title={isDark ? 'Switch to Light Craft Paper' : 'Switch to Dark Leather Notebook'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* Edit Details Quick Drawer Button */}
          <button
            id="header-edit-profile-btn"
            onClick={() => {
              sound.playClick();
              onOpenEditProfile();
            }}
            className="p-1.5 sm:px-2 sm:py-1.5 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 rounded-xl border border-amber-300/70 dark:border-amber-700/60 transition-colors cursor-pointer"
            title="Edit / Personalize My Details"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
