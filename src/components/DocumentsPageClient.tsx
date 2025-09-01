'use client'

import React, { useState, useMemo } from 'react'
import { Download, Eye, FileText, Search, Filter } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface DocumentItem {
  id: string
  name: string
  title: string
  type: string
  size: string
  date: string
  path: string
  category: string
}

const documents: DocumentItem[] = [
  {
    id: '1',
    name: 'ISO-9001-2015.pdf',
    title: 'ISO 9001:2015 Kalite Yönetim Sistemi',
    type: 'ISO Sertifikası',
    size: '2.1 MB',
    date: '2024',
    path: '/cert/ISO-9001-2015.pdf',
    category: 'iso'
  },
  {
    id: '2',
    name: 'ISO-14001-2015.pdf',
    title: 'ISO 14001:2015 Çevre Yönetim Sistemi',
    type: 'ISO Sertifikası',
    size: '1.8 MB',
    date: '2024',
    path: '/cert/ISO-14001-2015.pdf',
    category: 'iso'
  },
  {
    id: '3',
    name: 'ISO-22000-2018.pdf',
    title: 'ISO 22000:2018 Gıda Güvenliği Yönetim Sistemi',
    type: 'ISO Sertifikası',
    size: '2.3 MB',
    date: '2024',
    path: '/cert/ISO-22000-2018.pdf',
    category: 'iso'
  },
  {
    id: '4',
    name: 'ISO-45001-2018.pdf',
    title: 'ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi',
    type: 'ISO Sertifikası',
    size: '2.0 MB',
    date: '2024',
    path: '/cert/ISO-45001-2018.pdf',
    category: 'iso'
  },
  {
    id: '5',
    name: 'ISO-10002-2018.pdf',
    title: 'ISO 10002:2018 Müşteri Memnuniyeti Yönetim Sistemi',
    type: 'ISO Sertifikası',
    size: '1.9 MB',
    date: '2024',
    path: '/cert/ISO-10002-2018.pdf',
    category: 'iso'
  },
  {
    id: '6',
    name: 'EYS-PL-01.pdf',
    title: 'EYS-PL-01 Sertifikası',
    type: 'EYS Sertifikası',
    size: '1.5 MB',
    date: '2024',
    path: '/cert/EYS-PL-01.pdf',
    category: 'eys'
  },
  {
    id: '7',
    name: 'EYS-PL-02.pdf',
    title: 'EYS-PL-02 Sertifikası',
    type: 'EYS Sertifikası',
    size: '1.6 MB',
    date: '2024',
    path: '/cert/EYS-PL-02.pdf',
    category: 'eys'
  },
  {
    id: '8',
    name: 'EYS-PL-03.pdf',
    title: 'EYS-PL-03 Sertifikası',
    type: 'EYS Sertifikası',
    size: '1.4 MB',
    date: '2024',
    path: '/cert/EYS-PL-03.pdf',
    category: 'eys'
  },
  {
    id: '9',
    name: 'EYS-PL-04.pdf',
    title: 'EYS-PL-04 Sertifikası',
    type: 'EYS Sertifikası',
    size: '1.7 MB',
    date: '2024',
    path: '/cert/EYS-PL-04.pdf',
    category: 'eys'
  },
  {
    id: '10',
    name: 'EYS-PL-05.pdf',
    title: 'EYS-PL-05 Sertifikası',
    type: 'EYS Sertifikası',
    size: '1.3 MB',
    date: '2024',
    path: '/cert/EYS-PL-05.pdf',
    category: 'eys'
  }
]

export default function DocumentsPageClient() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleDownload = (doc: DocumentItem) => {
    trackEvent('document_download', {
      action: 'download',
      category: 'documents',
      label: doc.name
    })
    
    const link = window.document.createElement('a')
    link.href = doc.path
    link.download = doc.name
    window.document.body.appendChild(link)
    link.click()
    window.document.body.removeChild(link)
  }

  const handleView = (doc: DocumentItem) => {
    trackEvent('document_view', {
      action: 'view',
      category: 'documents',
      label: doc.name
    })
    
    window.open(doc.path, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              İndirilebilir Belgeler
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Kalite sertifikalarımızı ve belgelerimizi görüntüleyin ve indirin
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Belge ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  title="Belge kategorisi seçin"
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Tüm Belgeler</option>
                  <option value="iso">ISO Sertifikaları</option>
                  <option value="eys">EYS Sertifikaları</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Document Preview */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  {/* Document Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {doc.title}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p><span className="font-medium">Tür:</span> {doc.type}</p>
                      <p><span className="font-medium">Boyut:</span> {doc.size}</p>
                      <p><span className="font-medium">Tarih:</span> {doc.date}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleView(doc)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        Görüntüle
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <Download className="w-4 h-4" />
                        İndir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Belge bulunamadı
                </h3>
                <p className="text-gray-600">
                  Arama kriterlerinize uygun belge bulunamadı. Lütfen farklı anahtar kelimeler deneyin.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Kalite ve Güvenlik Taahhüdümüz
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Gampaş A.Ş. olarak, uluslararası standartlara uygun üretim yapmanın ve 
              kalite yönetim sistemlerini sürekli geliştirmenin önemini biliyoruz. 
              Tüm sertifikalarımız ve belgelerimiz, müşterilerimize sunduğumuz 
              ürün ve hizmetlerin kalitesinin garantisidir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ISO Sertifikaları
                </h3>
                <p className="text-gray-600">
                  Kalite, çevre, gıda güvenliği ve iş güvenliği standartları
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Kolay Erişim
                </h3>
                <p className="text-gray-600">
                  Tüm belgelerimizi kolayca görüntüleyebilir ve indirebilirsiniz
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Şeffaflık
                </h3>
                <p className="text-gray-600">
                  Kalite standartlarımızı şeffaf bir şekilde paylaşıyoruz
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}