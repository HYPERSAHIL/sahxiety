// Sitemap Generator
// Generates sitemap.xml for SEO

import { fetchPosts } from './sanity.js'

const SITE_URL = 'https://sahxiety.pages.dev'

// Static routes
const staticRoutes = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/posts', priority: 0.9, changefreq: 'daily' },
    { path: '/newsletter', priority: 0.7, changefreq: 'monthly' },
    { path: '/socials', priority: 0.6, changefreq: 'monthly' },
    { path: '/sony-story', priority: 0.8, changefreq: 'monthly' },
]

export async function generateSitemap() {
    const posts = await fetchPosts()
    const today = new Date().toISOString().split('T')[0]

    // Generate static route entries
    const staticEntries = staticRoutes.map(route => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')

    // Generate dynamic post entries
    const dynamicEntries = posts
        .filter(post => post.slug?.current && post.slug.current !== 'sony-story')
        .map(post => {
            const lastmod = post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : today
            return `
  <url>
    <loc>${SITE_URL}/posts/${post.slug.current}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
        }).join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticEntries}
  ${dynamicEntries}
</urlset>`
}

export default generateSitemap
