import { Metadata } from 'next'
import SustainabilityPageClient from '@/components/SustainabilityPageClient'

export const metadata: Metadata = {
  title: 'Sürdürülebilirlik | Gampaş - Çevre Dostu Metal Ambalaj',
  description: 'Gampaş olarak 40 yıllık deneyimimizle çevre dostu, %100 geri dönüştürülebilir metal ambalaj üretimi yapıyoruz. ISO, TSE, SEDEX, REACH sertifikalarımızla sürdürülebilir gelecek için çalışıyoruz.',
  keywords: 'sürdürülebilirlik, çevre dostu ambalaj, geri dönüşüm, metal ambalaj, ISO sertifikası, TSE, SEDEX, REACH, WCA, çevre koruma',
  openGraph: {
    title: 'Sürdürülebilirlik | Gampaş',
    description: 'Çevre dostu ve %100 geri dönüştürülebilir metal ambalaj üretimi ile sürdürülebilir gelecek için çalışıyoruz.',
    images: ['/images/GAMPAS-LOGO.png'],
  },
}

export default async function SustainabilityPage() {
  return <SustainabilityPageClient />
}