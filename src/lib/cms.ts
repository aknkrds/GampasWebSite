// CMS fetch helper functions for Sanity

import { sanityClient } from '../../cms/sanity.config';
import imageUrlBuilder from '@sanity/image-url';
import {
  ProductFamily,
  ProductVariant,
  ProductVariantPopulated,
  SectorSolution,
  SectorSolutionPopulated,
  Certificate,
  CaseStudy,
  Page,
  Media,
  QueryResult,
  Language,
  Sector,
  SanityBlock,
  SanityImage,
} from '@/types/cms';

// Initialize image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to build image URLs
export function urlFor(source: SanityImage | { _ref: string; _type: string } | string) {
  return builder.image(source);
}

// Helper function to build file URLs
export function getFileUrl(fileRef: string): string {
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileRef}`;
}

// ProductFamily queries
export async function getProductFamilies(): Promise<QueryResult<ProductFamily[]>> {
  try {
    const query = `
      *[_type == "productFamily"] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        description,
        coverImage,
        slug,
        sectors
      }
    `;
    
    const data = await sanityClient.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching product families:', error);
    return { data: [], error: 'Failed to fetch product families' };
  }
}

export async function getProductFamilyBySlug(slug: string): Promise<QueryResult<ProductFamily | null>> {
  try {
    const query = `
      *[_type == "productFamily" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        description,
        coverImage,
        slug,
        sectors
      }
    `;
    
    const data = await sanityClient.fetch(query, { slug });
    return { data };
  } catch (error) {
    console.error('Error fetching product family:', error);
    return { data: null, error: 'Failed to fetch product family' };
  }
}

export async function getProductFamiliesBySector(sector: Sector): Promise<QueryResult<ProductFamily[]>> {
  try {
    const query = `
      *[_type == "productFamily" && $sector in sectors] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        description,
        coverImage,
        slug,
        sectors
      }
    `;
    
    const data = await sanityClient.fetch(query, { sector });
    return { data };
  } catch (error) {
    console.error('Error fetching product families by sector:', error);
    return { data: [], error: 'Failed to fetch product families by sector' };
  }
}

// ProductVariant queries
export async function getProductVariants(): Promise<QueryResult<ProductVariant[]>> {
  try {
    const query = `
      *[_type == "productVariant"] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        productFamily,
        dimensions,
        capacity,
        material,
        lidType,
        pdfFile,
        images
      }
    `;
    
    const data = await sanityClient.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching product variants:', error);
    return { data: [], error: 'Failed to fetch product variants' };
  }
}

export async function getProductVariantsByFamily(familyId: string): Promise<QueryResult<ProductVariantPopulated[]>> {
  try {
    const query = `
      *[_type == "productVariant" && productFamily._ref == $familyId] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        productFamily-> {
          _id,
          _type,
          title,
          slug,
          coverImage
        },
        dimensions,
        capacity,
        material,
        lidType,
        pdfFile,
        images
      }
    `;
    
    const data = await sanityClient.fetch(query, { familyId });
    return { data };
  } catch (error) {
    console.error('Error fetching product variants by family:', error);
    return { data: [], error: 'Failed to fetch product variants by family' };
  }
}

// SectorSolution queries
export async function getSectorSolutions(): Promise<QueryResult<SectorSolution[]>> {
  try {
    const query = `
      *[_type == "sectorSolution"] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        sectorName,
        description,
        relatedFamilies,
        slug
      }
    `;
    
    const data = await sanityClient.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching sector solutions:', error);
    return { data: [], error: 'Failed to fetch sector solutions' };
  }
}

export async function getSectorSolutionBySlug(slug: string): Promise<QueryResult<SectorSolutionPopulated | null>> {
  try {
    const query = `
      *[_type == "sectorSolution" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        sectorName,
        description,
        relatedFamilies[]-> {
          _id,
          _type,
          title,
          description,
          coverImage,
          slug,
          sectors
        },
        slug
      }
    `;
    
    const data = await sanityClient.fetch(query, { slug });
    return { data };
  } catch (error) {
    console.error('Error fetching sector solution:', error);
    return { data: null, error: 'Failed to fetch sector solution' };
  }
}

// Certificate queries
export async function getCertificates(): Promise<QueryResult<Certificate[]>> {
  try {
    const query = `
      *[_type == "certificate"] | order(issueDate desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        description,
        pdfFile,
        issueDate,
        expiryDate
      }
    `;
    
    const data = await sanityClient.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return { data: [], error: 'Failed to fetch certificates' };
  }
}

export async function getActiveCertificates(): Promise<QueryResult<Certificate[]>> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const query = `
      *[_type == "certificate" && (expiryDate == null || expiryDate >= $today)] | order(issueDate desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        description,
        pdfFile,
        issueDate,
        expiryDate
      }
    `;
    
    const data = await sanityClient.fetch(query, { today });
    return { data };
  } catch (error) {
    console.error('Error fetching active certificates:', error);
    return { data: [], error: 'Failed to fetch active certificates' };
  }
}

// CaseStudy queries
export async function getCaseStudies(): Promise<QueryResult<CaseStudy[]>> {
  try {
    const query = `
      *[_type == "caseStudy"] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        sector,
        problem,
        solution,
        result,
        gallery,
        slug
      }
    `;
    
    const data = await sanityClient.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return { data: [], error: 'Failed to fetch case studies' };
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<QueryResult<CaseStudy | null>> {
  try {
    const query = `
      *[_type == "caseStudy" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        sector,
        problem,
        solution,
        result,
        gallery,
        slug
      }
    `;
    
    const data = await sanityClient.fetch(query, { slug });
    return { data };
  } catch (error) {
    console.error('Error fetching case study:', error);
    return { data: null, error: 'Failed to fetch case study' };
  }
}

export async function getCaseStudiesBySector(sector: Sector): Promise<QueryResult<CaseStudy[]>> {
  try {
    const query = `
      *[_type == "caseStudy" && sector == $sector] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        sector,
        problem,
        solution,
        result,
        gallery,
        slug
      }
    `;
    
    const data = await sanityClient.fetch(query, { sector });
    return { data };
  } catch (error) {
    console.error('Error fetching case studies by sector:', error);
    return { data: [], error: 'Failed to fetch case studies by sector' };
  }
}

// Page queries
export async function getPages(): Promise<QueryResult<Page[]>> {
  try {
    const query = `
      *[_type == "page"] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        content,
        slug,
        seo
      }
    `;
    
    const data = await sanityClient.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching pages:', error);
    return { data: [], error: 'Failed to fetch pages' };
  }
}

export async function getPageBySlug(slug: string): Promise<QueryResult<Page | null>> {
  try {
    const query = `
      *[_type == "page" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        content,
        slug,
        seo
      }
    `;
    
    const data = await sanityClient.fetch(query, { slug });
    return { data };
  } catch (error) {
    console.error('Error fetching page:', error);
    return { data: null, error: 'Failed to fetch page' };
  }
}

// Media queries
export async function getMediaFiles(): Promise<QueryResult<Media[]>> {
  try {
    const query = `
      *[_type == "media"] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        file,
        tags,
        description,
        fileType
      }
    `;
    
    const data = await sanityClient.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching media files:', error);
    return { data: [], error: 'Failed to fetch media files' };
  }
}

export async function getMediaFilesByType(fileType: string): Promise<QueryResult<Media[]>> {
  try {
    const query = `
      *[_type == "media" && fileType == $fileType] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        file,
        tags,
        description,
        fileType
      }
    `;
    
    const data = await sanityClient.fetch(query, { fileType });
    return { data };
  } catch (error) {
    console.error('Error fetching media files by type:', error);
    return { data: [], error: 'Failed to fetch media files by type' };
  }
}

export async function getMediaFilesByTag(tag: string): Promise<QueryResult<Media[]>> {
  try {
    const query = `*[_type == "media" && $tag in tags] | order(_createdAt desc)`;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await (sanityClient as any).fetch(query, { tag });
    return { data };
  } catch (error) {
    console.error('Error fetching media files by tag:', error);
    return { data: [], error: 'Failed to fetch media files by tag' };
  }
}

// Utility functions
export function getLocalizedText(text: { tr: string; en: string }, language: Language): string {
  return text[language] || text.tr || text.en || '';
}

export function getLocalizedContent(content: { tr: SanityBlock[]; en: SanityBlock[] }, language: Language): SanityBlock[] {
  return content[language] || content.tr || [];
}

// Search function
export async function searchContent(searchTerm: string, language: Language = 'tr'): Promise<QueryResult<(ProductFamily | ProductVariant | CaseStudy | Page)[]>> {
  try {
    const query = `
      *[
        _type in ["productFamily", "productVariant", "sectorSolution", "caseStudy", "page"] &&
        (
          title.${language} match $searchTerm + "*" ||
          description.${language} match $searchTerm + "*" ||
          sectorName.${language} match $searchTerm + "*"
        )
      ] | order(_score desc) {
        _id,
        _type,
        title,
        description,
        sectorName,
        slug,
        _score
      }
    `;
    
    const data = await sanityClient.fetch(query, { searchTerm });
    return { data };
  } catch (error) {
    console.error('Error searching content:', error);
    return { data: [], error: 'Failed to search content' };
  }
}

// Example usage function
export async function getHomepageData() {
  try {
    const [productFamiliesResult, certificatesResult, caseStudiesResult] = await Promise.all([
      getProductFamilies(),
      getActiveCertificates(),
      getCaseStudies(),
    ]);

    return {
      productFamilies: productFamiliesResult.data?.slice(0, 6) || [],
      certificates: certificatesResult.data?.slice(0, 3) || [],
      caseStudies: caseStudiesResult.data?.slice(0, 3) || [],
      errors: [
        productFamiliesResult.error,
        certificatesResult.error,
        caseStudiesResult.error,
      ].filter(Boolean),
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      productFamilies: [],
      certificates: [],
      caseStudies: [],
      errors: ['Failed to fetch homepage data'],
    };
  }
}