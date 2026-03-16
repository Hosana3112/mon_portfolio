"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Transform values based on scroll
    // Animation completes over 500px of scroll
    const scrollRange = [0, 500];
    const scale = useTransform(scrollY, scrollRange, [1, 0.15]);

    // Smooth transition from center to top-left
    const x = useTransform(scrollY, scrollRange, ["0vw", "-42vw"]);
    const y = useTransform(scrollY, scrollRange, ["0vh", "-45vh"]);

    // Fade out elements when scrolling
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative h-[120vh] w-full flex flex-col items-center"
        >
            {/* Fixed container for the shrinking name effect */}
            <motion.div
                style={{
                    scale,
                    x,
                    y,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="pointer-events-none z-[100] flex items-center justify-center whitespace-nowrap"
            >
                <h1 className="text-[15vw] md:text-[10rem] font-bold tracking-tighter leading-none drop-shadow-2xl">
                    Hosana Zitti
                </h1>
            </motion.div>

            {/* Spacer and flow content to avoid overlap */}
            <div className="relative h-screen w-full flex flex-col items-center justify-center">
                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-[30vh] flex flex-col items-center gap-8 text-center"
                >
                    <p className="text-zinc-500 text-lg md:text-xl font-light tracking-wide uppercase">
                        Full-stack Web & Mobile Developer
                    </p>
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Scroll to explore</span>
                    <div className="h-12 w-[1px] bg-gradient-to-b from-zinc-800 to-transparent" />
                    <ArrowDown className="text-zinc-500 animate-bounce" size={20} />
                </motion.div>
            </div>
        </section>
    );
}
