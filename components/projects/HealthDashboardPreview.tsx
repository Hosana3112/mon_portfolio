'use client';

import { motion, animate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Footprints, Flame, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HealthDashboardPreview() {
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Tilt effects
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    useEffect(() => {
        const stepsControls = animate(0, 8432, {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 2,
            onUpdate: (latest) => setSteps(Math.floor(latest)),
        });
        const calControls = animate(0, 1850, {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 2,
            onUpdate: (latest) => setCalories(Math.floor(latest)),
        });
        return () => {
            stepsControls.stop();
            calControls.stop();
        };
    }, []);

    return (
        <Link href="/projects/health-dashboard" className="block w-full h-full perspective-[1000px]">
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.02 }}
                className="relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col group cursor-pointer"
            >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-rose-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                {/* minimalist Center Content */}
                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="relative z-10 flex-1 p-8 md:p-12 flex flex-col justify-center items-center backdrop-blur-sm"
                >
                    <div className="text-center group-hover:scale-105 transition-transform duration-500">
                        <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-[10px] mb-4">
                            <div className="w-6 h-[1px] bg-indigo-500" />
                            Biometrics Engine
                            <div className="w-6 h-[1px] bg-indigo-500" />
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
                            HEALTH <br /> <span className="text-indigo-500">INTELLIGENCE</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center">
                            <div className="text-indigo-400 mb-3">
                                <Footprints size={24} />
                            </div>
                            <div className="text-3xl font-black text-white">{steps.toLocaleString()}</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Steps</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center">
                            <div className="text-rose-400 mb-3">
                                <Flame size={24} />
                            </div>
                            <div className="text-3xl font-black text-white">{calories.toLocaleString()}</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Kcal</div>
                        </div>
                    </div>

                    {/* View project indicator */}
                    <div className="mt-12 flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-center">
                        Explore Interface
                        <div className="h-[1px] w-12 bg-indigo-500/50 group-hover:w-20 transition-all duration-700" />
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 pointer-events-none">
                    <Activity size={300} strokeWidth={0.5} />
                </div>
            </motion.div>
        </Link>
    );
}
