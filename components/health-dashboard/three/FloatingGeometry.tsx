'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const Shape = ({ position, color, speed, distort, radius, type }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(time / 4) * 0.2;
        meshRef.current.rotation.y = Math.cos(time / 4) * 0.2;
    });

    return (
        <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
            {type === 'sphere' ? (
                <Sphere ref={meshRef} args={[radius, 64, 64]} position={position}>
                    <MeshDistortMaterial
                        color={color}
                        speed={speed}
                        distort={distort}
                        radius={radius}
                        metalness={0.6}
                        roughness={0.2}
                    />
                </Sphere>
            ) : (
                <Icosahedron ref={meshRef} args={[radius, 0]} position={position}>
                    <meshStandardMaterial
                        color={color}
                        wireframe
                        transparent
                        opacity={0.3}
                        metalness={0.8}
                        roughness={0.1}
                    />
                </Icosahedron>
            )}
        </Float>
    );
};

export const FloatingGeometry = () => {
    const shapes = useMemo(() => [
        { position: [-4, 2, -5], color: '#4f46e5', speed: 2, distort: 0.4, radius: 1.5, type: 'sphere' },
        { position: [4, -2, -8], color: '#7c3aed', speed: 1.5, distort: 0.5, radius: 2, type: 'sphere' },
        { position: [-2, -3, -4], color: '#312e81', speed: 1, distort: 0.3, radius: 1, type: 'sphere' },
        { position: [6, 3, -10], color: '#1e1b4b', speed: 0.8, distort: 0.2, radius: 4, type: 'icosahedron' },
        { position: [-8, -1, -12], color: '#4338ca', speed: 1.2, distort: 0.3, radius: 3, type: 'icosahedron' },
    ], []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />

            {shapes.map((props, i) => (
                <Shape key={i} {...props} />
            ))}
        </>
    );
};
