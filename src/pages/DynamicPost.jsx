import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchPost } from '../lib/sanity'
import RichText from '../components/RichText'
import LoadingSpinner from '../components/LoadingSpinner'
import SEO from '../components/SEO'
import { urlFor } from '../lib/urlFor'

const pageTransition = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
    transition: { duration: 0.5 }
}

export default function DynamicPost() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPost = async () => {
            setLoading(true)
            const data = await fetchPost(slug)
            setPost(data)
            setLoading(false)
        }
        getPost()
    }, [slug])

    if (loading) return <LoadingSpinner />

    if (!post) {
        return (
            <div className="page-content" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h1>Post not found</h1>
                <Link to="/posts" className="btn-premium">Return to Archives</Link>
            </div>
        )
    }

    const { title, mainImage, body, publishedAt } = post
    const imageUrl = mainImage ? urlFor(mainImage)?.width(1200).height(600).url() : null

    return (
        <motion.div {...pageTransition} className="page-content">
            <SEO
                title={title}
                description={post.excerpt} // Ensure fetchPost returns excerpt or we generate it
                image={imageUrl}
            />

            <Link to="/posts" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontSize: '0.9rem' }}>
                ← Back to Posts
            </Link>

            <article>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{title}</h1>
                    {publishedAt && (
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                            {new Date(publishedAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    )}
                </header>

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={title}
                        style={{
                            width: '100%',
                            borderRadius: '16px',
                            marginBottom: '3rem',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                        }}
                    />
                )}

                <div className="post-body">
                    <RichText value={body} />
                </div>
            </article>

            {/* Newsletter CTA at bottom of every post */}
            <div style={{ marginTop: '80px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
                <p style={{ marginBottom: '20px', fontStyle: 'italic', opacity: 0.8 }}>Enjoyed this read?</p>
                <Link to="/newsletter" className="btn-premium">Join the Newsletter</Link>
            </div>
        </motion.div>
    )
}
