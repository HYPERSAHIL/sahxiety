import { motion } from 'framer-motion'

// Animated text that reveals letter by letter
export default function AnimatedHeadline({ text, className = '', delay = 0 }) {
    const letters = text.split('')

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay
            }
        }
    }

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(10px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 200
            }
        }
    }

    return (
        <motion.h1
            className={className}
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexWrap: 'wrap' }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ display: 'inline-block' }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.h1>
    )
}
