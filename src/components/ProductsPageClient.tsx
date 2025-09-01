'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Leaf, Recycle, Package, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Analytics, trackEvent } from '@/lib/analytics';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  isRecyclable: boolean;
  isBiodegradable?: boolean;
  features?: string[];
}

interface ProductsPageClientProps {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  categories: {
    food: string;
    industrial: string;
    medical: string;
    cosmetic: string;
  };
}

// Extended product data
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Gıda Ambalaj Serisi',
    description: 'Gıda güvenliği standartlarına uygun, geri dönüştürülebilir ambalaj çözümleri. FDA onaylı malzemeler kullanılarak üretilmiştir.',
    category: 'food',
    image: '/gampas-metal-ambalaj-slide-1-1536x711.jpg',
    isRecyclable: true,
    isBiodegradable: true,
    features: ['FDA Onaylı', 'Gıda Güvenliği', 'Uzun Raf Ömrü']
  },
  {
    id: '2',
    name: 'Endüstriyel Ambalaj',
    description: 'Ağır sanayi için dayanıklı ve sürdürülebilir ambalaj sistemleri. Yüksek mukavemet ve koruma sağlar.',
    category: 'industrial',
    image: '/gampas-metal-ambalaj-slide-1-1536x711.jpg',
    isRecyclable: true,
    features: ['Yüksek Mukavemet', 'Darbe Dayanımı', 'Kimyasal Direnç']
  },
  {
    id: '3',
    name: 'Medikal Ambalaj',
    description: 'Steril ve güvenli medikal ürün ambalajları. Tıbbi cihazlar ve ilaçlar için özel tasarım.',
    category: 'medical',
    image: '/gampas-metal-ambalaj-slide-1-1536x711.jpg',
    isRecyclable: true,
    features: ['Steril Ortam', 'Tamper Evident', 'Çocuk Güvenliği']
  },
  {
    id: '4',
    name: 'Kozmetik Ambalaj',
    description: 'Estetik ve fonksiyonel kozmetik ürün ambalajları. Premium görünüm ve koruma bir arada.',
    category: 'cosmetic',
    image: '/gampas-metal-ambalaj-slide-1-1536x711.jpg',
    isRecyclable: true,
    isBiodegradable: true,
    features: ['Premium Tasarım', 'UV Koruma', 'Airless Teknoloji']
  },
  {
    id: '5',
    name: 'Süt Ürünleri Ambalajı',
    description: 'Süt ve süt ürünleri için özel geliştirilmiş ambalaj çözümleri.',
    category: 'food',
    image: '/gampas-metal-ambalaj-slide-1-1536x711.jpg',
    isRecyclable: true,
    isBiodegradable: true,
    features: ['Soğuk Zincir', 'Oksijen Bariyeri', 'Uzun Raf Ömrü']
  },
  {
    id: '6',
    name: 'Otomotiv Parça Ambalajı',
    description: 'Otomotiv sektörü için dayanıklı ve koruyucu ambalaj sistemleri.',
    category: 'industrial',
    image: '/gampas-metal-ambalaj-slide-1-1536x711.jpg',
    isRecyclable: true,
    features: ['Antistatic', 'Darbe Emici', 'Nem Koruma']
  },
  {
    id: '7',
    name: 'İlaç Ambalajı',
    description: 'Farmasötik ürünler için güvenli ve uyumlu ambalaj çözümleri.',
    category: 'medical',
    image: '/gampas-metal-ambalaj-slide-1-1536x711.jpg',
    isRecyclable: true,
    features: ['GMP Uyumlu', 'Çocuk Güvenliği', 'Takip Edilebilir']
  },
  {
    id: '8',
    name: 'Parfüm Ambalajı',
    description: 'Lüks parfüm ve koku ürünleri için özel tasarım ambalajlar.',
    category: 'cosmetic',
    image: '/gampas-metal-ambalaj-slide-1-1536x711.jpg',
    isRecyclable: true,
    features: ['Lüks Görünüm', 'Aroma Koruma', 'Kırılmaz Tasarım']
  }
];

const categoryIcons = {
  food: Package,
  industrial: Package,
  medical: Package,
  cosmetic: Package,
};

const categoryColors = {
  food: 'bg-green-100 text-green-800 border-green-200',
  industrial: 'bg-blue-100 text-blue-800 border-blue-200',
  medical: 'bg-red-100 text-red-800 border-red-200',
  cosmetic: 'bg-purple-100 text-purple-800 border-purple-200',
};

export default function ProductsPageClient({
  title,
  subtitle,
  searchPlaceholder,
  categories,
}: ProductsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleProductClick = (product: Product) => {
    Analytics.trackProductView(product.id, product.name, product.category);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    trackEvent('product_filter', {
      action: 'filter',
      category: 'product_interaction',
      label: `filter_${category}`,
      custom_parameters: {
        filter_type: 'category',
        filter_value: category
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-gradient-to-r from-green-900/90 to-blue-900/80 text-white"
        style={{
          backgroundImage: 'url(/gampas-metal-ambalaj-slide-1-1536x711.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => handleCategoryFilter('all')}
                className={`${selectedCategory === 'all' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50'}`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Tümü
              </Button>
              {Object.entries(categories).map(([key, label]) => {
                const CategoryIcon = categoryIcons[key as keyof typeof categoryIcons];
                return (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? 'default' : 'outline'}
                    onClick={() => handleCategoryFilter(key)}
                    className={`${selectedCategory === key ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50'}`}
                  >
                    <CategoryIcon className="w-4 h-4 mr-2" />
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Ürün bulunamadı</h3>
              <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredProducts.length}</span> ürün bulundu
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => {
                  const CategoryIcon = categoryIcons[product.category as keyof typeof categoryIcons];
                  const categoryColor = categoryColors[product.category as keyof typeof categoryColors];

                  return (
                    <Card
                      key={product.id}
                      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white"
                      onClick={() => handleProductClick(product)}
                    >
                      <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge className={`${categoryColor} flex items-center gap-1 border`}>
                              <CategoryIcon className="w-3 h-3" />
                              {categories[product.category as keyof typeof categories]}
                            </Badge>
                          </div>

                          {/* Sustainability Badges */}
                          <div className="absolute top-4 right-4 flex flex-col gap-2">
                            {product.isRecyclable && (
                              <Badge className="bg-green-600 text-white border-green-600">
                                <Recycle className="w-3 h-3" />
                              </Badge>
                            )}
                            {product.isBiodegradable && (
                              <Badge className="bg-emerald-600 text-white border-emerald-600">
                                <Leaf className="w-3 h-3" />
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                          {product.description}
                        </CardDescription>
                        
                        {/* Features */}
                        {product.features && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {product.features.slice(0, 3).map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full justify-between group-hover:bg-green-50 group-hover:text-green-600"
                        >
                          <Link href={`/products/${product.id}`} className="flex items-center">
                            Detayları Görüntüle
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}