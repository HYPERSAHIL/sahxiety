import { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
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

export default function Newsletter() {
    const [submitted, setSubmitted] = useState(false)

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
                width: '100%'
            }}>

                {/* Left Side: Content */}
                <div className="newsletter-content" style={{ textAlign: 'left' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', lineHeight: '1.1' }}>Stay in the Loop</h1>
                    <p style={{ fontSize: '1.25rem', color: '#ccc', marginBottom: '2rem' }}>
                        A space for my late-night thoughts, failed projects, and everything in between. No spam, just raw, honest updates.
                    </p>

                    <form
                        action="https://docs.google.com/forms/d/e/1FAIpQLSe14a0S7pXLlULmM7DUqpUQ6kurhkV7lMmHWqzebMKIU31-MQ/formResponse"
                        method="post"
                        target="_blank"
                        onSubmit={() => setSubmitted(true)}
                        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                    >
                        <input
                            type="text"
                            name="entry.1746530211"
                            placeholder="Your name"
                            required
                            style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '1rem' }}
                        />
                        <input
                            type="email"
                            name="entry.897979136"
                            placeholder="Your email"
                            required
                            style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '1rem' }}
                        />
                        <button type="submit" style={{ padding: '16px', fontSize: '1.1rem', marginTop: '10px' }}>
                            Join the Circle
                        </button>
                    </form>

                    {submitted && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#00e054', marginTop: '20px', fontWeight: 'bold' }}>
                            Welcome aboard! Check your inbox soon. &#128075;
                        </motion.p>
                    )}
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

            {/* Mobile responsive fix embedded if inline styles are not enough, but CSS media queries in index.css are better. 
          I will stick to inline for the structure but let column wrapping happen naturally or via media query.
          Wait, gridTemplateColumns 1fr 1fr needs a media query for mobile to be 1fr.
      */}
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
