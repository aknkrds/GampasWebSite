'use client';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Analytics } from '@/lib/analytics';

interface FooterProps {
  companyName: string;
  description: string;
  quickLinksTitle: string;
  followUsTitle: string;
  copyright: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface QuickLink {
  name: string;
  href: string;
}

export default function Footer({
  companyName,
  description,
  quickLinksTitle,
  followUsTitle,
  copyright,
  address,
  phone,
  email,
  workingHours,
}: FooterProps) {
  const socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/gampas',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/gampas',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/gampas',
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/gampas',
      icon: Twitter,
    },
  ];

  const quickLinks: QuickLink[] = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Ürünler', href: '/products' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'Sürdürülebilirlik', href: '/sustainability' },
    { name: 'İletişim', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  const handleSocialClick = (platform: string, href: string) => {
    Analytics.trackOutboundLink(href, platform);
  };

  const handleQuickLinkClick = (linkName: string, href: string) => {
    Analytics.trackOutboundLink(href, linkName);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo/GAMPAS-LOGO-BEYAZ.png"
                alt={companyName}
                width={150}
                height={52}
                className="mb-4"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 leading-relaxed">{address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a
                  href={`tel:${phone}`}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  {phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">{quickLinksTitle}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                    onClick={() => handleQuickLinkClick(link.name, link.href)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Working Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6">{followUsTitle}</h3>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-gray-600 text-gray-300 hover:bg-green-600 hover:border-green-600 hover:text-white transition-all"
                    onClick={() => handleSocialClick(social.name, social.href)}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </Button>
                );
              })}
            </div>

            {/* Working Hours */}
            <div>
              <h4 className="font-semibold mb-2 text-green-400">Çalışma Saatleri</h4>
              <p className="text-gray-300 text-sm">{workingHours}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">{copyright}</p>
          
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              Kullanım Şartları
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-green-600">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Bültenimize Abone Olun</h3>
              <p className="text-green-100">Sürdürülebilirlik ve yenilikler hakkında güncel bilgiler alın</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 md:w-64 px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-6">
                Abone Ol
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}