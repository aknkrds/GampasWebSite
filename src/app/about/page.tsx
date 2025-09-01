import { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import AboutPageClient from '@/components/AboutPageClient'

export const metadata: Metadata = {
  title: 'Hakkımızda - Gampaş',
  description: '1982 yılından beri metal ambalaj sektöründe lider olan Gampaş A.Ş. hakkında bilgi edinin. 40 yıllık deneyimimiz ve kalite anlayışımızla markanıza değer katıyoruz.',
  keywords: 'gampaş, hakkımızda, metal ambalaj, ambalaj üretimi, istanbul, türkiye, kalite, deneyim',
  openGraph: {
    title: 'Hakkımızda - Gampaş',
    description: '1982 yılından beri metal ambalaj sektöründe lider olan Gampaş A.Ş. hakkında bilgi edinin.',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default async function AboutPage({
  params: { lang = 'tr' },
}: {
  params: { lang?: string }
}) {
  const dict = await getDictionary(lang as 'tr' | 'en')

  return (
    <AboutPageClient
      title="Hakkımızda"
      subtitle="40 yıldır metal ambalaj sektörünün öncü gücüyüz"
      dict={dict}
    />
  )
}