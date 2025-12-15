import { createClient } from '@sanity/client'

// Configuration (will use environment variables)
// Falls back to mock mode if not configured
export const config = {
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: '2023-05-03', // use current date
    useCdn: true, // `false` if you want to ensure fresh data
}

// Create the client
let client = null
try {
    if (config.projectId) {
        client = createClient(config)
    }
} catch (e) {
    console.warn("Sanity client could not be initialized. Using mock data.")
}

export { client }

// Mock Data for fallback
const MOCK_POSTS = [
    {
        _id: 'sony-story',
        title: 'Sony – The Rise, the Fall, and the Reinvention',
        slug: { current: 'sony-story' },
        publishedAt: '2025-06-08',
        category: 'Tech History',
        excerpt: 'How the giant behind the Walkman lost its way and found a new path.',
        isMock: true
    },
    {
        _id: 'intro',
        title: 'sahxiety – Why Did I Create This?',
        slug: { current: 'intro' },
        publishedAt: '2025-05-11',
        category: 'Personal',
        excerpt: 'The origin story of this digital garden.',
        isMock: true
    }
]

// Helper to fetch posts (Real or Mock)
export async function fetchPosts() {
    if (client) {
        try {
            const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
                _id,
                title,
                slug,
                publishedAt,
                "category": categories[0]->title,
                excerpt
            }`)
            return posts.length > 0 ? posts : MOCK_POSTS
        } catch (e) {
            console.error("Sanity fetch failed:", e)
            return MOCK_POSTS
        }
    }
    return MOCK_POSTS
}

export async function fetchPost(slug) {
    if (client) {
        try {
            const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
                title,
                slug,
                mainImage,
                publishedAt,
                body
            }`, { slug })
            return post
        } catch (e) {
            console.error("Sanity fetch failed:", e)
            return null
        }
    }
    return MOCK_POSTS.find(p => p.slug.current === slug)
}
