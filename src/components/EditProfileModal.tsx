import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, RotateCcw, UserCheck, Save } from 'lucide-react';
import { ProfileDetails } from '../types';
import { defaultProfile, resetProfileToDefault, saveStoredProfile } from '../data/profile';
import { sound } from '../utils/sound';

interface EditProfileModalProps {
  currentProfile: ProfileDetails;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: ProfileDetails) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  currentProfile,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<ProfileDetails>(currentProfile);
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof ProfileDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredProfile(formData);
    onSave(formData);
    sound.playChime();
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    const def = resetProfileToDefault();
    setFormData(def);
    onSave(def);
    sound.playClick();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#fcfbf9] dark:bg-[#1a1715] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-300 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-100 dark:bg-[#201c19]">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-amber-500/10 text-amber-800 dark:text-amber-300 rounded-xl border border-amber-400/30">
                <UserCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif-book font-bold text-xl leading-tight">
                  Personalize My Portfolio Details
                </h3>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  Update your contact, location, and social links
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

          {/* Form */}
          <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
            {savedAlert && (
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-400 text-emerald-900 dark:text-emerald-200 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Your details have been saved and applied to the notebook!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-semibold uppercase text-[10px]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-semibold uppercase text-[10px]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-semibold uppercase text-[10px]">
                  WhatsApp Display Number
                </label>
                <input
                  type="text"
                  value={formData.whatsappFormatted}
                  onChange={e => handleChange('whatsappFormatted', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-semibold uppercase text-[10px]">
                  WhatsApp Raw Digits (for wa.me link)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={e => handleChange('whatsappNumber', e.target.value)}
                  placeholder="919876543210"
                  className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-semibold uppercase text-[10px]">
                LinkedIn Profile URL or Handle
              </label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={e => handleChange('linkedin', e.target.value)}
                placeholder="https://www.linkedin.com/in/satyajit"
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-semibold uppercase text-[10px]">
                Location & Timezone
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e => handleChange('location', e.target.value)}
                placeholder="Bhubaneswar, Odisha • IN"
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-semibold uppercase text-[10px]">
                Hero Bio Description
              </label>
              <textarea
                rows={2}
                value={formData.bio}
                onChange={e => handleChange('bio', e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-semibold uppercase text-[10px]">
                Sticky Note Availability Message
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={e => handleChange('availability', e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Details
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
