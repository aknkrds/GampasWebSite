// Google Analytics and GTM helper functions

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export interface TrackEventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean | undefined>;
}

export interface ConsentSettings {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  security_storage: 'granted' | 'denied';
}

// Initialize Google Tag Manager
export function initGoogleTagManager(id: string): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // GTM script injection
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);

  // Initialize GTM
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  console.log(`Google Tag Manager initialized with ID: ${id}`);
}

// Initialize Google Analytics with Consent Mode v2
export function initGoogleAnalytics(measurementId: string, defaultConsent?: Partial<ConsentSettings>): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  
  window.gtag = gtag;

  // Set default consent mode
  if (defaultConsent) {
    gtag('consent', 'default', {
      ad_storage: defaultConsent.ad_storage || 'denied',
      analytics_storage: defaultConsent.analytics_storage || 'denied',
      functionality_storage: defaultConsent.functionality_storage || 'granted',
      personalization_storage: defaultConsent.personalization_storage || 'denied',
      security_storage: defaultConsent.security_storage || 'granted',
      wait_for_update: 500,
    });
  }

  // Load Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Configure Google Analytics
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log(`Google Analytics initialized with ID: ${measurementId}`);
}

// Track custom events
export function trackEvent(name: string, params: TrackEventParams): void {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Analytics not initialized');
    return;
  }

  window.gtag('event', name, {
    event_category: params.category,
    event_label: params.label,
    value: params.value,
    ...params.custom_parameters,
  });

  console.log('Event tracked:', { name, params });
}

// Update consent settings
export function updateConsent(consentSettings: Partial<ConsentSettings>): void {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Analytics not initialized');
    return;
  }

  window.gtag('consent', 'update', consentSettings);
  console.log('Consent updated:', consentSettings);
}

// Track page views
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Analytics not initialized');
    return;
  }

  window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  } as Record<string, unknown>);

  console.log('Page view tracked:', { url, title });
}

// Cookie banner integration example for Consent Mode v2
export class ConsentManager {
  private static instance: ConsentManager;
  private consentGiven: boolean = false;
  private consentSettings: ConsentSettings = {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  };

  private constructor() {}

  public static getInstance(): ConsentManager {
    if (!ConsentManager.instance) {
      ConsentManager.instance = new ConsentManager();
    }
    return ConsentManager.instance;
  }

  // Check if consent has been given
  public hasConsent(): boolean {
    if (typeof window === 'undefined') return false;
    
    const consent = localStorage.getItem('cookie-consent');
    return consent === 'accepted';
  }

  // Accept all cookies
  public acceptAll(): void {
    this.consentSettings = {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted',
    };
    
    this.saveConsent('accepted');
    updateConsent(this.consentSettings);
  }

  // Accept only necessary cookies
  public acceptNecessary(): void {
    this.consentSettings = {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
    };
    
    this.saveConsent('necessary');
    updateConsent(this.consentSettings);
  }

  // Custom consent settings
  public setCustomConsent(settings: Partial<ConsentSettings>): void {
    this.consentSettings = { ...this.consentSettings, ...settings };
    this.saveConsent('custom');
    updateConsent(this.consentSettings);
  }

  // Get current consent settings
  public getConsentSettings(): ConsentSettings {
    return { ...this.consentSettings };
  }

  // Save consent to localStorage
  private saveConsent(type: 'accepted' | 'necessary' | 'custom'): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('cookie-consent', type);
    localStorage.setItem('cookie-consent-settings', JSON.stringify(this.consentSettings));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    this.consentGiven = true;
  }

  // Load consent from localStorage
  public loadConsent(): void {
    if (typeof window === 'undefined') return;
    
    const consent = localStorage.getItem('cookie-consent');
    const settings = localStorage.getItem('cookie-consent-settings');
    
    if (consent && settings) {
      this.consentGiven = true;
      this.consentSettings = JSON.parse(settings);
      updateConsent(this.consentSettings);
    }
  }

  // Reset consent (for testing or user request)
  public resetConsent(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-settings');
    localStorage.removeItem('cookie-consent-date');
    
    this.consentGiven = false;
    this.consentSettings = {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
    };
  }
}

// Predefined event tracking functions
export const Analytics = {
  // E-commerce events
  trackPurchase: (transactionId: string, value: number, currency: string = 'TRY') => {
    trackEvent('purchase', {
      action: 'purchase',
      category: 'ecommerce',
      value,
      custom_parameters: {
        transaction_id: transactionId,
        currency,
      },
    });
  },

  // Product events
  trackProductView: (productId: string, productName: string, category?: string) => {
    trackEvent('view_item', {
      action: 'view',
      category: 'product',
      label: productName,
      custom_parameters: {
        item_id: productId,
        item_name: productName,
        item_category: category,
      },
    });
  },

  // User engagement
  trackFormSubmit: (formName: string) => {
    trackEvent('form_submit', {
      action: 'submit',
      category: 'engagement',
      label: formName,
    });
  },

  trackDownload: (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      action: 'download',
      category: 'engagement',
      label: fileName,
      custom_parameters: {
        file_extension: fileType,
      },
    });
  },

  trackSearch: (searchTerm: string, resultsCount?: number) => {
    trackEvent('search', {
      action: 'search',
      category: 'engagement',
      label: searchTerm,
      custom_parameters: {
        search_term: searchTerm,
        results_count: resultsCount,
      },
    });
  },

  // Navigation events
  trackOutboundLink: (url: string, linkText?: string) => {
    trackEvent('click', {
      action: 'outbound_link',
      category: 'navigation',
      label: linkText || url,
      custom_parameters: {
        outbound_url: url,
      },
    });
  },
};

// Analytics configuration
export const ANALYTICS_CONFIG = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  defaultConsent: {
    ad_storage: 'denied' as const,
    analytics_storage: 'denied' as const,
    functionality_storage: 'granted' as const,
    personalization_storage: 'denied' as const,
    security_storage: 'granted' as const,
  },
};