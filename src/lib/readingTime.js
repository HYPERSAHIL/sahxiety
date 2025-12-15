// Utility to calculate reading time from text content
export function calculateReadingTime(text) {
    if (!text) return 0

    // Average reading speed: 200-250 words per minute
    const wordsPerMinute = 200

    // Handle Sanity block content (array of blocks)
    let wordCount = 0

    if (Array.isArray(text)) {
        // Portable Text format
        text.forEach(block => {
            if (block._type === 'block' && block.children) {
                block.children.forEach(child => {
                    if (child.text) {
                        wordCount += child.text.split(/\s+/).filter(Boolean).length
                    }
                })
            }
        })
    } else if (typeof text === 'string') {
        wordCount = text.split(/\s+/).filter(Boolean).length
    }

    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return minutes
}

export function formatReadingTime(minutes) {
    if (minutes <= 1) return '1 min read'
    return `${minutes} min read`
}
