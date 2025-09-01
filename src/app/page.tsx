import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Sustainability from '@/components/Sustainability';
import Footer from '@/components/Footer';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/types';

export default async function Home() {
  const locale: Locale = 'tr'; // Default to Turkish for now
  const dict = await getDictionary(locale);

  // Type assertions for nested dictionary access
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hero = dict.hero as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products = dict.products as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sustainability = dict.sustainability as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const footer = dict.footer as any;

  return (
    <main className="min-h-screen">
      <Hero
        title={hero?.title || 'Sürdürülebilir Ambalaj Çözümleri'}
        subtitle={hero?.subtitle || 'Geleceği Düşünen Ambalaj'}
        description={hero?.description || 'Çevre dostu ve geri dönüştürülebilir ambalaj ürünleriyle doğayı koruyoruz. Kaliteli, sürdürülebilir ve yenilikçi çözümlerimizle işinizi geleceğe taşıyın.'}
        ctaText={hero?.cta || 'Ürünlerimizi Keşfedin'}
        ctaSecondaryText={hero?.ctaSecondary || 'İletişime Geçin'}
      />
      
      <ProductGrid
        title={products?.title || 'Ürün Kategorilerimiz'}
        subtitle={products?.subtitle || 'Her ihtiyaca uygun sürdürülebilir ambalaj çözümleri'}
        viewAllText={products?.viewAll || 'Tüm Ürünleri Görüntüle'}
      />
      
      <Sustainability
        title={sustainability?.title || 'Sürdürülebilirlik Taahhüdümüz'}
        subtitle={sustainability?.subtitle || 'Çevre dostu üretim süreçleri ve geri dönüştürülebilir malzemeler'}
        recyclableTitle={sustainability?.recyclable?.title || '%100 Geri Dönüştürülebilir'}
        recyclableDescription={sustainability?.recyclable?.description || 'Tüm ürünlerimiz geri dönüştürülebilir malzemelerden üretilir'}
        biodegradableTitle={sustainability?.biodegradable?.title || 'Biyolojik Olarak Parçalanabilir'}
        biodegradableDescription={sustainability?.biodegradable?.description || 'Doğada kendiliğinden parçalanan çevre dostu malzemeler'}
        carbonNeutralTitle={sustainability?.carbonNeutral?.title || 'Karbon Nötr Üretim'}
        carbonNeutralDescription={sustainability?.carbonNeutral?.description || 'Üretim süreçlerimizde sıfır karbon emisyonu hedefliyoruz'}
      />
      
      <Footer
        companyName={footer?.company || 'Gampaş Ambalaj'}
        description={footer?.description || 'Sürdürülebilir ambalaj çözümlerinde lider şirket'}
        quickLinksTitle={footer?.quickLinks || 'Hızlı Bağlantılar'}
        followUsTitle={footer?.followUs || 'Bizi Takip Edin'}
        copyright={footer?.copyright || '© 2024 Gampaş Ambalaj. Tüm hakları saklıdır.'}
        address="Organize Sanayi Bölgesi, 1. Cadde No:15, 34000 İstanbul, Türkiye"
        phone="+90 212 555 0123"
        email="info@gampas.com"
        workingHours="Pazartesi - Cuma: 08:00 - 18:00"
      />
    </main>
  );
}
