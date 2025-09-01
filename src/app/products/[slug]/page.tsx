import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductFamilyBySlug, getProductVariantsByFamily, urlFor, getFileUrl } from '@/lib/cms';
import { buildMeta } from '@/lib/seo';
import { ProductVariantPopulated } from '@/types/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Package, Ruler, Droplets } from 'lucide-react';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { data: productFamily } = await getProductFamilyBySlug(params.slug);
  
  if (!productFamily) {
    return buildMeta({
      title: 'Ürün Bulunamadı',
      description: 'Aradığınız ürün bulunamadı.',
      type: 'website'
    });
  }

  return buildMeta({
    title: productFamily.title.tr,
    description: productFamily.description?.tr || `${productFamily.title.tr} ürün ailesi hakkında detaylı bilgi.`,
    type: 'website',
    image: productFamily.coverImage ? urlFor(productFamily.coverImage).width(1200).height(630).url() : undefined,
    url: `/products/${params.slug}`
  });
}

// Product variant table component
function ProductVariantTable({ variants }: { variants: ProductVariantPopulated[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
              Ürün Adı
            </th>
            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Boyutlar
              </div>
            </th>
            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Kapasite
              </div>
            </th>
            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Kapak Tipi
              </div>
            </th>
            <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">
              PDF İndir
            </th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant._id} className="hover:bg-gray-50 transition-colors">
              <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">
                {variant.title.tr}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-gray-700">
                {variant.dimensions ? `${variant.dimensions.length || ''}x${variant.dimensions.width || ''}x${variant.dimensions.height || ''}` : '-'}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-gray-700">
                {variant.capacity ? `${variant.capacity.value || ''} ${variant.capacity.unit || ''}` : '-'}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-gray-700">
                {variant.lidType?.tr || '-'}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center">
                {variant.pdfFile ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center gap-2"
                  >
                    <a
                      href={getFileUrl(variant.pdfFile.asset._ref.replace('file-', '').replace('-pdf', '.pdf'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download className="h-4 w-4" />
                      İndir
                    </a>
                  </Button>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Related sectors sidebar component
function RelatedSectorsSidebar({ sectors }: { sectors: string[] }) {
  const sectorNames: Record<string, string> = {
    cosmetic: 'Kozmetik',
    food: 'Gıda',
    medical: 'Medikal',
    industrial: 'Endüstriyel',
    automotive: 'Otomotiv',
    electronics: 'Elektronik'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          İlgili Sektörler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sectors.map((sector) => (
            <Link
              key={sector}
              href={`/sectors/${sector}`}
              className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                {sectorNames[sector] || sector}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch product family data
  const { data: productFamily, error: familyError } = await getProductFamilyBySlug(params.slug);
  
  if (familyError || !productFamily) {
    notFound();
  }

  // Fetch product variants
  const { data: variants, error: variantsError } = await getProductVariantsByFamily(productFamily._id);
  
  if (variantsError) {
    console.error('Error fetching variants:', variantsError);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {productFamily.title.tr}
                </h1>
                {productFamily.description?.tr && (
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {productFamily.description.tr}
                  </p>
                )}
              </div>
            </div>
            
            {/* Cover Image */}
            <div className="relative aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
              {productFamily.coverImage ? (
                <Image
                  src={urlFor(productFamily.coverImage).width(600).height(450).url()}
                  alt={productFamily.title.tr}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <Package className="h-16 w-16" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Product Variants Table */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Ürün Varyantları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {variants && variants.length > 0 ? (
                    <ProductVariantTable variants={variants} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Bu ürün ailesi için henüz varyant bulunmamaktadır.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {productFamily.sectors && productFamily.sectors.length > 0 && (
                <RelatedSectorsSidebar sectors={productFamily.sectors} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}