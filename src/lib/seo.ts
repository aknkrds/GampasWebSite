// SEO helper functions for Next.js metadata and schema.org

import { Metadata } from 'next';
import React from 'react';

export interface MetaConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  siteName?: string;
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface ProductSchema {
  name: string;
  description: string;
  image: string[];
  brand: string;
  manufacturer?: string;
  category?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// Build Next.js metadata object
export function buildMeta(config: MetaConfig): Metadata {
  const {
    title,
    description,
    image,
    url,
    type = 'website',
    locale = 'tr_TR',
    siteName = 'Gampaş Ambalaj'
  } = config;

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gampas.com'),
    alternates: {
      canonical: url,
      languages: {
        'tr': '/tr',
        'en': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale,
      type,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
      creator: '@gampas',
      site: '@gampas',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };

  return metadata;
}

// Generate Organization schema.org JSON-LD
export function buildOrganizationSchema(org: OrganizationSchema): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    address: org.address ? {
      '@type': 'PostalAddress',
      streetAddress: org.address.streetAddress,
      addressLocality: org.address.addressLocality,
      addressRegion: org.address.addressRegion,
      postalCode: org.address.postalCode,
      addressCountry: org.address.addressCountry,
    } : undefined,
    contactPoint: org.contactPoint ? {
      '@type': 'ContactPoint',
      telephone: org.contactPoint.telephone,
      contactType: org.contactPoint.contactType,
      email: org.contactPoint.email,
    } : undefined,
    sameAs: org.sameAs,
  };

  return JSON.stringify(schema, null, 2);
}

// Generate Product schema.org JSON-LD
export function buildProductSchema(product: ProductSchema): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    manufacturer: product.manufacturer ? {
      '@type': 'Organization',
      name: product.manufacturer,
    } : undefined,
    category: product.category,
    offers: product.offers ? {
      '@type': 'Offer',
      price: product.offers.price,
      priceCurrency: product.offers.priceCurrency,
      availability: product.offers.availability || 'https://schema.org/InStock',
      url: product.offers.url,
    } : undefined,
  };

  return JSON.stringify(schema, null, 2);
}

// Generate BreadcrumbList schema.org JSON-LD
export function buildBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return JSON.stringify(schema, null, 2);
}

// Generate WebSite schema.org JSON-LD with search action
export function buildWebSiteSchema(name: string, url: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return JSON.stringify(schema, null, 2);
}

// Default organization schema for Gampaş
export const GAMPAS_ORGANIZATION: OrganizationSchema = {
  name: 'Gampaş Ambalaj',
  url: 'https://gampas.com',
  logo: 'https://gampas.com/logo/GAMPAS-LOGO.png',
  description: 'Sürdürülebilir ambalaj çözümleri konusunda uzman, çevre dostu ve yenilikçi ürünler sunan lider ambalaj şirketi.',
  address: {
    streetAddress: 'Organize Sanayi Bölgesi',
    addressLocality: 'İstanbul',
    addressRegion: 'İstanbul',
    postalCode: '34000',
    addressCountry: 'TR',
  },
  contactPoint: {
    telephone: '+90-212-XXX-XXXX',
    contactType: 'customer service',
    email: 'info@gampas.com',
  },
  sameAs: [
    'https://www.facebook.com/gampas',
    'https://www.linkedin.com/company/gampas',
    'https://www.instagram.com/gampas',
  ],
};

// Helper to inject JSON-LD script
export function createJsonLdScript(jsonLd: string): React.ReactElement {
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: jsonLd }
  });
}

// SEO constants
export const SEO_DEFAULTS = {
  siteName: 'Gampaş Ambalaj',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://gampas.com',
  defaultTitle: 'Gampaş Ambalaj - Sürdürülebilir Ambalaj Çözümleri',
  defaultDescription: 'Çevre dostu, sürdürülebilir ve yenilikçi ambalaj çözümleri. Gıda, kozmetik, sağlık ve endüstriyel sektörlere özel ambalaj ürünleri.',
  defaultImage: '/logo/GAMPAS-LOGO.png',
  twitterHandle: '@gampas',
};

export function generateSitemap(pages: Array<{ url: string; lastModified?: Date; changeFreq?: string; priority?: number }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gampas.com';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${(page.lastModified || new Date()).toISOString()}</lastmod>
    <changefreq>${page.changeFreq || 'monthly'}</changefreq>
    <priority>${page.priority || 0.5}</priority>
  </url>`).join('')}
</urlset>`;
}

export function generateRobotsTxt() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gampas.com';
  
  return `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`;
}