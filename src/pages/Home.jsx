import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { formatDate } from '../lib/dateFormatter'

const pageTransition = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
    transition: { duration: 0.5 }
}

export default function Home() {
    // Hardcoded date for this static page to match the post list
    const postDate = "2025-05-11"

    return (
        <motion.div {...pageTransition} className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
            <h1>Why Did I Create This?</h1>

            <p className="post-date" style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.5)',
                marginTop: '-0.5rem',
                marginBottom: '2rem'
            }}>
                {formatDate(postDate)}
            </p>

            <p>
                Welcome to <strong>sahxiety</strong>—a portmanteau of my name and the word "anxiety." I know, not the most uplifting combination, but somehow it felt right. It captures that restless energy of always building, questioning, and occasionally overthinking everything.
            </p>
            <p>
                I wanted to build something real and have a space to think out loud. Somewhere I could connect with people who are also figuring things out as they go.
            </p>
            <p>
                This is where I share what I'm working on, lessons from projects that went sideways, and random 2 AM thoughts about tech, creativity, and life in general.
            </p>
            <p>
                New posts show up whenever I have something worth saying—usually weekly or monthly. No fancy writing, no pretending I have it all figured out. Just honest stuff from someone learning as they go.
            </p>
            <p>
                If that sounds like your vibe, stick around. I'm glad you're here.
            </p>
            <p className="signature">— Sahil</p>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Link to="/newsletter" className="btn-premium">Join the Newsletter</Link>
            </div>
        </motion.div>
    )
}
