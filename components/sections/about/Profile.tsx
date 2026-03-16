"use client";

import { motion } from "framer-motion";

export default function Profile() {
    return (
        <section id="about" className="py-32 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-zinc-500 font-mono text-sm mb-4 block uppercase tracking-widest">
                        À propos // Profil
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                        <div className="md:col-span-8">
                            <h2 className="text-4xl md:text-7xl font-bold mb-12 tracking-tighter leading-none">
                                Développeuse <span className="text-zinc-600 italic">Full-Stack</span> Web & Mobile
                            </h2>

                            <div className="space-y-8">
                                <p className="text-zinc-400 text-xl md:text-2xl font-light leading-relaxed">
                                    Développeuse full-stack spécialisée dans la conception et le développement d’applications web et mobiles modernes.
                                    J’interviens sur l’ensemble du cycle de développement, de l’analyse des besoins à la mise en production, avec une attention particulière portée à la performance, à l’architecture et à l’expérience utilisateur.
                                </p>

                                <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed border-l-2 border-zinc-800 pl-8">
                                    Mes compétences couvrent aussi bien le back-end que le front-end, avec une pratique régulière de Symfony, Laravel, Next.js et Flutter pour la création de solutions robustes, évolutives et orientées métier.
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-4 flex flex-col justify-end">
                            <div className="pt-12 md:pt-0">
                                <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-4">
                                    Expertise
                                </div>
                                <ul className="space-y-4 text-zinc-400 font-medium">
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                        Next.js & React
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                        Symfony & Laravel
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                        Flutter & Mobile
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                        Architecture & UX
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
