import { PortableText } from '@portabletext/react'
import { urlFor } from '../lib/urlFor'

// Define how custom types should render
const myPortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <img
                    src={urlFor(value).width(800).fit('max').auto('format').url()}
                    alt={value.alt || ' '}
                    loading="lazy"
                    style={{
                        maxWidth: '100%',
                        borderRadius: '12px',
                        margin: '2rem 0',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                />
            )
        },
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <a
                    href={value.href}
                    rel={rel}
                    style={{ color: '#8a2be2', textDecoration: 'underline' }}
                >
                    {children}
                </a>
            )
        },
    },
    block: {
        h1: ({ children }) => <h1 style={{ marginTop: '2rem', marginBottom: '1rem' }}>{children}</h1>,
        h2: ({ children }) => <h2 style={{ marginTop: '1.5rem', marginBottom: '0.8rem', color: '#fff' }}>{children}</h2>,
        h3: ({ children }) => <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#ddd' }}>{children}</h3>,
        blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #8a2be2', paddingLeft: '1rem', fontStyle: 'italic', margin: '2rem 0' }}>{children}</blockquote>,
        normal: ({ children }) => <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>{children}</p>,
    }
}

export default function RichText({ value }) {
    if (!value) return null
    return <PortableText value={value} components={myPortableTextComponents} />
}
