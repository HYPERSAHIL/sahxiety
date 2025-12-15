import { motion } from 'framer-motion'
import { Instagram, Film } from 'lucide-react' // Using lucide icons or fallback

const pageTransition = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
    transition: { duration: 0.5 }
}

export default function Contact() {
    return (
        <motion.div {...pageTransition} className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

            <div className="mail-label" style={{ marginBottom: '8px', fontWeight: 'bold' }}>Mail:</div>
            <a href="mailto:sahilakala@gmail.com" className="email-link" style={{ fontSize: '1.2em', color: '#8a2be2', textDecoration: 'none', marginBottom: '40px', display: 'block' }}>
                sahilakala@gmail.com
            </a>

            <a href="https://instagram.com/ig_sahilyadav" target="_blank" rel="noopener noreferrer" className="btn-social instagram-btn">
                <Instagram size={20} style={{ marginRight: '8px' }} />
                Follow on Instagram
            </a>

            <a href="https://letterboxd.com/sahilyad/" target="_blank" rel="noopener noreferrer" className="btn-social letterboxd-btn">
                <span style={{ display: 'flex', gap: '4px', marginRight: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff8000' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e054' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#40bcf4' }}></span>
                </span>
                Click Here to See My Film Journal
            </a>

        </motion.div>
    )
}
