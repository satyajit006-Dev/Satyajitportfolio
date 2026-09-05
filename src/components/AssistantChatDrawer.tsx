import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { ProfileDetails, ChatMessage } from '../types';
import { getSocialUrls } from '../data/profile';
import { sound } from '../utils/sound';

interface AssistantChatDrawerProps {
  profile: ProfileDetails;
  isOpen: boolean;
  onClose: () => void;
}

export const AssistantChatDrawer: React.FC<AssistantChatDrawerProps> = ({
  profile,
  isOpen,
  onClose
}) => {
  const socials = getSocialUrls(profile);

  const initialMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'assistant',
      text: `👋 Hi! I am ${profile.name}. I craft and ship ultra-fast, modern frontend websites. Pricing is tailored based on website tier (Luxury, Premium, or Simple) and page count — and every build includes a custom domain name and 3 months of free service & maintenance! Ask me anything about quotes, delivery in 24-48h, $0/mo hosting, or custom designs!`,
      time: 'Just now'
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'How is pricing calculated?',
    'Is a domain name and maintenance included?',
    'How do I host it for $0 per month?',
    'What is the turnaround delivery time?',
    'Can you add my custom logo and colors?',
    'Do I get the complete full source code?'
  ];

  const getAssistantAnswer = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes('pricing') || lower.includes('cost') || lower.includes('how much')) {
      return `Pricing is strictly tailored according to the scope: whether you need a Simple 1-page lead gen site, a 2-3 page showcase/menu, or a full multi-page Luxury brand experience. Every project package includes your custom domain registration and 3 full months of free maintenance! Ping me on WhatsApp for a fast tailored quote for your specific brand.`;
    }
    if (lower.includes('domain') || lower.includes('maintenance')) {
      return `Yes! 100% of my builds include 1 year of custom domain name registration (.com, .in, .store, etc.) PLUS 3 months of free service and maintenance for updating text, photos, specials, or hours. Zero surprise hidden fees.`;
    }
    if (lower.includes('hosting') || lower.includes('$0')) {
      return `All websites are built with pure, lightning-fast static and edge rendering technologies (Vite, Next.js, React). They deploy to high-availability global CDNs (like Vercel Edge / Cloudflare) where high traffic costs $0/month forever.`;
    }
    if (lower.includes('turnaround') || lower.includes('delivery') || lower.includes('time')) {
      return `Most projects ship within 24 to 48 hours for 1-page builds, and 3 to 5 business days for full multi-page dining, gym, or commercial catalogs. We iterate in the open so you test on a real phone immediately.`;
    }
    if (lower.includes('logo') || lower.includes('colors') || lower.includes('custom')) {
      return `Absolutely! You can provide your existing brand assets (logo, font, palette, photos), or I can craft a complete cohesive aesthetic pairing (like gold-on-charcoal, athletic neon, or minimal editorial).`;
    }
    if (lower.includes('code') || lower.includes('source code')) {
      return `Yes! You receive complete, unminified source code in a clean GitHub repository with full ownership rights. No locked-in proprietary builders or restrictive site-builders.`;
    }
    return `Great question! I'd love to discuss that with you directly. Message me anytime on WhatsApp (${profile.whatsappFormatted}) or via email (${profile.email}) for immediate answers and project kickoff!`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    sound.playClick();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      sound.playChime();
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: getAssistantAnswer(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end bg-stone-950/60 backdrop-blur-xs">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-lg h-full bg-[#fcfbf9] dark:bg-[#1a1715] text-stone-900 dark:text-stone-100 shadow-2xl border-l border-stone-300 dark:border-stone-800 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-100 dark:bg-[#201c19]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-700 dark:text-amber-300 rounded-xl border border-amber-400/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-serif-book font-bold text-base sm:text-lg">
                  <span>Ask {profile.name} About Web Builds</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  Instant answers on pricing, hosting & deliverables
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={`${socials.whatsappUrl}?text=${encodeURIComponent(`Hi ${profile.name}! I would like to chat directly about a website build.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-mono font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-stone-950 font-medium rounded-br-none'
                      : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] font-mono text-stone-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick FAQ Pills */}
          <div className="p-3 bg-stone-50 dark:bg-[#1c1917] border-t border-stone-200 dark:border-stone-800">
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-2 font-semibold">
              Suggested Questions:
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 text-[11px] font-mono bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-lg transition-all text-left cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white dark:bg-[#181513] border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder={`Ask ${profile.name} about timeline, pricing, hosting...`}
              className="flex-1 p-2.5 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-bold transition-all active:scale-95 cursor-pointer"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
