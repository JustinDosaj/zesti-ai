// lib/contentfulHelpers.ts
import client from './contentful';

interface ContentfulEntryFields {
  [key: string]: any;
}

export const getEntriesForContentTypes = async (contentTypes: string[]): Promise<{ [key: string]: ContentfulEntryFields[] }> => {
  const entries: { [key: string]: ContentfulEntryFields[] } = {};

  for (const contentType of contentTypes) {
    const res = await client.getEntries({ content_type: contentType });
    entries[contentType] = res.items.map(item => item.fields);
  }

  return entries;
};
