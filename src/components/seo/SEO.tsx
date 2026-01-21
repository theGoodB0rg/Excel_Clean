import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    schema?: Record<string, any>;
    type?: 'website' | 'article';
    image?: string;
}

export const SEO = ({
    title,
    description,
    keywords = [],
    canonical = 'https://excel-clean.vercel.app',
    schema,
    type = 'website',
    image = 'https://excel-clean.vercel.app/og-image.jpg' // Default generic image
}: SEOProps) => { // Removed React.FC type to avoid import if not needed
    const siteTitle = "Excel Clean | Excel Cleaner";
    const fullTitle = title === siteTitle ? title : `${title} | Excel Clean`;

    // Ensure image is absolute URL
    const fullImage = image.startsWith('http') ? image : `https://excel-clean.vercel.app${image}`;

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
            <meta property="og:site_name" content="Excel Clean" />
            <meta property="og:image" content={fullImage} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Schema.org Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
