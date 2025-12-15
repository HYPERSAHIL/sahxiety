// Utility to format data with "8th June 2025" style
export function formatDate(dateString) {
    if (!dateString) return ''

    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()

    // Add ordinal suffix (st, nd, rd, th)
    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"]
        const v = n % 100
        return n + (s[(v - 20) % 10] || s[v] || s[0])
    }

    return `${getOrdinal(day)} ${month} ${year}`
}
