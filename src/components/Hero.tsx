'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Recycle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Analytics } from '@/lib/analytics';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaSecondaryText: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaSecondaryText,
}: HeroProps) {
  const handleCtaClick = (buttonType: 'primary' | 'secondary') => {
    Analytics.trackFormSubmit(`hero-${buttonType}-cta`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/60 z-10" />
        <Image
          src="/gampas-metal-ambalaj-slide-1-1536x711.jpg"
          alt="Gampas Metal Ambalaj Background"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Sustainability Icons */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Recycle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">%100 Geri Dönüştürülebilir</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Çevre Dostu</span>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl font-light mb-6 text-green-100">
            {subtitle}
          </p>
          
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => handleCtaClick('primary')}
            >
              <Link href="/products" className="flex items-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              onClick={() => handleCtaClick('secondary')}
            >
              <Link href="/contact">
                {ctaSecondaryText}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}