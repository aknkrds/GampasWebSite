'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Recycle, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Analytics } from '@/lib/analytics';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  isRecyclable: boolean;
  isBiodegradable?: boolean;
}

interface ProductGridProps {
  title: string;
  subtitle: string;
  viewAllText: string;
  products?: Product[];
}

// Placeholder products
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Gıda Ambalaj Serisi',
    description: 'Gıda güvenliği standartlarına uygun, geri dönüştürülebilir ambalaj çözümleri',
    category: 'food',
    image: '/products/food-packaging.jpg',
    isRecyclable: true,
    isBiodegradable: true,
  },
  {
    id: '2',
    name: 'Endüstriyel Ambalaj',
    description: 'Ağır sanayi için dayanıklı ve sürdürülebilir ambalaj sistemleri',
    category: 'industrial',
    image: '/products/industrial-packaging.jpg',
    isRecyclable: true,
  },
  {
    id: '3',
    name: 'Medikal Ambalaj',
    description: 'Steril ve güvenli medikal ürün ambalajları',
    category: 'medical',
    image: '/products/medical-packaging.jpg',
    isRecyclable: true,
  },
  {
    id: '4',
    name: 'Kozmetik Ambalaj',
    description: 'Estetik ve fonksiyonel kozmetik ürün ambalajları',
    category: 'cosmetic',
    image: '/products/cosmetic-packaging.jpg',
    isRecyclable: true,
    isBiodegradable: true,
  },
];

const categoryIcons = {
  food: Package,
  industrial: Package,
  medical: Package,
  cosmetic: Package,
};

const categoryColors = {
  food: 'bg-green-100 text-green-800',
  industrial: 'bg-blue-100 text-blue-800',
  medical: 'bg-red-100 text-red-800',
  cosmetic: 'bg-purple-100 text-purple-800',
};

export default function ProductGrid({
  title,
  subtitle,
  viewAllText,
  products = defaultProducts,
}: ProductGridProps) {
  const handleProductClick = (product: Product) => {
    Analytics.trackProductView(product.id, product.name, product.category);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => {
            const CategoryIcon = categoryIcons[product.category as keyof typeof categoryIcons];
            const categoryColor = categoryColors[product.category as keyof typeof categoryColors];

            return (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
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
                      <Badge className={`${categoryColor} flex items-center gap-1`}>
                        <CategoryIcon className="w-3 h-3" />
                        {product.category}
                      </Badge>
                    </div>

                    {/* Sustainability Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {product.isRecyclable && (
                        <Badge className="bg-green-600 text-white">
                          <Recycle className="w-3 h-3" />
                        </Badge>
                      )}
                      {product.isBiodegradable && (
                        <Badge className="bg-emerald-600 text-white">
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

        {/* View All Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full"
          >
            <Link href="/products" className="flex items-center gap-2">
              {viewAllText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}