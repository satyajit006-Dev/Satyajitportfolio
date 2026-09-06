import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { ProfileDetails } from '../types';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileDetails;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl max-h-[88vh] bg-[#fcfbf9] dark:bg-[#1c1815] text-stone-900 dark:text-stone-100 rounded-2xl shadow-2xl border border-stone-300 dark:border-stone-800 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-100/70 dark:bg-[#231e1a]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-xl border border-amber-400/30">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-book font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                  Privacy Policy
                </h3>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  Last Updated: September 6, 2026 • {profile.name}'s Portfolio
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
            {/* Intro Notice */}
            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <p className="text-xs leading-relaxed">
                Welcome to <strong>{profile.name}'s Portfolio</strong>. Your privacy is important to me. This Privacy Policy explains what information may be collected when you visit this website, how it may be used, and how it is protected. By using this website, you acknowledge the practices described below.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                1. Information I Collect
              </h4>
              <p>
                I may receive personal information that you voluntarily provide when you contact me through this portfolio. This may include:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600 dark:text-stone-400">
                <li>Your name</li>
                <li>Email address</li>
                <li>Project or business details</li>
                <li>Your message or project brief</li>
                <li>Any other information you choose to include in your enquiry</li>
              </ul>
              <p className="pt-1">
                You can browse the portfolio without directly providing personal information.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                2. Contact Form
              </h4>
              <p>
                The Contact section of this portfolio allows visitors to send a message or project enquiry. Information submitted through the contact form is used to:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600 dark:text-stone-400">
                <li>Respond to your enquiry</li>
                <li>Understand your project requirements</li>
                <li>Discuss website design and development services</li>
                <li>Prepare project estimates or proposals</li>
                <li>Communicate with you regarding potential or ongoing work</li>
              </ul>
              <p className="pt-1 font-medium text-amber-800 dark:text-amber-300">
                Please do not submit passwords, payment-card information, government identification, or other highly sensitive information through the contact form.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                3. Email Communication
              </h4>
              <p>
                If you contact me directly by email, I may retain your email address and the contents of your communication in order to respond to you and continue the relevant conversation. Your email information will not knowingly be sold or rented to third parties for advertising purposes.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                4. WhatsApp Communication
              </h4>
              <p>
                This portfolio provides a direct WhatsApp contact option. If you choose to contact me through WhatsApp, your communication will be handled through WhatsApp and is subject to WhatsApp's own privacy policy and terms. I do not control how WhatsApp processes information on its platform.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                5. Analytics and Website Usage
              </h4>
              <p>
                This website may use analytics or similar technologies to understand general website usage and improve the portfolio. Where such services are enabled, information may include:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600 dark:text-stone-400">
                <li>Device and browser type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Approximate location</li>
                <li>Referring website</li>
                <li>Date and time of visits</li>
                <li>General interaction with the website</li>
              </ul>
              <p className="pt-1">
                This information may be used to monitor website performance, identify technical issues, and improve the overall visitor experience.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                6. Cookies and Local Storage
              </h4>
              <p>
                The website may use cookies, local storage, session storage, or similar browser technologies to support website functionality and remember certain preferences (e.g., sound effects and color theme). Third-party services integrated into the website may also use their own cookies or similar technologies. You can control or remove cookies through your browser settings. Disabling certain browser technologies may affect some website functionality.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                7. Hosting and Technical Information
              </h4>
              <p>
                This portfolio is hosted using third-party web infrastructure. When you visit the website, technical information such as your IP address, browser type, device information, request time, and related server information may be processed automatically by the hosting or security infrastructure for delivery, security, performance monitoring, and abuse prevention.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                8. External Links
              </h4>
              <p>
                The portfolio contains links to external websites and platforms, including GitHub, LinkedIn, WhatsApp, live project websites, and other third-party services. When you click an external link, you leave this website. Those websites have their own privacy policies and terms, which may differ from this Privacy Policy. I am not responsible for the privacy practices, content, security, or policies of external websites.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                9. Portfolio Projects
              </h4>
              <p>
                The Work section contains demonstrations and links to websites and projects created by me. Some of these projects may belong to clients or other organizations. Any personal information collected by those websites is governed by the privacy policies applicable to those individual websites and is not covered by this Privacy Policy.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                10. How I Use Information
              </h4>
              <p>
                Information received through this portfolio may be used to respond to enquiries, discuss freelance and contract opportunities, understand project requirements, prepare quotations or proposals, communicate with prospective or existing clients, improve website user experience, maintain website security, and meet applicable legal obligations.
              </p>
            </div>

            {/* Section 11 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                11. How Information Is Shared
              </h4>
              <p>
                I do not knowingly sell or rent your personal information. Information may be processed by third-party services when necessary to operate the website or provide communication functionality, including hosting providers, email services, contact-form services, analytics providers, and communication platforms.
              </p>
            </div>

            {/* Section 12 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                12. Data Retention
              </h4>
              <p>
                Information provided through the contact form or direct communication may be retained for as long as reasonably necessary to respond to your enquiry, maintain an ongoing professional conversation, manage a project, maintain appropriate business records, or comply with legal obligations. You may request deletion of your information where applicable.
              </p>
            </div>

            {/* Section 13 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                13. Data Security
              </h4>
              <p>
                Reasonable measures are taken to protect information submitted through this website. However, no website, internet connection, email service, or online transmission can be guaranteed to be completely secure. For this reason, please avoid submitting confidential or highly sensitive information through the website's contact form.
              </p>
            </div>

            {/* Section 14 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                14. Your Privacy Rights
              </h4>
              <p>
                Depending on your location and applicable law, you may have the right to request access to your personal information, request correction of inaccurate information, request deletion of your information, object to certain forms of processing, withdraw consent where applicable, or ask questions about how your information is handled. To exercise an applicable privacy right, please contact me using the contact information provided on this website.
              </p>
            </div>

            {/* Section 15 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                15. Children's Privacy
              </h4>
              <p>
                This website is not specifically intended for children, and I do not knowingly collect personal information from children.
              </p>
            </div>

            {/* Section 16 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                16. Changes to This Privacy Policy
              </h4>
              <p>
                This Privacy Policy may be updated from time to time to reflect changes to the website, services, technologies, or applicable legal requirements. Any changes will be published on this page with an updated Last Updated date.
              </p>
            </div>

            {/* Section 17 */}
            <div className="space-y-1.5">
              <h4 className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                17. Contact
              </h4>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your information, please contact me through the contact options available on this portfolio.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-[#181412] flex items-center justify-between">
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              © 2026 {profile.name} — 3D Notepad Studio
            </span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-mono font-bold text-xs rounded-xl shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Close Policy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
