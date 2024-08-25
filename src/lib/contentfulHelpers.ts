// lib/contentfulHelpers.ts
import client from './contentful';

interface ContentfulEntryFields {
  [key: string]: any;
}

export const getEntriesForContentTypes = async (contentTypes: string[]): Promise<{ [key: string]: ContentfulEntryFields[] }> => {
  const entries: { [key: string]: ContentfulEntryFields[] } = {};

  for (const contentType of contentTypes) {
    const res = await client.getEntries({ 
      content_type: contentType,
    });

    entries[contentType] = res.items.map(item => ({
      id: item.sys.id,
      ...item.fields
    }));
  }

  return entries;
};

export const getBlogPostBySlug = async (slug: string) => {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
  });

  if (entries.items.length > 0) {
    return entries.items[0];
  }

  return null;
};

// Currently not used
export const getBlogPostById = async (id: string) => {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'sys.id': id,
  });

  if (entries.items.length > 0) {
    return entries.items[0];
  }

  return null;
};



