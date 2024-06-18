// pages/server-sitemap.xml/index.tsx
import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { db } from '../api/firebase/firebase'; // Adjust the import path as necessary
import { collection, getDocs } from 'firebase/firestore';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Fetch recipes from Firestore
    const recipesRef = collection(db, 'recipes');
    const recipesSnapshot = await getDocs(recipesRef);

    const fields: ISitemapField[] = recipesSnapshot.docs.map(doc => {
        const item = doc.data();

        if (item.data && item.data.slug) {
            return {
                loc: `https://www.zesti.ai/recipes/${doc.id}/${item.data.slug}`, // Access slug directly if it's a root property
                lastmod: new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.9,
            };
        } else {
            // Handle missing slug
            console.warn(`Missing slug for document ID: ${doc.id}`);
            return {
                loc: `https://www.zesti.ai/recipe/${doc.id}`, // Use a default URL without slug
                lastmod: new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.8,
            };
        }
    });

    // Generate sitemap
    return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {
    return null; // This page does not render any content
}
