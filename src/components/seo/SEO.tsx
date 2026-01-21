import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    schema?: Record<string, any>;
    type?: 'website' | 'article';
}

export const SEO = ({
    title,
    description,
    keywords = [],
    canonical = 'https://excel-clean.vercel.app',
    schema,
    type = 'website'
}: SEOProps) => { // Removed React.FC type to avoid import if not needed
    const siteTitle = "DataScrub | Excel Cleaner";
    const fullTitle = title === siteTitle ? title : `${title} | DataScrub`;

    return (
        <Helmet>
            {/* Standard Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(', ')} />
            )}
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content="DataScrub" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />

            {/* Schema.org Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
