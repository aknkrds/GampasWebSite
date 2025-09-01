// TypeScript interfaces for CMS schemas

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface LocalizedContent {
  tr: any[]; // Rich text content
  en: any[];
}

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface Capacity {
  value?: number;
  unit?: 'ml' | 'L' | 'g' | 'kg';
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
    url?: string;
  };
}

export interface SanityReference {
  _ref: string;
  _type: 'reference';
}

// ProductFamily Interface
export interface ProductFamily {
  _id: string;
  _type: 'productFamily';
  _createdAt: string;
  _updatedAt: string;
  title: LocalizedText;
  description?: LocalizedText;
  coverImage: SanityImage;
  slug: {
    current: string;
    _type: 'slug';
  };
  sectors?: Array<'food-beverage' | 'healthcare' | 'cosmetics' | 'industrial' | 'retail' | 'ecommerce'>;
}

// ProductVariant Interface
export interface ProductVariant {
  _id: string;
  _type: 'productVariant';
  _createdAt: string;
  _updatedAt: string;
  title: LocalizedText;
  productFamily: SanityReference;
  dimensions?: Dimensions;
  capacity?: Capacity;
  material?: LocalizedText;
  lidType?: LocalizedText;
  pdfFile?: SanityFile;
  images: SanityImage[];
}

// SectorSolution Interface
export interface SectorSolution {
  _id: string;
  _type: 'sectorSolution';
  _createdAt: string;
  _updatedAt: string;
  sectorName: LocalizedText;
  description?: LocalizedText;
  relatedFamilies?: SanityReference[];
  slug: {
    current: string;
    _type: 'slug';
  };
}

// Certificate Interface
export interface Certificate {
  _id: string;
  _type: 'certificate';
  _createdAt: string;
  _updatedAt: string;
  title: LocalizedText;
  description?: LocalizedText;
  pdfFile: SanityFile;
  issueDate?: string;
  expiryDate?: string;
}

// CaseStudy Interface
export interface CaseStudy {
  _id: string;
  _type: 'caseStudy';
  _createdAt: string;
  _updatedAt: string;
  title: LocalizedText;
  sector: 'food-beverage' | 'healthcare' | 'cosmetics' | 'industrial' | 'retail' | 'ecommerce';
  problem?: LocalizedText;
  solution?: LocalizedText;
  result?: LocalizedText;
  gallery?: SanityImage[];
  slug: {
    current: string;
    _type: 'slug';
  };
}

// Page Interface
export interface Page {
  _id: string;
  _type: 'page';
  _createdAt: string;
  _updatedAt: string;
  title: LocalizedText;
  content?: LocalizedContent;
  slug: {
    current: string;
    _type: 'slug';
  };
  seo?: {
    metaTitle?: LocalizedText;
    metaDescription?: LocalizedText;
  };
}

// Media Interface
export interface Media {
  _id: string;
  _type: 'media';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  file: SanityFile;
  tags?: string[];
  description?: string;
  fileType?: 'pdf' | 'image' | 'video' | 'document';
}

// Populated interfaces (with resolved references)
export interface ProductVariantPopulated extends Omit<ProductVariant, 'productFamily'> {
  productFamily: ProductFamily;
}

export interface SectorSolutionPopulated extends Omit<SectorSolution, 'relatedFamilies'> {
  relatedFamilies?: ProductFamily[];
}

// Query result types
export interface QueryResult<T> {
  data: T;
  error?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  hasMore: boolean;
  nextCursor?: string;
}

// Language type
export type Language = 'tr' | 'en';

// Sector type
export type Sector = 'food-beverage' | 'healthcare' | 'cosmetics' | 'industrial' | 'retail' | 'ecommerce';