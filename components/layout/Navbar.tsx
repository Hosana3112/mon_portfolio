"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "A propos", href: "/#about" },
    { name: "Projets", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1] as const,
            },
        },
        open: {
            x: 0,
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1] as const,
            },
        },
    };

    const linkVariants = {
        closed: { y: 20, opacity: 0 },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.3 + i * 0.1,
                duration: 0.5,
                ease: "easeOut" as any,
            },
        }),
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-24 py-6 flex justify-between items-center ${scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
                    }`}
            >
                {/* 
                    Brand name removed here because the Hero component now provides 
                    a persistent shrinking identity that lands in this corner.
                */}
                <div className="w-32 h-8" />

                <div className="hidden md:flex gap-12 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <motion.a
                        href="/cv/Hosana_Zitti_CV.pdf"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20 flex items-center gap-2 hover:shadow-indigo-500/40 transition-shadow"
                    >
                        Download CV
                        <Download size={14} />
                    </motion.a>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative z-[60] p-2 text-white hover:text-zinc-400 transition-colors"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6"
                    >
                        <div className="flex flex-col gap-10 text-center items-center">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    custom={i}
                                    variants={linkVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-5xl md:text-7xl font-bold text-white hover:text-zinc-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                custom={navLinks.length}
                                variants={linkVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="mt-4"
                            >
                                <motion.a
                                    href="/cv/Hosana_Zitti_CV.pdf"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-base font-bold uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/40 flex items-center gap-4"
                                >
                                    Download CV
                                    <Download size={20} />
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
