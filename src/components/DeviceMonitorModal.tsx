import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Copy, Check, RotateCw, Smartphone, Monitor, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { Project, ProfileDetails } from '../types';
import { getSocialUrls } from '../data/profile';
import { sound } from '../utils/sound';

interface DeviceMonitorModalProps {
  project: Project | null;
  profile: ProfileDetails;
  onClose: () => void;
}

export const DeviceMonitorModal: React.FC<DeviceMonitorModalProps> = ({
  project,
  profile,
  onClose
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedLink, setCopiedLink] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeError, setIframeError] = useState(false);

  if (!project) return null;

  const socials = getSocialUrls(profile);
  const whatsappQuoteMsg = `Hello ${profile.name}! I loved your website build "${project.title}" (${project.tier} Tier). I would like to get a quote and commission a customized build for my brand, with domain name and 3 months free service included. Let's discuss!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project.liveUrl);
    setCopiedLink(true);
    sound.playChime();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReload = () => {
    sound.playClick();
    setIframeError(false);
    setIframeKey(k => k + 1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl bg-[#fcfbf9] dark:bg-[#181513] text-stone-900 dark:text-stone-100 rounded-2xl shadow-2xl border border-stone-300 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Control Bar */}
          <div className="p-3 sm:p-4 bg-stone-100 dark:bg-[#201c19] border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-2">
                <button
                  onClick={onClose}
                  className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer"
                  title="Close"
                />
                <button
                  onClick={() => setDeviceMode(m => (m === 'desktop' ? 'mobile' : 'desktop'))}
                  className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors cursor-pointer"
                  title="Toggle Viewport"
                />
                <button
                  onClick={handleReload}
                  className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
                  title="Reload"
                />
              </div>

              <div>
                <h3 className="font-serif-book font-bold text-base sm:text-lg leading-tight">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  {project.category} • {project.tier} Tier
                </span>
              </div>
            </div>

            {/* Device Switcher & Actions */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-stone-200 dark:bg-stone-800 p-1 rounded-xl">
                <button
                  onClick={() => {
                    sound.playClick();
                    setDeviceMode('desktop');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    deviceMode === 'desktop'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setDeviceMode('mobile');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    deviceMode === 'mobile'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile (375px)</span>
                </button>
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-1.5 sm:px-2.5 sm:py-1.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-1"
                title="Open Live URL in New Tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open ↗</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Browser Address Bar */}
          <div className="px-4 py-2 bg-stone-50 dark:bg-[#1c1917] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 text-xs font-mono text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2 flex-1 min-w-0 bg-white dark:bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800">
              <Globe className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="truncate">{project.liveUrl}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                title="Copy URL"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleReload}
                className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                title="Reload Frame"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Monitor Display Canvas */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-200/50 dark:bg-stone-950 flex flex-col items-center justify-start min-h-[420px]">
            <div
              className={`transition-all duration-300 shadow-2xl rounded-xl overflow-hidden border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 w-full ${
                deviceMode === 'mobile' ? 'max-w-[390px] h-[640px]' : 'max-w-full h-[520px]'
              }`}
            >
              {!iframeError ? (
                <iframe
                  key={iframeKey}
                  src={project.liveUrl}
                  title={project.title}
                  onError={() => setIframeError(true)}
                  className="w-full h-full border-0 bg-stone-900"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                /* Fallback Interactive Preview if iframe security header prevents embedding */
                <div className="w-full h-full p-6 flex flex-col justify-between bg-[#1c1917] text-white">
                  <div>
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                      LIVE PREVIEW SIMULATOR
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif-book font-bold text-white mt-2">
                      {project.liveDemoData?.headline || project.title}
                    </h2>
                    <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                      {project.liveDemoData?.subheadline || project.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                      {project.liveDemoData?.highlights?.map((h, i) => (
                        <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                          <span className="text-amber-400 font-mono text-xs font-bold block">{h.metric}</span>
                          <span className="text-sm font-semibold block text-white mt-1">{h.title}</span>
                          <span className="text-xs text-stone-400 block mt-0.5">{h.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs font-mono text-stone-400">External security restriction prevents in-frame browsing</span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono rounded-xl transition-all"
                    >
                      Open in New Tab ↗
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Turnkey Specs & Inclusions Ledger */}
            <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 bg-white dark:bg-stone-900/90 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase">LIGHTHOUSE</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {project.specs.lighthouseScore}/100 Speed
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-stone-900/90 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase">DOMAIN INCLUDED</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    Custom Domain Name
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-stone-900/90 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase">3MO SERVICE</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    Free Maintenance
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-stone-900/90 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase">HOSTING</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    $0 / Month Forever
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 bg-white dark:bg-[#181513] border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-stone-500 dark:text-stone-400">
              <span>Looking for a website like </span>
              <strong className="text-stone-800 dark:text-stone-200">{project.title}</strong>
              <span> for your business?</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`${socials.whatsappUrl}?text=${encodeURIComponent(whatsappQuoteMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>Get Instant WhatsApp Quote</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-mono font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
