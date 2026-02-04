/**
 * Utility functions for working with Figma design context
 */

export interface FigmaPage {
  name: string;
  id: string;
}

export interface FigmaDesignContext {
  document?: {
    children?: Array<{
      type: string;
      name: string;
      id: string;
      children?: unknown[];
    }>;
  };
}

/**
 * Extracts page names from Figma design context JSON
 * @param designContextJson - JSON string from Figma get_design_context
 * @returns Array of page names
 */
export function extractPages(designContextJson: string): FigmaPage[] {
  try {
    if (!designContextJson || designContextJson.trim() === '') {
      return [];
    }

    const designContext: FigmaDesignContext = JSON.parse(designContextJson);

    if (!designContext.document) {
      return [];
    }

    const document = designContext.document;
    const pages: FigmaPage[] = document.children
      ?.filter((node) => node.type === 'CANVAS')
      .map((node) => ({
        name: node.name,
        id: node.id,
      })) || [];

    return pages;
  } catch (error) {
    return [];
  }
}

