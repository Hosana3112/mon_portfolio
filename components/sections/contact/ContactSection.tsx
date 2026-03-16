"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, Send, Check, ExternalLink } from "lucide-react";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "hosanazitti@gmail.com",
        href: "mailto:hosanazitti@gmail.com",
        color: "text-red-500",
        bg: "bg-red-500/10"
    },
    {
        icon: Phone,
        label: "WhatsApp",
        value: "+229 01 43 97 27 50",
        href: "https://wa.me/2290143972750",
        color: "text-green-400",
        bg: "bg-green-400/10"
    }
];

export default function ContactSection() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        // Simple Frontend Validation
        if (!email.includes("@") || !email.includes(".")) {
            setStatus("error");
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setStatus("sending");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                form.reset();
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                
                // Extract error string securely to avoid rendering objects in React
                let errorMsg = "Une erreur est survenue lors de l'envoi.";
                if (typeof result.error === "string") {
                    errorMsg = result.error;
                } else if (result.error && typeof result.error === "object" && result.error.message) {
                    errorMsg = result.error.message;
                }
                
                setErrorMessage(errorMsg);
                setTimeout(() => setStatus("idle"), 8000);
            }
        } catch (error) {
            console.error("Connection error:", error);
            setStatus("error");
            setErrorMessage("Erreur de connexion. Impossible de joindre l'API.");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="relative py-32 px-6 md:px-24 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    {/* Left Side: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                            GET IN <br /> <span className="text-zinc-600">TOUCH.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg md:text-xl font-light mb-12 max-w-md leading-relaxed">
                            Avez-vous un projet en tête? Créons ensemble quelque chose d'extraordinaire.
                        </p>

                        <div className="space-y-6">
                            {contactInfo.map((info, i) => (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    target={info.label === "WhatsApp" ? "_blank" : undefined}
                                    rel={info.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 10 }}
                                    className="group flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-xl ${info.bg} flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform duration-500`}>
                                        <info.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 mb-1">{info.label}</div>
                                        <div className="text-lg font-medium text-white">{info.value}</div>
                                    </div>
                                    <ExternalLink size={16} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity mr-2" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/5 relative group"
                    >
                        {/* Glassmorphism subtle glow */}
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Entrez votre nom"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 transition-colors text-white placeholder:text-zinc-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 transition-colors text-white placeholder:text-zinc-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Qu'allons-nous construire?"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 transition-colors text-white placeholder:text-zinc-700 resize-none"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={status === "sending"}
                                className={`w-full h-16 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs transition-all duration-500 ${status === "success"
                                    ? "bg-green-500 text-white"
                                    : status === "error"
                                        ? "bg-rose-500 text-white"
                                        : "bg-white text-black hover:bg-zinc-200 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                    }`}
                            >
                                {status === "idle" && (
                                    <>
                                        Send Message
                                        <Send size={16} />
                                    </>
                                )}
                                {status === "sending" && (
                                    <>
                                        Sending...
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                                    </>
                                )}
                                {status === "success" && (
                                    <>
                                        Message sent successfully!
                                        <Check size={16} />
                                    </>
                                )}
                                {status === "error" && (
                                    <>
                                        Failed to send message
                                    </>
                                )}
                            </motion.button>

                            {status === "error" && errorMessage && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-rose-500 text-[10px] uppercase tracking-widest font-bold text-center mt-2"
                                >
                                    {errorMessage}
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
