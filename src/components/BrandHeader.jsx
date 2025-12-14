import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei'

function LiquidText() {
    const materialRef = useRef()

    useFrame((state) => {
        if (materialRef.current) {
            // Subtle distortion animation
            materialRef.current.distort = 0.3 + Math.sin(state.clock.getElapsedTime()) * 0.1
            // materialRef.current.color.setHSL(state.clock.getElapsedTime() * 0.05 % 1, 0.5, 0.5) // Optional rainbow pulsing
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            {/* 
        Using a standard serif font via Google Fonts URL proxy for that 'premium' feel.
        'sahxiety' - lowercase as requested.
      */}
            <Text
                font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWbn2PKdFvXDXbtM.woff"
                fontSize={1.5}
                letterSpacing={-0.05}
                lineHeight={1}
                position={[0, 0, 0]}
                anchorX="center"
                anchorY="middle"
            >
                sahxiety
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#ffffff"
                    roughness={0}
                    metalness={1}
                    distort={0.4} // The "Mind bending" part
                    speed={2}
                    reflectivity={1}
                />
            </Text>
        </Float>
    )
}

export default function BrandHeader() {
    return (
        <div style={{ width: '100%', height: '180px', position: 'relative', overflow: 'visible', zIndex: 10 }}>
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                {/* Environment for shiny metal reflections */}
                <Environment preset="city" />

                <LiquidText />

                {/* Subtle sparkles to attract the eye subconsciously */}
                <Sparkles count={20} scale={3} size={2} speed={0.4} opacity={0.5} color="#8a2be2" />
            </Canvas>
        </div>
    )
}
