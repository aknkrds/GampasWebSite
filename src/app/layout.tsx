import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { buildMeta, buildOrganizationSchema, buildWebSiteSchema, GAMPAS_ORGANIZATION, SEO_DEFAULTS, createJsonLdScript } from "@/lib/seo";
import { ANALYTICS_CONFIG } from "@/lib/analytics";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO metadata using helper function
export const metadata: Metadata = buildMeta({
  title: SEO_DEFAULTS.defaultTitle,
  description: SEO_DEFAULTS.defaultDescription,
  image: SEO_DEFAULTS.defaultImage,
  url: SEO_DEFAULTS.siteUrl,
  siteName: SEO_DEFAULTS.siteName,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate JSON-LD schemas
  const organizationSchema = buildOrganizationSchema(GAMPAS_ORGANIZATION);
  const websiteSchema = buildWebSiteSchema(SEO_DEFAULTS.siteName, SEO_DEFAULTS.siteUrl);

  return (
    <html lang="tr">
      <head>
        {/* JSON-LD Structured Data */}
        {createJsonLdScript(organizationSchema)}
        {createJsonLdScript(websiteSchema)}
        
        {/* Google Analytics with Consent Mode v2 */}
        {ANALYTICS_CONFIG.gaId && (
          <>
            <Script
              id="gtag-consent"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  
                  // Set default consent mode
                  gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied',
                    'functionality_storage': 'granted',
                    'personalization_storage': 'denied',
                    'security_storage': 'granted',
                    'wait_for_update': 500,
                  });
                `,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ANALYTICS_CONFIG.gaId}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Google Tag Manager */}
        {ANALYTICS_CONFIG.gtmId && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.gtmId}');
              `,
            }}
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM NoScript fallback */}
        {ANALYTICS_CONFIG.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        
        <Header />
        {children}
      </body>
    </html>
  );
}
