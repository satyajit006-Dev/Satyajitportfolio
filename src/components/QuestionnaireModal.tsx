import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Copy, MessageCircle, Sparkles, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { ProfileDetails, QuestionnaireAnswers } from '../types';
import { getSocialUrls } from '../data/profile';
import { sound } from '../utils/sound';

interface QuestionnaireModalProps {
  profile: ProfileDetails;
  isOpen: boolean;
  onClose: () => void;
}

export const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  profile,
  isOpen,
  onClose
}) => {
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const socials = getSocialUrls(profile);

  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    tier: 'Luxury Tier (High-End & Editorial)',
    scope: '2-3 Pages Showcase / Menu / Booking',
    timeline: '24-48 Hours Express',
    notes: ''
  });

  if (!isOpen) return null;

  const tierOptions = [
    {
      title: 'Luxury Tier',
      desc: 'Gold/charcoal aesthetic, rich micro-interactions, storytelling, signature menu/reservation flows.',
      examples: 'Hotel Marigold, The Aromas, Elandeb'
    },
    {
      title: 'Premium Tier',
      desc: 'High-converting sales funnels, aggressive call-to-actions, pass trials, dynamic performance styling.',
      examples: 'Fitness Garage, Knockout Gym, Grant’s Ride Clean'
    },
    {
      title: 'Simple Tier',
      desc: 'Fast, pragmatic contractor & trade dispatch sites with tap-to-call, quote forms, and services ledger.',
      examples: 'HF Plumbing, Florin Handyman, J Brick'
    }
  ];

  const scopeOptions = [
    {
      title: '1-Page High-Converting Landing',
      desc: 'Hero section, key highlights, reviews, pricing, direct WhatsApp / contact lead form.'
    },
    {
      title: '2-3 Pages Showcase / Menu / Booking',
      desc: 'Homepage, full interactive menu or service catalog, and dedicated contact/reservation page.'
    },
    {
      title: '4-6 Pages Full Multi-Page',
      desc: 'Complete commercial presence: About story, multi-category galleries, service tiers, blog, contact.'
    }
  ];

  const timelineOptions = [
    { title: '24-48 Hours Express', desc: 'Turnkey live deployment within 2 business days' },
    { title: '3-5 Days Standard', desc: 'Detailed iterations, custom graphics & photography layout' },
    { title: 'Flexible / Next Month', desc: 'Planning ahead for upcoming business launch' }
  ];

  const generatedWhatsAppMsg = `Hello ${profile.name}! I completed your Portfolio Questionnaire on your 3D Notepad Studio:
- Style & Tier: ${answers.tier}
- Page Scope: ${answers.scope}
- Domain Inclusions: Domain Name Included in Price
- Maintenance Inclusions: 3 Months Free Service Included
- Delivery Timeline: ${answers.timeline}${answers.notes ? `\n- Custom Client Notes: ${answers.notes}` : ''}

I would like to get a quote and discuss commissioning this website build. Let's talk!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedWhatsAppMsg);
    setCopied(true);
    sound.playChime();
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#faf8f5] dark:bg-[#1c1917] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-[#ded5c2] dark:border-[#382f27] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#e5ddce] dark:border-[#2f2721] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-amber-500/10 text-amber-700 dark:text-amber-300 rounded-xl border border-amber-400/30">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif-book font-bold text-xl sm:text-2xl leading-tight">
                  Website Quote Calculator
                </h3>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  Turnkey builds • Domain name & 3 months maintenance included
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="px-6 pt-4 flex items-center justify-between text-xs font-mono text-stone-500">
            <span>Step {step} of 4</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-8 bg-amber-500'
                      : s < step
                      ? 'w-4 bg-emerald-500'
                      : 'w-4 bg-stone-300 dark:bg-stone-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Body */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif-book text-lg font-bold">1. Select Website Style & Tier</h4>
                  <p className="text-xs text-stone-500 mt-1">
                    How should your website feel to visitors and customers?
                  </p>
                </div>

                <div className="space-y-3">
                  {tierOptions.map(t => {
                    const isSelected = answers.tier.startsWith(t.title);
                    return (
                      <div
                        key={t.title}
                        onClick={() => {
                          sound.playClick();
                          setAnswers(a => ({ ...a, tier: `${t.title} (${t.examples})` }));
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm'
                            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm sm:text-base">{t.title}</span>
                          {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                          {t.desc}
                        </p>
                        <span className="text-[10px] font-mono text-amber-800 dark:text-amber-300 block mt-2">
                          Examples: {t.examples}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif-book text-lg font-bold">2. Choose Page Scope</h4>
                  <p className="text-xs text-stone-500 mt-1">
                    How many sections or individual pages does your brand require?
                  </p>
                </div>

                <div className="space-y-3">
                  {scopeOptions.map(s => {
                    const isSelected = answers.scope.startsWith(s.title);
                    return (
                      <div
                        key={s.title}
                        onClick={() => {
                          sound.playClick();
                          setAnswers(a => ({ ...a, scope: s.title }));
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm'
                            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm sm:text-base">{s.title}</span>
                          {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif-book text-lg font-bold">3. Turnaround & Delivery Timeline</h4>
                  <p className="text-xs text-stone-500 mt-1">
                    When do you need the finished live website deployed?
                  </p>
                </div>

                <div className="space-y-3">
                  {timelineOptions.map(tl => {
                    const isSelected = answers.timeline.startsWith(tl.title);
                    return (
                      <div
                        key={tl.title}
                        onClick={() => {
                          sound.playClick();
                          setAnswers(a => ({ ...a, timeline: tl.title }));
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm'
                            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm sm:text-base">{tl.title}</span>
                          {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                          {tl.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif-book text-lg font-bold">4. Custom Notes & Ready-to-Send Quote</h4>
                  <p className="text-xs text-stone-500 mt-1">
                    Add optional project details, logo, colors, or reference sites.
                  </p>
                </div>

                <textarea
                  rows={3}
                  value={answers.notes}
                  onChange={e => setAnswers(a => ({ ...a, notes: e.target.value }))}
                  placeholder="Optional: Enter your business name, existing social links, or specific features you'd like (e.g. Table reservation, PDF menu, WhatsApp ordering)..."
                  className="w-full p-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                {/* Summary Card */}
                <div className="p-4 bg-stone-100 dark:bg-[#201c19] rounded-2xl border border-stone-200 dark:border-stone-800 font-mono text-xs space-y-2">
                  <div className="font-bold text-stone-700 dark:text-stone-300 uppercase text-[10px] tracking-wider">
                    SPECIFICATION PREVIEW
                  </div>
                  <div className="text-stone-800 dark:text-stone-200">
                    <strong>Style:</strong> {answers.tier}
                  </div>
                  <div className="text-stone-800 dark:text-stone-200">
                    <strong>Scope:</strong> {answers.scope}
                  </div>
                  <div className="text-stone-800 dark:text-stone-200">
                    <strong>Timeline:</strong> {answers.timeline}
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    ✓ Custom domain registration included
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    ✓ 3 months free maintenance & updates included
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-5 sm:p-6 bg-stone-100 dark:bg-[#181513] border-t border-[#e5ddce] dark:border-[#2f2721] flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                onClick={() => {
                  sound.playClick();
                  setStep(s => s - 1);
                }}
                className="px-4 py-2 text-xs font-mono font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => {
                  sound.playClick();
                  setStep(s => s + 1);
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-mono font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <a
                  href={`${socials.whatsappUrl}?text=${encodeURIComponent(generatedWhatsAppMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
