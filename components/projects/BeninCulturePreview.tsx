'use client';

import { motion, AnimatePresence, animate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Utensils, BookOpen, Music, ExternalLink, Github, ChevronRight } from 'lucide-react';

const tabs = [
    { id: 'recipes', label: 'Recipes', icon: Utensils, color: '#f97316' }, // Orange-500
    { id: 'stories', label: 'Stories', icon: BookOpen, color: '#fbbf24' }, // Amber-400
    { id: 'music', label: 'Music', icon: Music, color: '#84cc16' },      // Lime-500
];

const content = {
    recipes: {
        title: "Traditional Flavors",
        items: ["Amiwo (Pâte Rouge)", "Igname Pilée", "Sauce Goussi"],
        stat: 50,
        statLabel: "Recipes"
    },
    stories: {
        title: "Ancestral Legends",
        items: ["Légende de Dahomey", "Contes de la Tortue", "Rites Royaux"],
        stat: 30,
        statLabel: "Stories"
    },
    music: {
        title: "Sacred Rhythms",
        items: ["Sato & Zinli", "Fanfare de Ouidah", "Chants Vaudou"],
        stat: 20,
        statLabel: "Songs"
    }
};

export default function BeninCulturePreview() {
    const [activeTab, setActiveTab] = useState<'recipes' | 'stories' | 'music'>('recipes');
    const [counts, setCounts] = useState({ recipes: 0, stories: 0, music: 0 });
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
        const rControls = animate(0, 50, { duration: 2, onUpdate: v => setCounts(prev => ({ ...prev, recipes: Math.floor(v) })) });
        const sControls = animate(0, 30, { duration: 2, onUpdate: v => setCounts(prev => ({ ...prev, stories: Math.floor(v) })) });
        const mControls = animate(0, 20, { duration: 2, onUpdate: v => setCounts(prev => ({ ...prev, music: Math.floor(v) })) });

        return () => {
            rControls.stop();
            sControls.stop();
            mControls.stop();
        };
    }, []);

    const activeData = content[activeTab];

    return (
        <a href="http://cultureben.fwh.is" target="_blank" rel="noopener noreferrer" className="block w-full h-full perspective-[1000px]">
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
                {/* Earthy Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-zinc-900 to-amber-950/30 transition-all duration-1000 group-hover:opacity-80" />

                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="relative z-10 flex-1 p-8 md:p-10 flex flex-col backdrop-blur-sm"
                >
                    <div className="text-center w-full mb-8">
                        <div className="flex items-center justify-center gap-2 text-orange-500/80 font-bold tracking-widest uppercase text-[10px] mb-4">
                            <div className="w-6 h-[1px] bg-orange-600" />
                            Cultural Heritage
                            <div className="w-6 h-[1px] bg-orange-600" />
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                            BENIN <br /> <span className="text-orange-500">CULTURE</span>
                        </h3>
                    </div>

                    {/* Interactive Tabs */}
                    <div className="flex gap-1 bg-black/40 p-1 rounded-xl mb-6 border border-white/5" onClick={(e) => e.preventDefault()}>
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveTab(tab.id as any);
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon size={14} />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Content Area */}
                    <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10 relative overflow-hidden flex flex-col justify-center">
                        {/* Decorative Circle */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="relative z-10 flex flex-col items-center"
                            >
                                <div className="text-[40px] font-black text-orange-500 mb-2">
                                    +{counts[activeTab]}
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">
                                    {activeData.statLabel}
                                </div>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {activeData.items.map((item, i) => (
                                        <div key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-white/70">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* View project indicator */}
                    <div className="mt-8 flex justify-center items-center">
                        <div className="flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            Visit Platform
                            <div className="h-[1px] w-12 bg-orange-500/50 group-hover:w-20 transition-all duration-700" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </a>
    );
}
