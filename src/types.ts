export interface ProjectSpec {
  lighthouseScore: number;
  loadTime: string;
  responsive: string;
  hostingCost: string;
  domainIncluded: string;
  serviceIncluded: string;
}

export interface LiveHighlight {
  title: string;
  desc: string;
  metric: string;
}

export interface LiveDemoData {
  headline: string;
  subheadline: string;
  theme: 'light' | 'dark' | 'warm' | 'clean';
  accentHex: string;
  highlights: LiveHighlight[];
}

export interface CardCoverArt {
  type: string;
  title: string;
  subtitle: string;
  accentColor: string;
  bgPattern: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  tier: 'Luxury' | 'Premium' | 'Simple' | 'Standard';
  pages: string;
  priceNote: string;
  liveUrl: string;
  saleBadge: string;
  description: string;
  features: string[];
  techStack: string[];
  specs: ProjectSpec;
  cardColor: string;
  cardCoverArt: CardCoverArt;
  liveDemoData: LiveDemoData;
}

export interface ProfileDetails {
  name: string;
  title: string;
  tagline: string;
  email: string;
  whatsappFormatted: string;
  whatsappNumber: string;
  linkedin: string;
  location: string;
  timezone: string;
  bio: string;
  shortNote: string;
  availability: string;
}

export interface TabItem {
  id: string;
  label: string;
  page: number;
  color: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export interface QuestionnaireAnswers {
  tier: string;
  scope: string;
  timeline: string;
  notes: string;
}
