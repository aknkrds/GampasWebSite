import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email template for contact form
function createEmailTemplate(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Yeni İletişim Formu Mesajı</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Yeni İletişim Formu Mesajı</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Ad Soyad:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Firma:</div>
            <div class="value">${data.company}</div>
          </div>
          <div class="field">
            <div class="label">E-posta:</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">Telefon:</div>
            <div class="value">${data.phone}</div>
          </div>
          ${data.sector ? `
          <div class="field">
            <div class="label">Sektör:</div>
            <div class="value">${data.sector}</div>
          </div>
          ` : ''}
          ${data.productFamily ? `
          <div class="field">
            <div class="label">Ürün Ailesi:</div>
            <div class="value">${data.productFamily}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Mesaj:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          ${data.file ? `
          <div class="field">
            <div class="label">Ek Dosya:</div>
            <div class="value">${data.file.name} (${(data.file.size / 1024 / 1024).toFixed(2)} MB)</div>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>Bu mesaj GAMPAS web sitesi iletişim formundan gönderilmiştir.</p>
          <p>Gönderim Tarihi: ${new Date().toLocaleString('tr-TR')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format (Turkish phone numbers)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Validate reCAPTCHA token (mock validation for now)
function validateRecaptcha(token: string): boolean {
  // In real implementation, verify with Google reCAPTCHA API
  // For now, just check if token exists and starts with 'mock-'
  return token && token.startsWith('mock-recaptcha-token-');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      sector: formData.get('sector') as string,
      productFamily: formData.get('productFamily') as string,
      message: formData.get('message') as string,
      consent: Boolean(formData.get('consent')),
      recaptchaToken: formData.get('recaptchaToken') as string,
      file: formData.get('file') as File | null
    };

    // Validate required fields
    if (!data.name || !data.company || !data.email || !data.phone || !data.message) {
      return NextResponse.json(
        { message: 'Gerekli alanlar eksik.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { message: 'Geçersiz e-posta adresi.' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(data.phone)) {
      return NextResponse.json(
        { message: 'Geçersiz telefon numarası.' },
        { status: 400 }
      );
    }

    // Validate consent
    if (!data.consent) {
      return NextResponse.json(
        { message: 'Kişisel verilerin işlenmesine onay vermelisiniz.' },
        { status: 400 }
      );
    }

    // Validate reCAPTCHA
    if (!validateRecaptcha(data.recaptchaToken)) {
      return NextResponse.json(
        { message: 'reCAPTCHA doğrulaması başarısız.' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { message: 'E-posta servisi yapılandırılmamış.' },
        { status: 500 }
      );
    }

    // Prepare email data
    const emailData: any = {
      from: process.env.RESEND_FROM_EMAIL || 'noreply@gampas.net',
      to: process.env.RESEND_TO_EMAIL || 'info@gampas.net',
      subject: `Yeni İletişim Formu Mesajı - ${data.company}`,
      html: createEmailTemplate(data),
      replyTo: data.email
    };

    // Add attachment if file exists
    if (data.file && data.file.size > 0) {
      const fileBuffer = await data.file.arrayBuffer();
      emailData.attachments = [{
        filename: data.file.name,
        content: Buffer.from(fileBuffer)
      }];
    }

    // Send email using Resend
    const emailResult = await resend.emails.send(emailData);

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { message: 'E-posta gönderilirken bir hata oluştu.' },
        { status: 500 }
      );
    }

    // Log successful submission (without sensitive data)
    console.log('Contact form submitted successfully:', {
      id: emailResult.data?.id,
      company: data.company,
      sector: data.sector,
      hasFile: !!data.file,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        message: 'Mesajınız başarıyla gönderildi.',
        id: emailResult.data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}