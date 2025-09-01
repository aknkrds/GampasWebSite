'use client';

import { useState, useEffect, useMemo } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { getCertificates, getMediaFiles, getFileUrl } from '@/lib/cms';
import { buildMeta } from '@/lib/seo';
import { Certificate, Media, Language } from '@/types/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Image as ImageIcon, Video, Search, Filter } from 'lucide-react';

type DocumentType = 'all' | 'certificate' | 'catalog' | 'drawing';
type FileType = 'all' | 'pdf' | 'image' | 'video' | 'document';

interface DownloadItem {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  documentType: DocumentType;
  language?: Language;
  issueDate?: string;
  tags?: string[];
}

// Document type mapping
const documentTypeNames: Record<DocumentType, string> = {
  all: 'Tümü',
  certificate: 'Sertifika',
  catalog: 'Katalog',
  drawing: 'Çizim'
};

// File type icons
const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
    case 'document':
      return <FileText className="h-8 w-8 text-red-500" />;
    case 'image':
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    case 'video':
      return <Video className="h-8 w-8 text-purple-500" />;
    default:
      return <FileText className="h-8 w-8 text-gray-500" />;
  }
};

// Download card component
function DownloadCard({ item }: { item: DownloadItem }) {
  const handleDownload = () => {
    window.open(item.fileUrl, '_blank');
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getFileIcon(item.fileType)}
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                {item.title}
              </CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {documentTypeNames[item.documentType]}
                </Badge>
                {item.language && (
                  <Badge variant="outline" className="text-xs">
                    {item.language.toUpperCase()}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {item.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {item.description}
          </p>
        )}
        {item.issueDate && (
          <p className="text-xs text-gray-500 mb-4">
            Tarih: {new Date(item.issueDate).toLocaleDateString('tr-TR')}
          </p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        <Button
          onClick={handleDownload}
          className="w-full"
          variant="default"
        >
          <Download className="h-4 w-4 mr-2" />
          İndir
        </Button>
      </CardContent>
    </Card>
  );
}

// Filter component
function FilterControls({
  searchTerm,
  setSearchTerm,
  documentType,
  setDocumentType,
  language,
  setLanguage,
  fileType,
  setFileType
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  documentType: DocumentType;
  setDocumentType: (value: DocumentType) => void;
  language: Language | 'all';
  setLanguage: (value: Language | 'all') => void;
  fileType: FileType;
  setFileType: (value: FileType) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900">Filtrele ve Ara</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Belge adında ara..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Document Type */}
        <div>
          <Select value={documentType} onValueChange={(value: string) => setDocumentType(value as DocumentType)}>
            <SelectTrigger>
              <SelectValue placeholder="Belge Türü" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(documentTypeNames).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Language */}
        <div>
          <Select value={language} onValueChange={(value: string) => setLanguage(value as Language | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="Dil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="tr">Türkçe</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* File Type */}
        <div>
          <Select value={fileType} onValueChange={(value: string) => setFileType(value as FileType)}>
            <SelectTrigger>
              <SelectValue placeholder="Dosya Türü" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="image">Görsel</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="document">Doküman</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [mediaFiles, setMediaFiles] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('all');
  const [language, setLanguage] = useState<Language | 'all'>('all');
  const [fileType, setFileType] = useState<FileType>('all');

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [certificatesResult, mediaResult] = await Promise.all([
          getCertificates(),
          getMediaFiles()
        ]);
        
        if (certificatesResult.error) {
          console.error('Error fetching certificates:', certificatesResult.error);
        } else {
          setCertificates(certificatesResult.data);
        }
        
        if (mediaResult.error) {
          console.error('Error fetching media:', mediaResult.error);
        } else {
          setMediaFiles(mediaResult.data);
        }
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Convert data to download items
  const downloadItems: DownloadItem[] = useMemo(() => {
    const items: DownloadItem[] = [];
    
    // Add certificates
    certificates.forEach((cert) => {
      if (cert.pdfFile) {
        items.push({
          id: cert._id,
          title: cert.title.tr,
          description: cert.description?.tr,
          fileUrl: getFileUrl(cert.pdfFile.asset._ref.replace('file-', '').replace('-pdf', '.pdf')),
          fileType: 'pdf',
          documentType: 'certificate',
          language: 'tr',
          issueDate: cert.issueDate
        });
      }
    });
    
    // Add media files
    mediaFiles.forEach((media) => {
      if (media.file) {
        // Determine document type based on tags
        let docType: DocumentType = 'catalog';
        if (media.tags?.includes('drawing') || media.tags?.includes('çizim')) {
          docType = 'drawing';
        } else if (media.tags?.includes('certificate') || media.tags?.includes('sertifika')) {
          docType = 'certificate';
        }
        
        items.push({
          id: media._id,
          title: media.title,
          description: media.description,
          fileUrl: getFileUrl(media.file.asset._ref.replace('file-', '').replace(`-${media.fileType}`, `.${media.fileType}`)),
          fileType: media.fileType || 'document',
          documentType: docType,
          tags: media.tags
        });
      }
    });
    
    return items;
  }, [certificates, mediaFiles]);

  // Filter items
  const filteredItems = useMemo(() => {
    return downloadItems.filter((item) => {
      // Search filter
      if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Document type filter
      if (documentType !== 'all' && item.documentType !== documentType) {
        return false;
      }
      
      // Language filter
      if (language !== 'all' && item.language !== language) {
        return false;
      }
      
      // File type filter
      if (fileType !== 'all' && item.fileType !== fileType) {
        return false;
      }
      
      return true;
    });
  }, [downloadItems, searchTerm, documentType, language, fileType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Belgeler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Tekrar Dene
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              İndirilebilir Belgeler
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sertifikalarımız, kataloglarımız ve teknik çizimlerimizi indirin.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            documentType={documentType}
            setDocumentType={setDocumentType}
            language={language}
            setLanguage={setLanguage}
            fileType={fileType}
            setFileType={setFileType}
          />
          
          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredItems.length} belge bulundu
            </p>
          </div>
          
          {/* Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <DownloadCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belge bulunamadı
              </h3>
              <p className="text-gray-600">
                Arama kriterlerinizi değiştirerek tekrar deneyin.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}