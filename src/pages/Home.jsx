import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
}

export default function Home() {
    return (
        <motion.div {...pageTransition} className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
            <h1>Why Did I Create This?</h1>
            <p>
                So, you might be wondering where the name “sahxiety” comes from. It’s actually a portmanteau—a blend of my name, <strong>Sahil</strong>, and the word <strong>anxiety</strong>. I thought it perfectly captures both a part of who I am and the thoughts I want to share.
            </p>
            <p>
                On this blog, you’ll find everything from my failed projects to late-night existential musings, and pretty much everything in between.
            </p>
            <p>
                I plan to write here weekly or monthly—not as a professional, but as someone who enjoys sharing, reflecting, and sometimes just venting.
            </p>
            <p>
                Thanks for stopping by! See you in the next post.
            </p>
            <p className="signature">Sahil</p>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Link to="/newsletter" className="btn-premium">Join the Newsletter</Link>
            </div>
        </motion.div>
    )
}
