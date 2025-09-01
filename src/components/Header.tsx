'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface HeaderProps {
  homeText?: string;
  productsText?: string;
  aboutText?: string;
  sustainabilityText?: string;
  contactText?: string;
  downloadsText?: string;
}

export default function Header({
  homeText = 'Ana Sayfa',
  productsText = 'Ürünler',
  aboutText = 'Hakkımızda',
  sustainabilityText = 'Sürdürülebilirlik',
  contactText = 'İletişim',
  downloadsText = 'İndirilenler'
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: homeText, href: '/', key: 'home' },
    { name: productsText, href: '/products', key: 'products' },
    { name: aboutText, href: '/about', key: 'about' },
    { name: sustainabilityText, href: '/sustainability', key: 'sustainability' },
    { name: downloadsText, href: '/documents', key: 'downloads' },
    { name: contactText, href: '/contact', key: 'contact' }
  ];

  const handleNavClick = (itemKey: string, href: string) => {
    trackEvent('navigation_click', {
      action: 'click',
      category: 'navigation',
      label: itemKey,
      custom_parameters: {
        destination: href
      }
    });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center"
            onClick={() => handleNavClick('logo', '/')}
          >
            <Image
              src="/logo/GAMPAS-LOGO.png"
              alt="Gampaş Ambalaj"
              width={120}
              height={42}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
                onClick={() => handleNavClick(item.key, item.href)}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium transition-colors duration-200"
                  onClick={() => handleNavClick(item.key, item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}