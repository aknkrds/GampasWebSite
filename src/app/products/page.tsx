import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/types';
import { buildMeta } from '@/lib/seo';
import ProductsPageClient from '@/components/ProductsPageClient';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return buildMeta({
    title: 'Ürünlerimiz - Sürdürülebilir Ambalaj Çözümleri',
    description: 'Gıda, endüstriyel, medikal ve kozmetik sektörleri için çevre dostu ambalaj ürünlerimizi keşfedin. %100 geri dönüştürülebilir ve sürdürülebilir çözümler.',
    type: 'website',
    url: '/products'
  });
}

export default async function ProductsPage() {
  const locale: Locale = 'tr'; // Default to Turkish for now
  const dict = await getDictionary(locale);

  // Type assertions for nested dictionary access
  const products = dict.products as any;
  const common = dict.common as any;

  return (
    <ProductsPageClient
      title={products?.title || 'Ürün Kategorilerimiz'}
      subtitle={products?.subtitle || 'Her ihtiyaca uygun sürdürülebilir ambalaj çözümleri'}
      searchPlaceholder={common?.search || 'Ürün ara...'}
      categories={products?.categories || {
        food: 'Gıda Ambalajı',
        industrial: 'Endüstriyel Ambalaj',
        medical: 'Medikal Ambalaj',
        cosmetic: 'Kozmetik Ambalajı'
      }}
    />
  );
}