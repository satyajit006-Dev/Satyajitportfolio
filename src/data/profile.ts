import { ProfileDetails } from '../types';

export const defaultProfile: ProfileDetails = {
  name: 'Satyajit',
  title: 'Satyajit | 3D Notepad Portfolio',
  tagline: 'SOFTWARE BUILDER • BHUBANESWAR',
  email: 'satyajit2006@gmail.com',
  whatsappFormatted: '+91 9692007455',
  whatsappNumber: '919692007455',
  linkedin: 'https://www.linkedin.com/in/satyajit',
  location: 'Bhubaneswar, Odisha • IN',
  timezone: 'IST • UTC+5:30',
  bio: "I'm Satyajit — I design and build fast, cinematic sites for restaurants, gyms, trades and retail brands. Thirteen of them are live below.",
  shortNote: "Notes, sketches & shipped work — thirteen websites for real businesses, all live and clickable.",
  availability: "Open for freelance & contract work — let's build something."
};

const STORAGE_KEY = 'satyajit_portfolio_profile_v2';

export function getStoredProfile(): ProfileDetails {
  if (typeof window === 'undefined') return defaultProfile;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return { ...defaultProfile, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load stored profile', e);
  }
  return defaultProfile;
}

export function saveStoredProfile(profile: ProfileDetails): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function resetProfileToDefault(): ProfileDetails {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear profile', e);
  }
  return defaultProfile;
}

export function getSocialUrls(profile: ProfileDetails) {
  const cleanPhone = profile.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanLinkedin = (profile.linkedin || '').trim();
  const linkedinUrl = cleanLinkedin.startsWith('http')
    ? cleanLinkedin
    : `https://www.linkedin.com/in/${cleanLinkedin.replace(/^@/, '')}`;

  return {
    whatsappUrl: `https://wa.me/${cleanPhone}`,
    linkedinUrl,
    mailTo: `mailto:${profile.email}`
  };
}
