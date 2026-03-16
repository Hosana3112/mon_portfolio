"use client";

import TechnicalExpertiseCarousel from "./TechnicalExpertiseCarousel";

const technologies = [
    { name: "HTML5", slug: "html5" },
    { name: "CSS3", slug: "css3" },
    { name: "JavaScript", slug: "javascript" },
    { name: "PHP", slug: "php" },
    { name: "Symfony", slug: "symfony" },
    { name: "MySQL", slug: "mysql" },
    { name: "Laravel", slug: "laravel" },
    { name: "Next.js", slug: "nextjs" },
    { name: "React", slug: "react" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Git", slug: "git" },
];

export default function Expertise() {
    return (
        <section
            id="expertise"
            className="relative w-full py-12 overflow-hidden"
        >
            <TechnicalExpertiseCarousel technologies={technologies} />
        </section>
    );
}
