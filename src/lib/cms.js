// This file serves as the abstraction layer for the Headless CMS.
// Currently it returns static data, but it is architected to easily swap 
// with a real Sanity.io or Contentful client.

// Example Sanity Client (Commented out for future implementation)
// import { createClient } from '@sanity/client'
// const client = createClient({
//   projectId: 'your-project-id',
//   dataset: 'production',
//   useCdn: true,
//   apiVersion: '2023-05-03',
// })

// Mock Data mimicking a CMS response
const MOCK_POSTS = [
    {
        id: 'sony-story',
        title: 'Sony – The Rise, the Fall, and the Reinvention',
        slug: 'sony-story',
        date: 'June 8, 2025',
        category: 'Tech History',
        excerpt: 'How the giant behind the Walkman lost its way and found a new path.',
        link: '/sony-story'
    },
    {
        id: 'intro',
        title: 'sahxiety – Why Did I Create This?',
        slug: 'intro',
        date: 'May 11, 2025',
        category: 'Personal',
        excerpt: 'The origin story of this digital garden.',
        link: '/'
    }
]

export const getPosts = async () => {
    // Simulate network delay
    // await new Promise(resolve => setTimeout(resolve, 500))

    // In future: return await client.fetch('*[_type == "post"]')
    return MOCK_POSTS
}

export const getPostBySlug = async (slug) => {
    // In future: return await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
    return MOCK_POSTS.find(post => post.slug === slug)
}
