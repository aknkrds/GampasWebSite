// Global Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Product Types
export interface Product extends BaseEntity {
  name: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  isRecyclable: boolean;
  sustainability: {
    recyclable: boolean;
    biodegradable: boolean;
    carbonFootprint: number;
  };
}

// CMS Types
export interface CMSImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: CMSImage;
}

export interface CompanyInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

// Internationalization Types
export type Locale = 'tr' | 'en';

export interface LocalizedContent {
  tr: string;
  en: string;
}

// Analytics Types
export interface GTMEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined; // Allow additional properties
}

// Navigation Types
export interface NavigationItem {
  label: LocalizedContent;
  href: string;
  children?: NavigationItem[];
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
  consent: boolean;
}