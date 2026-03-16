'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const GlassCard = ({ children, className = '', delay = 0 }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, y: 0, backdropFilter: 'blur(12px)' }}
            transition={{ duration: 0.8, delay, ease: 'easeOut' }}
            whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
            className={`
        relative overflow-hidden
        bg-glass-bg border border-glass-border rounded-3xl p-6
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
        transition-colors duration-300
        ${className}
      `}
        >
            {/* Glossy highlight line */}
            <div className="absolute inset-0 bg-gradient-to-br from-glass-highlight to-transparent opacity-30 pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
