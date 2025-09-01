'use client'

import { useState } from 'react'
import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

interface SustainabilityPageClientProps {
  dict: any
}

const sustainabilityData = {
  hero: {
    title: 'Sürdürülebilir Gelecek İçin Üretiyoruz',
    subtitle: '40 yıllık deneyimimizle çevre dostu, %100 geri dönüştürülebilir metal ambalaj üretimi',
    description: 'Yaşadığımız gezegene saygı duymak herkesin sorumluluğudur. Gampaş olarak sadece üretim sırasında değil, üretim sonrasında da kalitenin korunması gerektiğine inanıyoruz.'
  },
  stats: [
    { number: '100%', label: 'Geri Dönüştürülebilir' },
    { number: '40+', label: 'Yıllık Deneyim' },
    { number: '7', label: 'Çevre Sertifikası' },
    { number: '8000m²', label: 'Üretim Tesisi' }
  ],
  commitment: {
    title: 'Çevresel Taahhüdümüz',
    description: 'Doğaya ve çevreye saygılı %100 geri dönüştürülebilir metal ambalajlarımızı üretiyoruz. ISO, TSE, SEDEX, REACH, WCA, GIDA UYGUNLUĞU, GERİ DÖNÜŞÜM Sertifikalarımızla daha temiz bir gelecek için üretim yapıyoruz.',
    points: [
      'Doğal kaynakların korunması',
      'Enerji tasarrufu sağlanması',
      'Atık miktarının azaltılması',
      'Ekonomiye katkı sağlanması'
    ]
  },
  certificates: [
    {
      name: 'ISO 9001',
      description: 'Kalite Yönetim Sistemi',
      icon: '🏆'
    },
    {
      name: 'TSE',
      description: 'Türk Standartları Enstitüsü',
      icon: '✓'
    },
    {
      name: 'SEDEX',
      description: 'Etik Ticaret Denetimi',
      icon: '🤝'
    },
    {
      name: 'REACH',
      description: 'Kimyasal Güvenlik Yönetmeliği',
      icon: '🧪'
    },
    {
      name: 'WCA',
      description: 'Dünya Sınıfı Üretim',
      icon: '🌍'
    },
    {
      name: 'GIDA UYGUNLUĞU',
      description: 'Gıda Güvenliği Sertifikası',
      icon: '🍽️'
    },
    {
      name: 'GERİ DÖNÜŞÜM',
      description: 'Geri Dönüşüm Sertifikası',
      icon: '♻️'
    }
  ],
  recycling: {
    title: 'Metal Ambalajın Geri Dönüşüm Avantajları',
    benefits: [
      {
        title: 'Sonsuz Geri Dönüşüm',
        description: 'Metal ambalajlar kalite kaybı olmadan sonsuz kez geri dönüştürülebilir.',
        icon: '♻️'
      },
      {
        title: 'Enerji Tasarrufu',
        description: 'Geri dönüştürülmüş alüminyum, ham maddeden %95 daha az enerji kullanır.',
        icon: '⚡'
      },
      {
        title: 'Doğal Kaynak Korunması',
        description: 'Her geri dönüştürülen ambalaj, doğal kaynakların korunmasına katkıda bulunur.',
        icon: '🌱'
      },
      {
        title: 'Ekonomik Değer',
        description: 'Geri dönüşüm endüstrisi ekonomiye önemli katkı sağlar ve istihdam yaratır.',
        icon: '💰'
      }
    ]
  },
  initiatives: {
    title: 'Sürdürülebilirlik İnisiyatiflerimiz',
    items: [
      {
        title: 'Çevre Dostu Üretim',
        description: 'Üretim süreçlerimizde çevre dostu teknolojiler kullanıyoruz.',
        image: '/images/eco-production.jpg'
      },
      {
        title: 'Atık Azaltma',
        description: 'Üretim sürecinde atık miktarını minimize ediyoruz.',
        image: '/images/waste-reduction.jpg'
      },
      {
        title: 'Enerji Verimliliği',
        description: 'Yenilenebilir enerji kaynaklarını tercih ediyoruz.',
        image: '/images/energy-efficiency.jpg'
      },
      {
        title: 'Su Yönetimi',
        description: 'Su kullanımını optimize ediyor, geri dönüşümünü sağlıyoruz.',
        image: '/images/water-management.jpg'
      }
    ]
  },
  goals: {
    title: '2030 Sürdürülebilirlik Hedeflerimiz',
    targets: [
      {
        goal: 'Karbon Nötr Üretim',
        target: '2030 yılına kadar karbon nötr üretim tesisi',
        progress: 65
      },
      {
        goal: 'Atık Sıfır Hedefi',
        target: 'Üretim atıklarının %100 geri dönüşümü',
        progress: 85
      },
      {
        goal: 'Yenilenebilir Enerji',
        target: 'Enerjinin %100 yenilenebilir kaynaklardan',
        progress: 45
      },
      {
        goal: 'Su Tasarrufu',
        target: 'Su kullanımında %50 azaltma',
        progress: 70
      }
    ]
  }
}

export default function SustainabilityPageClient({ dict }: SustainabilityPageClientProps) {
  const [activeTab, setActiveTab] = useState('commitment')

  const handleCertificateClick = (certificateName: string) => {
    trackEvent('certificate_click', {
      action: 'certificate_click',
      category: 'sustainability',
      label: certificateName
    })
  }

  const handleContactClick = () => {
    trackEvent('contact_button_click', {
      action: 'contact_button_click',
      category: 'sustainability'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {sustainabilityData.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {sustainabilityData.hero.subtitle}
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {sustainabilityData.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sustainabilityData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-12 border-b">
              {[
                { id: 'commitment', label: 'Çevresel Taahhüt' },
                { id: 'certificates', label: 'Sertifikalarımız' },
                { id: 'recycling', label: 'Geri Dönüşüm' },
                { id: 'initiatives', label: 'İnisiyatiflerimiz' },
                { id: 'goals', label: '2030 Hedefleri' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 mx-2 mb-2 rounded-t-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {activeTab === 'commitment' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {sustainabilityData.commitment.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-8">
                    {sustainabilityData.commitment.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {sustainabilityData.commitment.points.map((point, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Sertifikalarımız</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sustainabilityData.certificates.map((cert, index) => (
                      <div
                        key={index}
                        onClick={() => handleCertificateClick(cert.name)}
                        className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="text-3xl mb-3">{cert.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{cert.name}</h3>
                        <p className="text-gray-600">{cert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'recycling' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {sustainabilityData.recycling.title}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {sustainabilityData.recycling.benefits.map((benefit, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="text-3xl">{benefit.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-700">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'initiatives' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {sustainabilityData.initiatives.title}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {sustainabilityData.initiatives.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'goals' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {sustainabilityData.goals.title}
                  </h2>
                  <div className="space-y-6">
                    {sustainabilityData.goals.targets.map((target, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {target.goal}
                          </h3>
                          <span className="text-green-600 font-semibold">
                            {target.progress}%
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{target.target}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${target.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Sürdürülebilir Gelecek İçin Birlikte Çalışalım
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Çevre dostu metal ambalaj çözümlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçin.
          </p>
          <button
            onClick={handleContactClick}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            İletişime Geçin
          </button>
        </div>
      </section>
    </div>
  )
}
