// pages/server-sitemap.xml/index.tsx
import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { db } from '../api/firebase/firebase';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Fetch recipes from Firestore
    const recipesSnapshot = await db.collection('recipes').get();
    const fields: ISitemapField[] = recipesSnapshot.docs.map(doc => ({
        loc: `https://www.zesti.ai/recipe/${doc.id}`, // Adjust the domain as necessary
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
    }));

    // Generate sitemap
    return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {
    return null; // This page does not render any content
}