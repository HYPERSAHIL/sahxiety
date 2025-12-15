// RSS Feed Generator
// This generates an RSS 2.0 feed from blog posts
// Can be called at build time or as an API endpoint

import { fetchPosts } from './sanity.js'

const SITE_URL = 'https://sahxiety.pages.dev'
const SITE_TITLE = 'Sahxiety'
const SITE_DESCRIPTION = 'A digital garden for failed projects, late-night thoughts, and existential musings.'

function escapeXml(str) {
    if (!str) return ''
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

export async function generateRSSFeed() {
    const posts = await fetchPosts()

    const items = posts.map(post => {
        const slug = post.slug?.current || post._id
        const link = slug === 'sony-story' ? `${SITE_URL}/sony-story` : `${SITE_URL}/posts/${slug}`
        const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()

        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(post.excerpt || '')}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`
    }).join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`
}

// Export for use in build scripts
export default generateRSSFeed
