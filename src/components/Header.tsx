import React from 'react';
import { Volume2, VolumeX, Sun, Moon, Settings2 } from 'lucide-react';
import { ProfileDetails } from '../types';
import { sound } from '../utils/sound';

interface HeaderProps {
  profile: ProfileDetails;
  isDark: boolean;
  soundEnabled: boolean;
  onToggleDark: () => void;
  onToggleSound: () => void;
  onOpenQuestionnaire?: () => void;
  onOpenChat?: () => void;
  onOpenEditProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  isDark,
  soundEnabled,
  onToggleDark,
  onToggleSound,
  onOpenEditProfile
}) => {
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
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-stone-500 dark:text-stone-400 pl-3 border-l border-stone-300 dark:border-stone-700">
            <span>Tailored Pricing • Domain + 3Mo Service Included</span>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
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
