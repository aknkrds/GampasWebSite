'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Upload, X } from 'lucide-react';
import { buildMeta } from '@/lib/seo';
import { trackEvent } from '@/lib/analytics';
import { getProductFamilies, getSectorSolutions } from '@/lib/cms';
import type { ProductFamily, SectorSolution } from '@/types/cms';

// Company contact information
const COMPANY_INFO = {
  name: 'Gampaş Ambalaj Sanayi ve Ticaret A.Ş.',
  address: 'Adile Naşit Bulvarı Namık Kemal Mah. 176. Sok. No:3 Esenyurt İstanbul / Türkiye',
  phone: 'PBX: +90 (212) 423 40 20',
  gsm: '+90 (533) 477 92 15',
  fax: '+90 (212) 423 70 01',
  email: 'info@gampas.net',
  salesEmail: 'sales@gampas.net',
  accountingEmail: 'muhasebe@gampas.net',
  workingHours: 'Pazartesi - Perşembe: 08:30 - 18:00, Cuma: 08:00 - 18:00, Cumartesi - Pazar: Kapalı',
  coordinates: {
    lat: 41.0234567,
    lng: 28.6234567
  }
};

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  productFamily: string;
  message: string;
  file: File | null;
  consent: boolean;
  recaptchaToken: string;
}

interface ReCAPTCHAProps {
  onVerify: (token: string) => void;
}

// Simple reCAPTCHA component (placeholder)
function ReCAPTCHA({ onVerify }: ReCAPTCHAProps) {
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    // In real implementation, this would be Google reCAPTCHA
    const mockToken = 'mock-recaptcha-token-' + Date.now();
    setVerified(true);
    onVerify(mockToken);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
      {!verified ? (
        <Button onClick={handleVerify} variant="outline">
          reCAPTCHA Doğrulaması Yap
        </Button>
      ) : (
        <div className="text-green-600 font-medium">
          ✓ reCAPTCHA Doğrulandı
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    sector: '',
    productFamily: '',
    message: '',
    file: null,
    consent: false,
    recaptchaToken: ''
  });

  const [sectors, setSectors] = useState<SectorSolution[]>([]);
  const [productFamilies, setProductFamilies] = useState<ProductFamily[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Fetch sectors and product families
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectorsResult, familiesResult] = await Promise.all([
          getSectorSolutions(),
          getProductFamilies()
        ]);
        
        if (sectorsResult.data) setSectors(sectorsResult.data);
        if (familiesResult.data) setProductFamilies(familiesResult.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('Dosya boyutu 10MB\'dan küçük olmalıdır.');
      return;
    }
    
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Sadece PDF, JPG, PNG, DOC, DOCX dosyaları kabul edilir.');
      return;
    }

    handleInputChange('file', file);
    toast.success('Dosya başarıyla yüklendi.');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error('Kişisel verilerin işlenmesine onay vermelisiniz.');
      return;
    }

    if (!formData.recaptchaToken) {
      toast.error('reCAPTCHA doğrulaması yapmalısınız.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formDataToSend.append(key, value as File);
        } else if (key !== 'file') {
          formDataToSend.append(key, String(value));
        }
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        // Track form submission event
        trackEvent('form_submit', {
          action: 'submit',
          category: 'contact_form',
          label: formData.sector,
          custom_parameters: {
            sector: formData.sector,
            product_family: formData.productFamily,
            has_file: !!formData.file
          }
        });

        toast.success('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
        
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          sector: '',
          productFamily: '',
          message: '',
          file: null,
          consent: false,
          recaptchaToken: ''
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Mesaj gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Mesaj gönderilirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-blue-600/80 to-blue-800/80 text-white py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/gampas-metal-ambalaj-slide-1-1536x711.jpg)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              İletişime Geçin
            </h1>
            <p className="text-xl text-blue-100 drop-shadow-md">
              Ambalaj çözümleriniz için bizimle iletişime geçin. Uzman ekibimiz size en uygun çözümü sunmak için hazır.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  İletişim Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{COMPANY_INFO.name}</h3>
                  <p className="text-gray-600 mb-4">{COMPANY_INFO.address}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-blue-600 mt-1" />
                    <div>
                      <div>{COMPANY_INFO.phone}</div>
                      <div>GSM: {COMPANY_INFO.gsm}</div>
                      <div>Faks: {COMPANY_INFO.fax}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-blue-600 mt-1" />
                    <div>
                      <div>Genel: {COMPANY_INFO.email}</div>
                      <div>Satış: {COMPANY_INFO.salesEmail}</div>
                      <div>Muhasebe: {COMPANY_INFO.accountingEmail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>{COMPANY_INFO.workingHours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card>
              <CardHeader>
                <CardTitle>Konum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.4!2d28.6234567!3d41.0234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0x198d8e6b6b6b6b6b!2sGampa%C5%9F%20Ambalaj%20Sanayi%20Ve%20Ticaret%20A%C5%9E!5e0!3m2!1str!2str!4v1640995200000!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gampaş Ambalaj Sanayi Ve Ticaret AŞ Konum"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Teklif Formu</CardTitle>
              <CardDescription>
                Ambalaj ihtiyaçlarınız için detaylı bilgi alın. Formu doldurun, size özel çözümler sunalım.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Firma Adı *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-posta *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sector">Sektör</Label>
                    <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sektör seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector._id} value={sector.sectorName.tr}>
                            {sector.sectorName.tr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="productFamily">Ürün Ailesi</Label>
                    <Select value={formData.productFamily} onValueChange={(value) => handleInputChange('productFamily', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ürün ailesi seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {productFamilies.map((family) => (
                          <SelectItem key={family._id} value={family.title.tr}>
                            {family.title.tr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Mesaj *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Ambalaj ihtiyaçlarınızı detaylı olarak açıklayın..."
                    rows={4}
                    required
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Label>Dosya Ekle (Opsiyonel)</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.file ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{formData.file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleInputChange('file', null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Dosyayı buraya sürükleyin veya seçin
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          title="Dosya seçin"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Dosya Seç
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                          PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* reCAPTCHA */}
                <div>
                  <Label>Güvenlik Doğrulaması</Label>
                  <ReCAPTCHA onVerify={(token) => handleInputChange('recaptchaToken', token)} />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    Kişisel verilerimin işlenmesine ve tarafıma pazarlama amaçlı iletişim kurulmasına onay veriyorum.
                    <a href="/privacy-policy" className="text-blue-600 hover:underline ml-1">
                      Gizlilik Politikası
                    </a>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Metadata is handled in layout.tsx for client components