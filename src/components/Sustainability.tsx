'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recycle, Leaf, TreePine, Droplets, Sun, Wind } from 'lucide-react';
import { useState } from 'react';

interface SustainabilityProps {
  title: string;
  subtitle: string;
  recyclableTitle: string;
  recyclableDescription: string;
  biodegradableTitle: string;
  biodegradableDescription: string;
  carbonNeutralTitle: string;
  carbonNeutralDescription: string;
}

interface SustainabilityFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export default function Sustainability({
  title,
  subtitle,
  recyclableTitle,
  recyclableDescription,
  biodegradableTitle,
  biodegradableDescription,
  carbonNeutralTitle,
  carbonNeutralDescription,
}: SustainabilityProps) {
  const [activeTab, setActiveTab] = useState('recyclable');

  const features: SustainabilityFeature[] = [
    {
      id: 'recyclable',
      title: recyclableTitle,
      description: recyclableDescription,
      icon: Recycle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      stats: [
        { label: 'Geri Dönüşüm Oranı', value: '%100' },
        { label: 'Enerji Tasarrufu', value: '%75' },
        { label: 'Atık Azaltma', value: '%90' },
      ],
    },
    {
      id: 'biodegradable',
      title: biodegradableTitle,
      description: biodegradableDescription,
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      stats: [
        { label: 'Parçalanma Süresi', value: '6-12 Ay' },
        { label: 'Doğal Malzeme', value: '%85' },
        { label: 'Toprak Dostu', value: '%100' },
      ],
    },
    {
      id: 'carbon-neutral',
      title: carbonNeutralTitle,
      description: carbonNeutralDescription,
      icon: TreePine,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      stats: [
        { label: 'Karbon Emisyonu', value: 'Sıfır' },
        { label: 'Yenilenebilir Enerji', value: '%80' },
        { label: 'Ağaç Dikimi', value: '1000+' },
      ],
    },
  ];

  const environmentalImpacts = [
    {
      icon: Droplets,
      title: 'Su Tasarrufu',
      value: '%60',
      description: 'Üretim sürecinde su kullanımını azalttık',
    },
    {
      icon: Sun,
      title: 'Güneş Enerjisi',
      value: '%45',
      description: 'Fabrikamızın enerji ihtiyacı güneşten',
    },
    {
      icon: Wind,
      title: 'Temiz Hava',
      value: '2.5T',
      description: 'Yıllık CO2 emisyon azaltımı',
    },
  ];

  return (
    <section className="py-20 bg-white">
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

        {/* Main Sustainability Features */}
        <div className="mb-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <TabsTrigger
                    key={feature.id}
                    value={feature.id}
                    className="flex items-center gap-2 py-4"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{feature.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <TabsContent key={feature.id} value={feature.id}>
                  <Card className={`${feature.bgColor} border-none`}>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-full bg-white ${feature.color}`}>
                              <Icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {feature.title}
                            </h3>
                          </div>
                          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            {feature.description}
                          </p>
                          
                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-4">
                            {feature.stats.map((stat, index) => (
                              <div key={index} className="text-center">
                                <div className={`text-2xl font-bold ${feature.color}`}>
                                  {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className={`w-full h-64 rounded-lg ${feature.color.replace('text-', 'bg-').replace('600', '100')} flex items-center justify-center`}>
                            <Icon className={`w-32 h-32 ${feature.color} opacity-20`} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        {/* Environmental Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {environmentalImpacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-green-100">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {impact.title}
                  </h4>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {impact.value}
                  </div>
                  <p className="text-gray-600">
                    {impact.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Sertifikalarımız ve Standartlarımız
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              ISO 14001
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              FSC Sertifikalı
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              PEFC Onaylı
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Cradle to Cradle
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              EU Ecolabel
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}