import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Cloud, Float } from '@react-three/drei'

function Particles() {
    const ref = useRef()
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useFrame((state, delta) => {
        if (ref.current) {
            // Auto rotation
            ref.current.rotation.x -= delta / 15
            ref.current.rotation.y -= delta / 20

            // Mouse interaction (Parallax)
            // LERP towards mouse position for smooth follow
            const targetX = (state.mouse.x * 0.2)
            const targetY = (state.mouse.y * 0.2)

            ref.current.rotation.x += (targetY - ref.current.rotation.x) * delta * 0.5
            ref.current.rotation.y += (targetX - ref.current.rotation.y) * delta * 0.5
        }
    })

    return (
        <group ref={ref}>
            {/* Main starfield */}
            <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
            {/* Subtle distant cloud/nebula feeling */}
            <Cloud opacity={0.1} speed={0.2} width={10} depth={1.5} segments={10} color="#220033" position={[0, -5, -20]} />
        </group>
    )
}

export default function ThreeBackground() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#050505' }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Particles />
                <ambientLight intensity={0.5} />
                {/* Subtle fog for depth */}
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 5, 25]} />

                {/* Floating subtle elements can be added here */}
            </Canvas>
        </div>
    )
}
