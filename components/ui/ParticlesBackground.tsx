"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useSpring, useTransform } from "framer-motion";

function Particles({ count = 2500 }) {
    const points = useRef<THREE.Points>(null);
    const { scrollYProgress } = useScroll();

    // Spring for smooth morphing transitions
    const morphProgress = useSpring(scrollYProgress, {
        damping: 50,
        stiffness: 200,
    });

    // Target 1: Random Cloud (Hero)
    const pos1 = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, [count]);

    // Target 2: Organized Sphere (Story / Skills)
    const pos2 = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            pos[i * 3] = 3.5 * Math.cos(theta) * Math.sin(phi);
            pos[i * 3 + 1] = 3.5 * Math.sin(theta) * Math.sin(phi);
            pos[i * 3 + 2] = 3.5 * Math.cos(phi);
        }
        return pos;
    }, [count]);

    // Target 3: Fluid Grid / Flow (Projects / Contact)
    const pos3 = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const size = Math.sqrt(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = ((i % size) / size - 0.5) * 12;
            pos[i * 3 + 1] = (Math.floor(i / size) / size - 0.5) * 12;
            pos[i * 3 + 2] = 0;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (!points.current) return;
        const time = state.clock.getElapsedTime();
        const p = morphProgress.get();

        const positions = points.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            let targetX, targetY, targetZ;

            // Morphing logic
            if (p < 0.33) {
                // Transition between Cloud and Sphere
                const localP = p / 0.33;
                targetX = pos1[i3] + (pos2[i3] - pos1[i3]) * localP;
                targetY = pos1[i3 + 1] + (pos2[i3 + 1] - pos1[i3 + 1]) * localP;
                targetZ = pos1[i3 + 2] + (pos2[i3 + 2] - pos1[i3 + 2]) * localP;
            } else {
                // Transition between Sphere and Grid
                const localP = (p - 0.33) / 0.67;
                targetX = pos2[i3] + (pos3[i3] - pos2[i3]) * localP;
                targetY = pos2[i3 + 1] + (pos3[i3 + 1] - pos2[i3 + 1]) * localP;
                targetZ = pos2[i3 + 2] + (pos3[i3 + 2] - pos2[i3 + 2]) * localP;
            }

            // Add fluid noise/organic movement
            const noise = Math.sin(time + i * 0.1) * 0.02;
            positions[i3] = targetX + Math.cos(time + i) * 0.01;
            positions[i3 + 1] = targetY + Math.sin(time + i) * 0.01;
            positions[i3 + 2] = targetZ + noise;
        }

        points.current.geometry.attributes.position.needsUpdate = true;
        points.current.rotation.y = time * 0.1;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[pos1, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#ffffff"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ParticlesBackground() {
    const [dpr, setDpr] = useState(1);

    useEffect(() => {
        setDpr(Math.min(window.devicePixelRatio, 2));
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={dpr}
                gl={{ antialias: false, alpha: true }}
            >
                <color attach="background" args={["#000000"]} />
                <ambientLight intensity={0.5} />
                <Particles />
            </Canvas>
        </div>
    );
}
