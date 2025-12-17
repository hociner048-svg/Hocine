
export type Tone = 'funny' | 'professional' | 'street' | 'viral' | 'casual';
export type DetailLevel = 'short' | 'medium' | 'long';
export type Category = 'TikTok' | 'Business' | 'Gaming' | 'Lifestyle' | 'Study';

export interface PromptRequest {
  objective: string;
  subject: string;
  tone: Tone;
  detail: DetailLevel;
  category: Category;
}

export interface HistoryItem extends PromptRequest {
  id: string;
  generatedPrompt: string;
  timestamp: number;
}

export interface Template {
  id: string;
  name: string;
  category: Category;
  objective: string;
  icon: string;
  isCustom?: boolean;
}

export interface OwnerStats {
  totalSales: number;
  activeSubscribers: number;
  netRevenue: number;
  pendingPayout: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  promptsCount: number;
  referralCode: string;
  ownerStats: OwnerStats;
  payoutEmail?: string;
  payoutMethod?: 'card' | 'bank' | 'paypal';
  payoutCardLast4?: string;
  subscriptionId?: string;
  subscriptionStatus?: 'active' | 'past_due' | 'canceled';
}
