import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
}

export default function Posts() {
    const posts = [
        { title: 'Sony – The Rise, the Fall, and the Reinvention', date: '8th June 2025 / Legacy Archive', link: '/sony-story' },
        { title: 'sahxiety – Why Did I Create This?', date: '11 May 2025', link: '/' }
    ]

    return (
        <motion.div {...pageTransition} className="page-content">
            <h1>Posts</h1>
            <ul className="posts-list">
                {posts.map((post, index) => (
                    <li key={index}>
                        <Link to={post.link}>{post.title}</Link>
                        <span className="post-date">{post.date}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
