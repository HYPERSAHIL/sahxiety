import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, image, url }) {
    const siteTitle = 'Sahxiety'
    const defaultDescription = 'A digital garden for failed projects, late-night thoughts, and existential musings.'
    const defaultImage = '/images/og-image.png' // We can generate this later or use a placeholder
    const siteUrl = 'https://sahxiety.pages.dev'

    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <link rel="canonical" href={url || siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content={url || siteUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />
        </Helmet>
    )
}
