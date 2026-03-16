"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Globe, Layers } from "lucide-react";

const skills = [
    {
        name: "Symfony",
        category: "Backend",
        description: "Enterprise-grade PHP applications with robust architecture and security.",
        icon: <Code2 size={40} />,
        color: "bg-black border-zinc-800",
    },
    {
        name: "Laravel",
        category: "Backend",
        description: "Elegant and rapid development using the most popular PHP framework.",
        icon: <Globe size={40} />,
        color: "bg-black border-zinc-800",
    },
    {
        name: "Flutter",
        category: "Mobile",
        description: "Beautiful, natively compiled applications for mobile, web, and desktop.",
        icon: <Smartphone size={40} />,
        color: "bg-black border-zinc-800",
    },
    {
        name: "Next.js",
        category: "Frontend/Fullstack",
        description: "Modern web experiences with server-side rendering and static generation.",
        icon: <Layers size={40} />,
        color: "bg-black border-zinc-800",
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-32 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
                            TECHNICAL <br />
                            <span className="text-zinc-700">EXPERTISE.</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-md text-zinc-500 text-lg font-light italic"
                    >
                        Solving complex problems with modern frameworks and clean, maintainable code.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`p-8 rounded-3xl border ${skill.color} group transition-all duration-300 hover:border-white`}
                        >
                            <div className="mb-8 text-zinc-600 group-hover:text-white transition-colors duration-300">
                                {skill.icon}
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-mono">
                                {skill.category}
                            </span>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight">{skill.name}</h3>
                            <p className="text-zinc-500 text-sm font-light leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                                {skill.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
