"use client";

import { useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function useScrollParticles() {
    const { scrollYProgress } = useScroll();
    const scrollVelocity = useVelocity(scrollYProgress);

    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const [velocity, setVelocity] = useState(0);

    useEffect(() => {
        return smoothVelocity.on("change", (latest) => {
            setVelocity(Math.abs(latest));
        });
    }, [smoothVelocity]);

    // Map scroll progress to sections (0-1)
    // Section 0: Hero (0.0 - 0.2)
    // Section 1: Story (0.2 - 0.5)
    // Section 2: Skills/Projects (0.5 - 0.8)
    // Section 3: Contact (0.8 - 1.0)

    return {
        progress: scrollYProgress,
        velocity: velocity,
        smoothVelocity
    };
}
