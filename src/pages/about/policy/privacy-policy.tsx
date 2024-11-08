import { GetStaticProps } from 'next';
import { fetchPolicyEntries } from '@/lib/contentfulHelpers';
import { Container } from '@/components/shared/container';
import { options } from './terms-and-conditions';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PolicyProps } from './terms-and-conditions';
import Head from 'next/head';

const PrivacyPolicy: React.FC<PolicyProps> = ({ content }) => {

    return (
        <>
        <Head>
            <title>Privacy Policy | Zesti AI</title>
            <meta name="title" content="Privacy Policy | Zesti AI" />
            <meta name="description" content="Zesti AI Privacy Policy" />
        </Head>
        <main className="bg-white py-24 min-h-screen">
            <Container>
                {content ? 
                    <div className="text-gray-900">{documentToReactComponents(content, options)}</div>
                :
                    <>
                        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
                        <p className="text-gray-900">Content currently unavailable.</p>
                    </>
                }
            </Container>
        </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries = await fetchPolicyEntries('privacyPolicy');
  const content = entries?.[0]?.fields?.content ?? null;

  return {
    props: {
      content,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default PrivacyPolicy;
