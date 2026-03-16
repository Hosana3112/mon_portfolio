'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { projects } from '@/data/projects';
import dynamic from 'next/dynamic';

const HealthDashboardPreview = dynamic(() => import('@/components/projects/HealthDashboardPreview'), {
    ssr: false,
    loading: () => <div className="min-w-[85vw] md:min-w-[45vw] aspect-video rounded-[2rem] bg-zinc-900 animate-pulse" />
});

const BeninCulturePreview = dynamic(() => import('@/components/projects/BeninCulturePreview'), {
    ssr: false,
    loading: () => <div className="min-w-[85vw] md:min-w-[45vw] aspect-video rounded-[2rem] bg-zinc-900 animate-pulse" />
});

export default function ProjectsHorizontalCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Mouse drag scroll implementation
    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            slider.classList.remove('active');
        };

        const handleMouseUp = () => {
            isDown = false;
            slider.classList.remove('active');
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section id="projects" className="py-32 overflow-hidden">
            <div className="px-6 md:px-12 mb-16">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black tracking-tighter text-white"
                >
                    Projets réalisés
                </motion.h2>
            </div>

            {/* Carousel Container */}
            <div className="relative group/carousel">
                <div
                    ref={scrollRef}
                    className="flex gap-6 md:gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-12 pb-12 no-scrollbar cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="min-w-[280px] md:min-w-[400px] lg:min-w-[450px] aspect-[4/3] md:aspect-video snap-start flex-shrink-0"
                        >
                            {project.title === "Zenith Dashboard" ? (
                                <HealthDashboardPreview />
                            ) : project.title === "BeninCulture" ? (
                                <BeninCulturePreview />
                            ) : null}
                        </motion.div>
                    ))}

                    {/* Spacer for ending padding */}
                    <div className="min-w-[1px] h-full flex-shrink-0 pr-6 md:pr-12" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="px-6 md:px-12 mt-4 flex items-center gap-4 opacity-10">
                <div className="h-[1px] flex-1 bg-zinc-800" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white">Scroll to explore</span>
                <div className="h-[1px] w-12 bg-zinc-800" />
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
