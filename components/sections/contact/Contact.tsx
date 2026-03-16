"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setTimeout(() => setStatus("success"), 2000);
    };

    return (
        <section id="contact" className="py-32 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-[12rem] font-bold tracking-tighter uppercase leading-none"
                    >
                        Let's <span className="text-zinc-600">Talk.</span>
                    </motion.h2>
                </div>

                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="flex flex-col gap-4">
                                <label className="text-xs uppercase tracking-widest text-zinc-400 font-mono">Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="bg-transparent border-b border-zinc-700 py-4 outline-none focus:border-white transition-colors placeholder:text-zinc-500 text-white"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="text-xs uppercase tracking-widest text-zinc-400 font-mono">Email</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    className="bg-transparent border-b border-zinc-700 py-4 outline-none focus:border-white transition-colors placeholder:text-zinc-500 text-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="text-xs uppercase tracking-widest text-zinc-400 font-mono">Project Details</label>
                            <textarea
                                rows={4}
                                placeholder="Tell me about your project..."
                                required
                                className="bg-transparent border-b border-zinc-700 py-4 outline-none focus:border-white transition-colors placeholder:text-zinc-500 text-white resize-none"
                            />
                        </div>

                        <div className="flex justify-center mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={status !== "idle"}
                                className={`group relative flex h-24 w-24 items-center justify-center rounded-full border border-zinc-800 bg-transparent transition-all duration-500 ${status === "success" ? "bg-white text-black border-white" : "hover:border-white"
                                    }`}
                            >
                                {status === "idle" && <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={32} />}
                                {status === "sending" && <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-white" />}
                                {status === "success" && <Check className="text-black" size={32} />}
                            </motion.button>
                        </div>

                        {status === "success" && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center text-zinc-400 font-light mt-4"
                            >
                                Message sent successfully! I'll get back to you soon.
                            </motion.p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
