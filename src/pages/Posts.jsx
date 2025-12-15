import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Fuse from 'fuse.js'
import { fetchPosts } from '../lib/sanity'
import LoadingSpinner from '../components/LoadingSpinner'

const pageTransition = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
    transition: { duration: 0.5 }
}

import { formatDate } from '../lib/dateFormatter'

export default function Posts() {
    const [query, setQuery] = useState('')
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchPosts()
            setPosts(data)
            setLoading(false)
        }
        loadPosts()
    }, [])

    // Fuse.js configuration
    const fuse = useMemo(() => new Fuse(posts, {
        keys: ['title', 'category', 'excerpt'],
        threshold: 0.4,
    }), [posts])

    const filteredPosts = useMemo(() => {
        if (!query) return posts
        return fuse.search(query).map(result => result.item)
    }, [query, fuse, posts])

    // Helper to determine link URL
    const getLink = (post) => {
        if (post.slug && post.slug.current === 'sony-story') return '/sony-story' // Keep specialty page
        if (post.slug && post.slug.current === 'intro') return '/' // Exception for intro if wanted
        return `/posts/${post.slug.current}`
    }

    if (loading) return <LoadingSpinner />

    return (
        <motion.div {...pageTransition} className="page-content">
            <h1>Posts</h1>

            {/* Search Bar */}
            <div style={{ marginBottom: '3rem', position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '16px 24px',
                        fontSize: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '30px',
                        color: '#fff',
                        outline: 'none',
                        fontFamily: 'var(--font-heading)',
                        backdropFilter: 'blur(10px)'
                    }}
                />
                <span style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0.5,
                    pointerEvents: 'none'
                }}>
                    🔍
                </span>
            </div>

            <ul className="posts-list">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <motion.li
                                key={post._id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                style={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                    marginBottom: '2rem',
                                    paddingBottom: '2rem'
                                }}
                            >
                                <span style={{
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    color: '#8a2be2',
                                    marginBottom: '8px',
                                    display: 'block'
                                }}>
                                    {post.category || 'Thought'}
                                </span>
                                <Link to={getLink(post)} style={{ display: 'block', marginBottom: '8px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    {post.title}
                                </Link>
                                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                                    {post.excerpt}
                                </p>
                                {post.publishedAt && (
                                    <span className="post-date" style={{
                                        display: 'block',
                                        marginTop: '4px',
                                        fontSize: '0.9rem',
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        marginBottom: '12px'
                                    }}>
                                        {formatDate(post.publishedAt)}
                                        {post.slug?.current === 'sony-story' && ' / Legacy Archive'}
                                    </span>
                                )}
                            </motion.li>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '2rem' }}
                        >
                            No signals found.
                        </motion.div>
                    )}
                </AnimatePresence>
            </ul>
        </motion.div>
    )
}
