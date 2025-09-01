import { Locale, LocalizedContent } from '@/types';

export const locales: Locale[] = ['tr', 'en'];
export const defaultLocale: Locale = 'tr';

// Dictionary type for translations
export interface Dictionary {
  [key: string]: string | Dictionary;
}

// Translation dictionaries
export const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  tr: () => import('@/dictionaries/tr.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.warn(`Failed to load dictionary for locale: ${locale}`);
    return await dictionaries[defaultLocale]();
  }
}

// Helper function to get nested translation
export function getTranslation(dict: Dictionary, key: string): string {
  const keys = key.split('.');
  let value: any = dict;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// Helper function to get localized content
export function getLocalizedContent(content: LocalizedContent, locale: Locale): string {
  return content[locale] || content[defaultLocale] || '';
}

// URL helpers
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path}`;
}

export function removeLocaleFromPath(path: string): { locale: Locale; path: string } {
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    const locale = segments[0] as Locale;
    const pathWithoutLocale = '/' + segments.slice(1).join('/');
    return { locale, path: pathWithoutLocale || '/' };
  }
  
  return { locale: defaultLocale, path };
}

// Locale detection
export function detectLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return defaultLocale;
  
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase());
  
  for (const lang of languages) {
    if (locales.includes(lang as Locale)) {
      return lang as Locale;
    }
    
    // Check for language without region (e.g., 'en' from 'en-US')
    const langWithoutRegion = lang.split('-')[0];
    if (locales.includes(langWithoutRegion as Locale)) {
      return langWithoutRegion as Locale;
    }
  }
  
  return defaultLocale;
}

// Format date according to locale
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Format number according to locale
export function formatNumber(number: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US').format(number);
}

// Format currency according to locale
export function formatCurrency(amount: number, locale: Locale, currency = 'TRY'): string {
  return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}