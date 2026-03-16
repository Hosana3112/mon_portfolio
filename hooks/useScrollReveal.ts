"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
    trigger?: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    once?: boolean;
    animationProps?: gsap.TweenVars;
}

export default function useScrollReveal(options: ScrollRevealOptions = {}) {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        const {
            trigger = el,
            start = "top 80%",
            end = "bottom 20%",
            scrub = false,
            once = true,
            animationProps = {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            },
        } = options;

        const ctx = gsap.context(() => {
            gsap.from(el, {
                ...animationProps,
                scrollTrigger: {
                    trigger: trigger as any,
                    start,
                    end,
                    scrub,
                    once,
                },
            });
        });

        return () => ctx.revert();
    }, [options]);

    return elementRef;
}
