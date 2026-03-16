"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Magnetic from "@/components/animations/Magnetic";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "outline";
    target?: string;
    rel?: string;
    ariaLabel?: string;
}

export default function Button({
    children,
    href,
    onClick,
    className = "",
    variant = "outline",
    target,
    rel,
    ariaLabel,
}: ButtonProps) {
    const baseStyles = "relative flex items-center justify-center rounded-full transition-all duration-300 px-8 py-3 uppercase tracking-[0.2em] text-xs font-bold";

    const variants = {
        primary: "bg-white text-black hover:bg-zinc-200",
        outline: "border border-zinc-700 text-white hover:border-white hover:bg-white hover:text-black",
    };

    const content = (
        <motion.div
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </motion.div>
    );

    return (
        <Magnetic>
            {href ? (
                <a
                    href={href}
                    target={target}
                    rel={rel}
                    aria-label={ariaLabel}
                    className="inline-block"
                >
                    {content}
                </a>
            ) : (
                <button
                    onClick={onClick}
                    aria-label={ariaLabel}
                    className="inline-block"
                >
                    {content}
                </button>
            )}
        </Magnetic>
    );
}
