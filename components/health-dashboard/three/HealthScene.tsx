'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { FloatingGeometry } from './FloatingGeometry';

const CameraController = () => {
    const mouse = useRef({ x: 0, y: 0 });

    if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    useFrame((state) => {
        state.camera.position.x += (mouse.current.x * 2 - state.camera.position.x) * 0.05;
        state.camera.position.y += (mouse.current.y * 2 - state.camera.position.y) * 0.05;
        state.camera.lookAt(0, 0, 0);
    });

    return null;
};

export const HealthScene = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-black opacity-60" />
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                style={{ pointerEvents: 'none' }}
                gl={{ antialias: true, alpha: true }}
            >
                <CameraController />
                <FloatingGeometry />
            </Canvas>
        </div>
    );
};
