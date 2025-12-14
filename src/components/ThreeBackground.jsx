import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Cloud, Float } from '@react-three/drei'

function Particles() {
    const ref = useRef()
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })
    return (
        <group ref={ref}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
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
                <fog attach="fog" args={['#050505', 5, 20]} />

                {/* Floating subtle elements can be added here */}
                <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
                    {/* Maybe some mesh here if needed */}
                </Float>
            </Canvas>
        </div>
    )
}
