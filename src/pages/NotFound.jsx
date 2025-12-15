import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageTransition = {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(10px)' },
    transition: { duration: 0.5 }
}

export default function NotFound() {
    return (
        <motion.div
            {...pageTransition}
            className="page-content"
            style={{
                textAlign: 'center',
                padding: '4rem 0',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <h1 style={{
                fontSize: '8rem',
                marginBottom: '1rem',
                color: '#8a2be2',
                fontFamily: 'var(--font-heading)',
                textShadow: '0 0 30px rgba(138, 43, 226, 0.5)'
            }}>
                404
            </h1>

            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Lost in Space?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
                The coordinates you entered don't seem to exist in this galaxy.
            </p>

            <Link to="/" className="btn-premium">Return to Base</Link>
        </motion.div>
    )
}
