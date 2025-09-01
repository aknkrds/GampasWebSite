'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Users, 
  Award, 
  Leaf, 
  Globe, 
  Target, 
  Heart,
  Factory,
  Recycle,
  Shield,
  CheckCircle,
  Calendar,
  MapPin
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface AboutPageClientProps {
  title: string
  subtitle: string
  dict: any
}

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface StatItem {
  number: string
  label: string
  icon: React.ReactNode
}

interface ValueItem {
  title: string
  description: string
  icon: React.ReactNode
}

const timelineData: TimelineItem[] = [
  {
    year: '1982',
    title: 'Kuruluş',
    description: 'Gampaş Ambalaj San. Tic. A.Ş. olarak metal ambalaj sektöründe faaliyetlerimize başladık.'
  },
  {
    year: '1990',
    title: 'Teknoloji Yatırımı',
    description: 'Modern üretim teknolojilerine yatırım yaparak kapasitemizi artırdık.'
  },
  {
    year: '2000',
    title: 'Kalite Sertifikaları',
    description: 'ISO, TSE ve uluslararası kalite standartlarını elde ettik.'
  },
  {
    year: '2010',
    title: 'Sürdürülebilirlik',
    description: 'Çevre dostu üretim süreçlerine geçiş yaparak sürdürülebilirlik taahhüdümüzü başlattık.'
  },
  {
    year: '2020',
    title: 'Dijital Dönüşüm',
    description: 'Endüstri 4.0 teknolojilerini entegre ederek üretim süreçlerimizi dijitalleştirdik.'
  }
]

const statsData: StatItem[] = [
  {
    number: '40+',
    label: 'Yıllık Deneyim',
    icon: <Calendar className="h-8 w-8" />
  },
  {
    number: '8000m²',
    label: 'Üretim Alanı',
    icon: <Factory className="h-8 w-8" />
  },
  {
    number: '100%',
    label: 'Geri Dönüştürülebilir',
    icon: <Recycle className="h-8 w-8" />
  },
  {
    number: '50+',
    label: 'Uzman Personel',
    icon: <Users className="h-8 w-8" />
  }
]

const valuesData: ValueItem[] = [
  {
    title: 'Kalite',
    description: 'Üretimden satış sonrasına kadar her aşamada kaliteyi ön planda tutuyoruz.',
    icon: <Award className="h-6 w-6" />
  },
  {
    title: 'Sürdürülebilirlik',
    description: 'Çevre dostu üretim süreçleri ve %100 geri dönüştürülebilir malzemeler kullanıyoruz.',
    icon: <Leaf className="h-6 w-6" />
  },
  {
    title: 'İnovasyon',
    description: 'Sektördeki gelişmeleri takip ederek yenilikçi çözümler sunuyoruz.',
    icon: <Target className="h-6 w-6" />
  },
  {
    title: 'Müşteri Memnuniyeti',
    description: 'Müşterilerimizin ihtiyaçlarını anlayarak en iyi çözümleri üretiyoruz.',
    icon: <Heart className="h-6 w-6" />
  }
]

const certificatesData = [
  'ISO 9001 Kalite Yönetim Sistemi',
  'TSE Türk Standartları Enstitüsü',
  'SEDEX Etik Ticaret Sertifikası',
  'REACH Avrupa Kimyasal Mevzuatı',
  'WCA Dünya Gıda Güvenliği',
  'Gıda Uygunluk Sertifikası',
  'Geri Dönüşüm Sertifikası'
]

export default function AboutPageClient({ title, subtitle, dict }: AboutPageClientProps) {
  const [activeTab, setActiveTab] = useState<'story' | 'vision' | 'mission'>('story')

  const handleContactClick = () => {
    trackEvent('about_contact_click', {
      action: 'contact_button_click',
      category: 'about_page'
    })
  }

  const handleCertificateClick = (certificate: string) => {
    trackEvent('certificate_view', {
      action: 'view',
      category: 'about_page',
      label: certificate
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Building2 className="h-5 w-5 mr-2" />
                1982'den beri
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Globe className="h-5 w-5 mr-2" />
                Türkiye'nin lideri
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Leaf className="h-5 w-5 mr-2" />
                %100 Sürdürülebilir
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-green-600">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                {(['story', 'vision', 'mission'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-green-600 text-white'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    {tab === 'story' && 'Hikayemiz'}
                    {tab === 'vision' && 'Vizyonumuz'}
                    {tab === 'mission' && 'Misyonumuz'}
                  </button>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                {activeTab === 'story' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Hikayemiz</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      1982 yılında kurulan Gampaş Ambalaj San. Tic. A.Ş., 40 yılı aşkın süredir metal ambalaj sektöründe faaliyet göstermektedir. İstanbul'da 8000 m² kapalı alanda modern üretim tesisimizle, sektörün önde gelen firmalarından biri haline gelmiştik.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Yıllar içinde edindiğimiz deneyim ve sürekli yenilenen teknolojimizle, müşterilerimize en kaliteli ürünleri sunmaya devam ediyoruz. Fonksiyonel, yaratıcı, yenilikçi ve görsel çözümlerle markalarınıza değer katıyoruz.
                    </p>
                  </div>
                )}
                {activeTab === 'vision' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Metal ambalaj sektöründe Türkiye'nin lider firması olmaya devam ederek, uluslararası pazarlarda da tanınan ve tercih edilen bir marka haline gelmek. Sürdürülebilir üretim anlayışımızla çevreye duyarlı, yenilikçi çözümler sunarak gelecek nesillere daha yaşanabilir bir dünya bırakmak.
                    </p>
                  </div>
                )}
                {activeTab === 'mission' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Müşterilerimizin ihtiyaçlarını en iyi şekilde karşılayarak, kaliteli ve çevre dostu metal ambalaj çözümleri sunmak. Sürekli gelişim ve yenilik anlayışımızla sektörde öncü olmaya devam ederek, tüm paydaşlarımıza değer katmak.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Tarihçemiz
            </h2>
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Değerlerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valuesData.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4 text-green-600">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Sertifikalarımız
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificatesData.map((certificate, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCertificateClick(certificate)}
                >
                  <CardContent className="p-6 text-center">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900">
                      {certificate}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sürdürülebilirlik Taahhüdümüz
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              %100 geri dönüştürülebilir malzemeler kullanarak çevre dostu üretim yapıyoruz. 
              Sürdürülebilir gelecek için sorumluluğumuzu yerine getiriyoruz.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="text-lg px-4 py-2 border-green-600 text-green-600">
                <Recycle className="h-5 w-5 mr-2" />
                %100 Geri Dönüştürülebilir
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2 border-green-600 text-green-600">
                <Leaf className="h-5 w-5 mr-2" />
                Çevre Dostu Üretim
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2 border-green-600 text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                Sürdürülebilir Malzemeler
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-xl mb-8">
              Metal ambalaj ihtiyaçlarınız için size özel çözümler üretelim.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleContactClick}
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                <MapPin className="h-5 w-5 mr-2" />
                İletişime Geçin
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Globe className="h-5 w-5 mr-2" />
                Ürünlerimizi İnceleyin
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}