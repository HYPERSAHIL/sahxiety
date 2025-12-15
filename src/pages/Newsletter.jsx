import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'

const pageTransition = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
    transition: { duration: 0.5 }
}

function FloatingShape() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere args={[1, 32, 32]} scale={1.5}>
                <MeshDistortMaterial
                    color="#8a2be2"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
        </Float>
    )
}

function SuccessMessage() {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ textAlign: 'center', padding: '2rem', background: 'rgba(0, 255, 127, 0.1)', borderRadius: '20px', border: '1px solid rgba(0, 255, 127, 0.3)' }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}
            >
                ✨
            </motion.div>
            <h3 style={{ color: '#00ff7f', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Welcome to the Circle</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>You've successfully joined. Expect something cool in your inbox soon.</p>
        </motion.div>
    )
}

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('https://api.buttondown.com/v1/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${import.meta.env.VITE_BUTTONDOWN_API_KEY}`
                },
                body: JSON.stringify({ email_address: email })
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                const data = await response.json()
                // Handle specific Buttondown error codes
                const errorMessages = {
                    'email_already_exists': 'You\'re already subscribed!',
                    'subscriber_already_exists': 'You\'re already subscribed!',
                    'email_invalid': 'Please enter a valid email address.',
                    'email_empty': 'Please enter your email address.',
                    'rate_limited': 'Too many requests. Please try again later.',
                    'email_blocked': 'This email cannot be subscribed.',
                }
                const errorCode = data.code || Object.keys(data)[0]
                setError(errorMessages[errorCode] || data.detail || 'Something went wrong. Please try again.')
            }
        } catch (err) {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div {...pageTransition} className="page-content" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>

            <div className="newsletter-container" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.03)',
                padding: '4rem',
                borderRadius: '2rem',
                backdropFilter: 'blur(10px)',
                width: '100%',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>

                {/* Left Side: Content */}
                <div className="newsletter-content" style={{ textAlign: 'left' }}>

                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', lineHeight: '1.1' }}>Stay in the Loop</h1>
                                <p style={{ fontSize: '1.25rem', color: '#ccc', marginBottom: '2rem' }}>
                                    A space for my late-night thoughts, failed projects, and everything in between. No spam, just raw, honest updates.
                                </p>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email"
                                        required
                                        style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '1rem', outline: 'none' }}
                                    />

                                    {error && (
                                        <p style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: 0 }}>{error}</p>
                                    )}

                                    <button type="submit" disabled={loading} style={{ padding: '16px', fontSize: '1.1rem', marginTop: '10px', opacity: loading ? 0.7 : 1 }}>
                                        {loading ? 'Joining...' : 'Join the Circle'}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <SuccessMessage key="success" />
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: 3D Element */}
                <div className="newsletter-visual" style={{ height: '300px', width: '100%', minWidth: '250px' }}>
                    <Canvas camera={{ position: [0, 0, 4] }}>
                        <FloatingShape />
                    </Canvas>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', marginTop: '10px' }}>
                        The Orb of Sahxiety
                    </p>
                </div>

            </div>

            <style>{`
        @media (max-width: 768px) {
          .newsletter-container {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 2rem !important;
          }
          .newsletter-visual {
            height: 200px !important;
            order: -1; /* Move visual to top on mobile */
          }
          .newsletter-content h1 {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
        </motion.div>
    )
}
