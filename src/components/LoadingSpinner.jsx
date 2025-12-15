import { motion } from 'framer-motion'

export default function LoadingSpinner() {
    return (
        <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 50
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                    width: '50px',
                    height: '50px',
                    border: '3px solid rgba(255, 255, 255, 0.1)',
                    borderTop: '3px solid #8a2be2',
                    borderRadius: '50%'
                }}
            />
        </div>
    )
}
