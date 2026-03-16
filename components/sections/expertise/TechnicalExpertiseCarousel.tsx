'use client';

import { motion } from 'framer-motion';

interface Technology {
    name: string;
    slug: string;
}

interface TechnicalExpertiseCarouselProps {
    technologies: Technology[];
}

export default function TechnicalExpertiseCarousel({ technologies }: TechnicalExpertiseCarouselProps) {
    // Duplicate the technologies to create a seamless infinite loop
    const doubledTechnologies = [...technologies, ...technologies];

    return (
        <div className="relative w-full overflow-hidden py-4">
            {/* Very Subtle Gradient Masks to blend with page background */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: [0, '-50%'],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 25,
                        ease: 'linear',
                    },
                }}
            >
                {doubledTechnologies.map((tech, index) => (
                    <div
                        key={`${tech.slug}-${index}`}
                        className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mx-4 md:mx-6 group shrink-0"
                    >
                        <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.slug}/${tech.slug}-original.svg`}
                            alt={tech.name}
                            className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                            draggable={false}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
