import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Float, MeshDistortMaterial, Sphere, TorusKnot } from '@react-three/drei'

const pageTransition = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.5 }
}

// Helper to extract username safely
const extractUsername = (url) => {
    try {
        const urlObj = new URL(url)
        const pathSegments = urlObj.pathname.split('/').filter(Boolean) // Remove empty strings
        const lastSegment = pathSegments.pop()
        return lastSegment ? `@${lastSegment}` : 'Visit'
    } catch (e) {
        return 'Visit'
    }
}

// 3D Footer Element: A mysterious floating shape
function DynamicFooterShape() {
    const mesh = useRef()
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <TorusKnot args={[1, 0.3, 100, 16]} ref={mesh}>
                <MeshDistortMaterial
                    color="#444"
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0.1}
                    metalness={1}
                />
            </TorusKnot>
            <Sparkles count={30} scale={4} size={3} speed={0.4} opacity={0.5} color="#fff" />
        </Float>
    )
}

function SocialButton({ name, url, logoUrl, delay }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const displayUsername = extractUsername(url)

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '420px',
                padding: '16px 24px',
                marginBottom: '16px',
                background: 'rgba(20, 20, 20, 0.6)', // Darker, more contrast
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                textDecoration: 'none',
                color: '#fff',
                backdropFilter: 'blur(16px)',
                cursor: 'pointer',
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)' // Deeper shadow for pop
            }}
            whileHover={{
                scale: 1.02,
                background: 'rgba(40, 40, 40, 0.7)',
                borderColor: 'rgba(255,255,255,0.3)',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.7)'
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                marginRight: '24px',
                transform: 'translateZ(20px)',
            }}>
                <img
                    src={logoUrl}
                    alt={`${name} Logo`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                    }}
                />
            </div>

            <div style={{ flex: 1, transform: 'translateZ(10px)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {name}
                </h3>
                {/* INCREASED CONTRAST HERE */}
                <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 2px rgba(0,0,0,1)' }}>
                    {displayUsername}
                </span>
            </div>

            <motion.span
                style={{ opacity: 0.6, transform: 'translateZ(10px)', fontSize: '1.2rem' }}
                whileHover={{ opacity: 1, x: 5 }}
            >
                →
            </motion.span>
        </motion.a>
    )
}

export default function Socials() {
    return (
        <motion.div {...pageTransition} className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', perspective: '1200px' }}>

            {/* 3D Header - Static CSS Typography for performance & cleanness */}
            <div style={{ marginBottom: '40px', marginTop: '20px', textAlign: 'center' }}>
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        background: 'linear-gradient(to bottom right, #fff, #bbb)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        margin: 0,
                        letterSpacing: '-1px'
                    }}
                >
                    Connect
                </motion.h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', fontWeight: '500' }}>Find me on the internet.</p>
            </div>

            <div className="socials-list" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                <SocialButton
                    name="Instagram"
                    url="https://instagram.com/ig_sahilyadav"
                    logoUrl="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                    delay={1}
                />
                <SocialButton
                    name="Letterboxd"
                    url="https://letterboxd.com/sahilyad/"
                    logoUrl="https://a.ltrbxd.com/logos/letterboxd-mac-icon.png"
                    delay={2}
                />
                <SocialButton
                    name="Moctale"
                    url="https://www.moctale.in/u/sahilyad"
                    logoUrl="https://www.moctale.in/favicon.ico" // Favicon is safer
                    delay={3}
                />
                <SocialButton
                    name="X"
                    url="https://www.x.com/sahilyadav2008"
                    logoUrl="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                    delay={4}
                />
                <SocialButton
                    name="Reddit"
                    url="https://www.reddit.com/user/sahilyad/"
                    logoUrl="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png"
                    delay={5}
                />
            </div>

            {/* Dynamic 3D Footer */}
            <div style={{ width: '100%', height: '250px', marginTop: '20px', position: 'relative', zIndex: 5 }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <DynamicFooterShape />
                </Canvas>
            </div>

        </motion.div>
    )
}
