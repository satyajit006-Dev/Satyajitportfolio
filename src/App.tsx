import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NotebookContainer } from './components/NotebookContainer';
import { DeviceMonitorModal } from './components/DeviceMonitorModal';
import { QuestionnaireModal } from './components/QuestionnaireModal';
import { AssistantChatDrawer } from './components/AssistantChatDrawer';
import { EditProfileModal } from './components/EditProfileModal';
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
      </main>

      {/* Floating Bottom Quick Action Dock */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          id="floating-ask-btn"
          onClick={() => {
            sound.playClick();
            setIsChatOpen(true);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-mono font-bold border border-stone-700 dark:border-stone-300 cursor-pointer"
          title="Instant FAQ & Chat"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Ask {profile.name}</span>
        </button>

        <button
          id="floating-quote-btn"
          onClick={() => {
            sound.playClick();
            setIsQuestionnaireOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-mono font-bold border border-amber-400 cursor-pointer"
          title="Calculate Website Build Quote"
        >
          <FileText className="w-3.5 h-3.5" />
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
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>

      {/* Footer copyright note */}
      <footer className="relative z-10 w-full py-3 text-center font-mono text-[11px] text-stone-500 dark:text-stone-400 border-t border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>© 2026 Crafted by {profile.name} • 3D Notepad Studio</span>
          <span>WhatsApp ({profile.whatsappFormatted}) • {profile.email}</span>
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
    </div>
  );
}
