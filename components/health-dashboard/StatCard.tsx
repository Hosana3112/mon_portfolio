'use client';

import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from '@/components/health-dashboard/GlassCard';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: number;
    unit: string;
    color: string;
    delay?: number;
}

export const StatCard = ({ icon: Icon, label, value, unit, color, delay = 0 }: StatCardProps) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            delay,
            ease: 'easeOut',
            onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
        });
        return controls.stop;
    }, [value, delay]);

    return (
        <GlassCard delay={delay} className="min-w-[240px]">
            <div className="flex items-start justify-between mb-4">
                <div
                    className="p-3 rounded-2xl"
                    style={{ backgroundColor: `${color}20`, color }}
                >
                    <Icon size={24} />
                </div>
                <div className="text-right">
                    <p className="text-white/50 text-sm font-medium uppercase tracking-wider">{label}</p>
                    <h3 className="text-3xl font-bold text-white mt-1">
                        {displayValue.toLocaleString()}
                        <span className="text-sm font-normal text-white/40 ml-1">{unit}</span>
                    </h3>
                </div>
            </div>

            {/* Mini sparkline or progress bar for aesthetic */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 1.5, delay: delay + 0.5, ease: 'circOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                />
            </div>
        </GlassCard>
    );
};
