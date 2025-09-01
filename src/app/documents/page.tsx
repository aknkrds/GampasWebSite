import { Metadata } from 'next'
import DocumentsPageClient from '@/components/DocumentsPageClient'

export const metadata: Metadata = {
  title: 'Belgeler | Gampaş A.Ş. - Sertifikalar ve Kalite Belgeleri',
  description: 'Gampaş A.Ş. kalite sertifikaları, ISO belgeleri ve diğer resmi belgelerimizi görüntüleyin ve indirin.',
  keywords: 'Gampaş belgeler, ISO sertifikaları, kalite belgeleri, sertifikalar, metal ambalaj sertifikaları',
  openGraph: {
    title: 'Belgeler | Gampaş A.Ş.',
    description: 'Kalite sertifikalarımızı ve resmi belgelerimizi görüntüleyin.',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default async function DocumentsPage() {
  return <DocumentsPageClient />
}