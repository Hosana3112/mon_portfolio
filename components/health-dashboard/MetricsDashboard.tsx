'use client';

import { useMetricsStore } from '@/hooks/useMetricsStore';
import { StatCard } from '@/components/health-dashboard/StatCard';
import { BMICard } from '@/components/health-dashboard/BMICard';
import { Footprints, Flame, Calendar, User, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const HealthScene = dynamic(() => import('@/components/health-dashboard/three/HealthScene').then(mod => mod.HealthScene), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />
});

export const MetricsDashboard = () => {
    const { steps, calories } = useMetricsStore();
    const [isLightMode, setIsLightMode] = useState(false);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <>
            <HealthScene />
            <main className={`relative min-h-screen px-4 py-12 md:px-8 lg:px-16 flex flex-col items-center transition-colors duration-700 ${isLightMode ? 'bg-slate-50' : 'bg-transparent'}`}>
                {/* Dashboard Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-6xl mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-xs">
                            <div className="w-8 h-[1px] bg-indigo-500" />
                            Health Intelligence
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-black tracking-tight transition-colors ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                            Vital<span className="text-indigo-500">Scope</span> Dashboard
                        </h1>
                        <p className={`font-medium transition-colors ${isLightMode ? 'text-slate-500' : 'text-white/40'}`}>Real-time biometrics & energy visualization</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setIsLightMode(!isLightMode)}
                            className={`p-3 rounded-2xl border transition-all duration-300 ${isLightMode ? 'bg-white border-slate-200 text-slate-600 shadow-sm' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                        >
                            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <div className={`flex items-center gap-4 border rounded-2xl p-3 backdrop-blur-md transition-all ${isLightMode ? 'bg-white/80 border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'}`}>
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                                <User size={20} />
                            </div>
                            <div className={`pr-4 border-r transition-colors ${isLightMode ? 'border-slate-200' : 'border-white/10'}`}>
                                <p className={`text-[10px] uppercase font-black tracking-widest transition-colors ${isLightMode ? 'text-slate-400' : 'text-white/30'}`}>Active User</p>
                                <p className={`text-sm font-bold leading-tight transition-colors ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Zitti Hosana</p>
                            </div>
                            <div className={`flex items-center gap-2 transition-colors ${isLightMode ? 'text-slate-500' : 'text-white/60'}`}>
                                <Calendar size={14} />
                                <span className="text-xs font-medium">Feb 26, 2026</span>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Grid Layout */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
                >
                    {/* Main Stats */}
                    <StatCard
                        icon={Footprints}
                        label="Steps Count"
                        value={steps}
                        unit="steps"
                        color="#6366f1" // Indigo-500
                        delay={0.1}
                    />
                    <StatCard
                        icon={Flame}
                        label="Active Calories"
                        value={calories}
                        unit="kcal"
                        color="#f43f5e" // Rose-500
                        delay={0.2}
                    />

                    {/* BMI Calculator Card (Spans multiple columns) */}
                    <BMICard />

                    {/* Placeholder for more futuristic features */}
                    <motion.div variants={item} className="col-span-full mt-4 flex justify-center">
                        <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                            System Status: Synchronized & Optimized
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </>
    );
};
