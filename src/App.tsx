import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NotebookContainer } from './components/NotebookContainer';
import { DeviceMonitorModal } from './components/DeviceMonitorModal';
import { QuestionnaireModal } from './components/QuestionnaireModal';
import { AssistantChatDrawer } from './components/AssistantChatDrawer';
import { EditProfileModal } from './components/EditProfileModal';
import { TermsModal } from './components/TermsModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { UnderDiarySection } from './components/UnderDiarySection';
import { initialProjects } from './data/projects';
import { getStoredProfile } from './data/profile';
import { Project, ProfileDetails } from './types';
import { sound } from './utils/sound';
import { MessageCircle, FileText, Sparkles } from 'lucide-react';
import { getSocialUrls } from './data/profile';

export default function App() {
  const [profile, setProfile] = useState<ProfileDetails>(getStoredProfile);
  const [projects] = useState<Project[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Dark mode detection & management
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('satyajit_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sound effects state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isEnabled());

  // Modals & Drawers
  const [monitorProject, setMonitorProject] = useState<Project | null>(null);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [showDock, setShowDock] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show dock when user scrolls down past initial header/notebook or nears bottom
      const scrolledDown = scrollY > 60;
      const nearBottom = windowHeight + scrollY >= docHeight - 120;
      const notScrollable = docHeight <= windowHeight + 30;

      setShowDock(scrolledDown || nearBottom || notScrollable);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('satyajit_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleToggleDark = () => {
    setIsDark(prev => !prev);
  };

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const socials = getSocialUrls(profile);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-x-hidden ${
        isDark ? 'bg-[#14110e] text-[#f3f4f6]' : 'bg-[#f8f6f0] text-[#1c1917]'
      }`}
    >
      {/* Background ambient lighting effects (Window sunlight beam and blind shadows) */}
      <div className="window-sunlight-beam fixed inset-0 pointer-events-none opacity-40 dark:opacity-10 z-0" />
      <div className="window-blind-shadow fixed inset-0 pointer-events-none opacity-20 dark:opacity-5 z-0" />

      {/* Top Application Bar */}
      <Header
        profile={profile}
        isDark={isDark}
        soundEnabled={soundEnabled}
        onToggleDark={handleToggleDark}
        onToggleSound={handleToggleSound}
        onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* Main Physical 3D Notebook Canvas */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-4 md:py-8">
        <NotebookContainer
          projects={projects}
          profile={profile}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onOpenMonitor={p => setMonitorProject(p)}
        />

        {/* Feature Pillars & Embedded Interactive Chat Console directly under the diary */}
        <UnderDiarySection profile={profile} />
      </main>

      {/* Floating Bottom Quick Action Dock - reveals on scroll, fixed at bottom (vertical on phone, horizontal on desktop) */}
      <div
        className={`fixed bottom-3 sm:bottom-3.5 right-3 sm:right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2 transition-all duration-300 ${
          showDock
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          id="floating-ask-btn"
          onClick={() => {
            sound.playClick();
            setIsChatOpen(true);
          }}
          className="flex items-center justify-center gap-1.5 p-2.5 sm:px-3 sm:py-2 bg-stone-900/95 dark:bg-stone-100/95 text-white dark:text-stone-900 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-mono font-bold border border-stone-700 dark:border-stone-300 backdrop-blur-xs cursor-pointer"
          title="Instant FAQ & Chat"
          aria-label="Instant FAQ & Chat"
        >
          <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
          <span className="hidden sm:inline">Ask {profile.name}</span>
        </button>

        <button
          id="floating-quote-btn"
          onClick={() => {
            sound.playClick();
            setIsQuestionnaireOpen(true);
          }}
          className="flex items-center justify-center gap-1.5 p-2.5 sm:px-3.5 sm:py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-mono font-bold border border-amber-400 cursor-pointer"
          title="Calculate Website Build Quote"
          aria-label="Calculate Website Build Quote"
        >
          <FileText className="w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden sm:inline">Estimate</span>
        </button>

        <a
          id="floating-whatsapp-btn"
          href={`${socials.whatsappUrl}?text=${encodeURIComponent(
            `Hi ${profile.name}! I saw your 3D Notebook portfolio. I would like to get a quote and discuss a website build.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          title="Chat directly on WhatsApp"
          aria-label="Chat directly on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
        </a>
      </div>

      {/* Footer copyright note */}
      <footer className="relative z-10 w-full py-3 sm:py-3.5 font-mono text-[11px] text-stone-500 dark:text-stone-400 border-t border-stone-200/80 dark:border-stone-800/80 bg-[#fbf9f4]/80 dark:bg-[#161311]/80 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pr-0 sm:pr-48">
          <span>© 2026 Crafted by {profile.name} • 3D Notepad Studio</span>
          <div className="flex items-center gap-2.5">
            <button
              id="footer-terms-btn"
              onClick={() => {
                sound.playClick();
                setIsTermsOpen(true);
              }}
              className="hover:text-amber-600 dark:hover:text-amber-400 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-amber-500 transition-colors cursor-pointer font-medium"
            >
              Terms & Conditions
            </button>
            <span className="text-stone-300 dark:text-stone-700 select-none">•</span>
            <button
              id="footer-privacy-btn"
              onClick={() => {
                sound.playClick();
                setIsPrivacyOpen(true);
              }}
              className="hover:text-amber-600 dark:hover:text-amber-400 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-amber-500 transition-colors cursor-pointer font-medium"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Device Monitor Simulator Modal */}
      <DeviceMonitorModal
        project={monitorProject}
        profile={profile}
        onClose={() => setMonitorProject(null)}
      />

      {/* Questionnaire / Quote Modal */}
      <QuestionnaireModal
        profile={profile}
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
      />

      {/* Assistant Chat Drawer */}
      <AssistantChatDrawer
        profile={profile}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Personalize My Details Modal */}
      <EditProfileModal
        currentProfile={profile}
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={updated => setProfile(updated)}
      />

      {/* Terms & Conditions Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        profile={profile}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        profile={profile}
      />
    </div>
  );
}
