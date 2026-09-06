import React, { useState, useRef, useEffect } from 'react';
import { Zap, Tag, Clock, MessageCircle, Send, Sparkles } from 'lucide-react';
import { ProfileDetails, ChatMessage } from '../types';
import { getSocialUrls } from '../data/profile';
import { sound } from '../utils/sound';

interface UnderDiarySectionProps {
  profile: ProfileDetails;
}

export const UnderDiarySection: React.FC<UnderDiarySectionProps> = ({ profile }) => {
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
  const chatBottomRef = useRef<HTMLDivElement>(null);

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
    if (lower.includes('pricing') || lower.includes('cost') || lower.includes('how much') || lower.includes('calculate')) {
      return `Pricing is strictly tailored according to your project scope: whether you need a Simple 1-page lead generation site, a 2-3 page showcase/menu, or a full multi-page Luxury brand experience. Every single project package includes your custom domain registration and 3 full months of free ongoing maintenance! Message me on WhatsApp for a fast, custom quote for your specific business.`;
    }
    if (lower.includes('domain') || lower.includes('maintenance')) {
      return `Yes! 100% of my builds include 1 year of custom domain registration (.com, .in, .store, etc.) PLUS 3 months of free service and maintenance for updating text, photos, seasonal specials, or operating hours. Zero surprise hidden fees.`;
    }
    if (lower.includes('hosting') || lower.includes('$0') || lower.includes('free')) {
      return `All websites are built with pure, lightning-fast modern frontend architectures (Vite, Next.js, React). They deploy to high-availability global edge CDNs (like Vercel Edge, Netlify, or Cloudflare) where continuous traffic costs $0/month forever.`;
    }
    if (lower.includes('turnaround') || lower.includes('delivery') || lower.includes('time') || lower.includes('how long')) {
      return `Most projects ship within 24 to 48 hours for 1-page builds, and 3 to 5 business days for full multi-page dining, commercial, or creative catalogs. We iterate in the open so you can test on your real mobile phone immediately.`;
    }
    if (lower.includes('logo') || lower.includes('colors') || lower.includes('custom') || lower.includes('brand')) {
      return `Absolutely! You can provide your existing brand assets (logo, font, palette, photos), or I can craft a complete cohesive aesthetic pairing (like gold-on-charcoal, athletic neon, or minimal editorial typography).`;
    }
    if (lower.includes('code') || lower.includes('source') || lower.includes('github') || lower.includes('repository')) {
      return `Yes! You receive complete, unminified source code in a clean GitHub repository with full ownership rights. No locked-in proprietary builders or restrictive site-builders.`;
    }
    return `Great question! I'd love to discuss that with you directly. Message me anytime on WhatsApp (${profile.whatsappFormatted}) or email me for immediate answers and project kickoff!`;
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
    }, 380);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 pt-4 sm:pt-8 pb-12 flex flex-col gap-6 select-text">
      {/* ========================================================================= */}
      {/* 1. THREE FEATURE VALUE PILLARS (Frontend Speed, $0 Hosting, 24-48h Delivery) */}
      {/* ========================================================================= */}
      <div className="w-full bg-white/95 dark:bg-[#1c1815]/95 border border-stone-200/90 dark:border-stone-800/90 rounded-2xl shadow-sm p-4 sm:p-5 backdrop-blur-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-200/80 dark:divide-stone-800/80">
          {/* Pillar 1: Pure Frontend Speed */}
          <div className="flex items-start gap-3 pt-2 md:pt-0">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
              <Zap className="w-4 h-4 fill-amber-500/20" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-serif-book font-bold text-sm text-stone-900 dark:text-stone-100">
                  Pure Frontend Speed
                </h4>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40 dark:border-amber-800/40 uppercase">
                  SUB-300MS
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                Zero database overhead, no server maintenance, and immune to typical CMS hacks.
              </p>
            </div>
          </div>

          {/* Pillar 2: $0 Lifetime Hosting */}
          <div className="flex items-start gap-3 pt-4 md:pt-0 md:pl-6">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-serif-book font-bold text-sm text-stone-900 dark:text-stone-100">
                  $0 Lifetime Hosting
                </h4>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-800/40 uppercase">
                  ZERO FEES
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                Deploy free on Vercel, Netlify, or GitHub Pages with your custom domain. Full source code delivered.
              </p>
            </div>
          </div>

          {/* Pillar 3: 24-48h Turnkey Delivery */}
          <div className="flex items-start gap-3 pt-4 md:pt-0 md:pl-6">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-serif-book font-bold text-sm text-stone-900 dark:text-stone-100">
                  24-48h Turnkey Delivery
                </h4>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300/40 dark:border-rose-800/40 uppercase">
                  FAST SHIP
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                Complete responsive websites ready to generate leads, bookings, and customer sales immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ASK SATYAJIT ABOUT CUSTOM WEB BUILDS (Embedded Interactive Chat Panel) */}
      {/* ========================================================================= */}
      <div className="w-full bg-white dark:bg-[#1c1815] border border-stone-200/90 dark:border-stone-800/90 rounded-3xl p-4 sm:p-6 lg:p-7 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#854d0e] dark:bg-[#92400e] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-book font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  Ask {profile.name} About Custom Web Builds
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Online" />
              </div>
              <p className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-0.5">
                tailored pricing by tier & page count • domain & 3 months service included
              </p>
            </div>
          </div>

          <a
            id="under-diary-whatsapp-btn"
            href={`${socials.whatsappUrl}?text=${encodeURIComponent(
              `Hi ${profile.name}! I would like to discuss custom website builds and get a quote.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-xs font-mono font-bold shadow-xs hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>

        {/* Popular Questions Chips */}
        <div className="pt-4 pb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-stone-400 dark:text-stone-500 mb-2 block">
            POPULAR QUESTIONS:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-full text-xs font-mono bg-stone-100 dark:bg-[#26201b] hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200 border border-stone-200 dark:border-stone-700/80 hover:border-amber-300 dark:hover:border-amber-700/60 transition-all cursor-pointer text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Thread */}
        <div className="my-4 min-h-[160px] max-h-[360px] overflow-y-auto space-y-3 p-3.5 sm:p-4 bg-stone-50/80 dark:bg-[#14110f] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 overscroll-contain">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-tr-xs max-w-lg shadow-xs'
                    : 'bg-white dark:bg-[#221c17] text-stone-800 dark:text-stone-200 border border-stone-200/90 dark:border-stone-800/90 rounded-tl-xs max-w-2xl shadow-xs'
                }`}
              >
                <p>{msg.text}</p>
              </div>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            id="under-diary-chat-input"
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask me anything about custom website builds, domain inclusions, or timelines..."
            className="flex-1 px-4 py-2.5 bg-stone-50 dark:bg-[#14110f] border border-stone-300 dark:border-stone-700/80 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono font-bold text-xs shadow-xs transition-all ${
              inputText.trim()
                ? 'bg-rose-500 hover:bg-rose-600 text-white cursor-pointer active:scale-95'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
            }`}
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
