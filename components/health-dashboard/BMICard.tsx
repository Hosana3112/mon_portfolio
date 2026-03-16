'use client';

import { useMetricsStore } from '@/hooks/useMetricsStore';
import { GlassCard } from '@/components/health-dashboard/GlassCard';
import { motion } from 'framer-motion';
import { Scale, Ruler, Activity } from 'lucide-react';

export const BMICard = () => {
    const { weight, height, setWeight, setHeight, getBMI, getBMICategory } = useMetricsStore();

    const bmi = getBMI();
    const category = getBMICategory();

    return (
        <GlassCard className="col-span-full lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side: Inputs */}
                <div className="flex-1 space-y-6">
                    <header className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                            <Activity size={18} />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Body Metrics</h3>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
                                <Scale size={14} /> Weight (kg)
                            </label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
                                <Ruler size={14} /> Height (cm)
                            </label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold text-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Result */}
                <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/10 min-w-[200px]">
                    <span className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">BMI Index</span>
                    <motion.div
                        key={bmi}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-5xl font-black mb-2"
                        style={{ color: category.color }}
                    >
                        {bmi}
                    </motion.div>
                    <div
                        className="px-4 py-1.5 rounded-full text-sm font-bold tracking-tight"
                        style={{ backgroundColor: `${category.color}20`, color: category.color, border: `1px solid ${category.color}40` }}
                    >
                        {category.label}
                    </div>
                </div>
            </div>

            {/* BMI Visual Scale */}
            <div className="mt-8">
                <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-tighter mb-2">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full flex overflow-hidden">
                    <div className="h-full bg-sky-400/30" style={{ width: '18.5%' }} />
                    <div className="h-full bg-green-400/30" style={{ width: '25%' }} />
                    <div className="h-full bg-amber-400/30" style={{ width: '30%' }} />
                    <div className="h-full bg-red-400/30 flex-1" />
                </div>
                {/* Indicator hook */}
                <motion.div
                    animate={{ x: `${Math.min(bmi * 2, 100)}%` }}
                    className="w-1 h-4 bg-white -mt-3.5 rounded-full relative z-20 shadow-[0_0_10px_#fff]"
                />
            </div>
        </GlassCard>
    );
};
