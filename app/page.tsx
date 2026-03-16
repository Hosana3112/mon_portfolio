import Hero from "@/components/sections/hero/Hero";
import Profile from "@/components/sections/about/Profile";
import Expertise from "@/components/sections/expertise/Expertise";
import ProjectsHorizontalCarousel from "@/components/sections/projects/ProjectsHorizontalCarousel";

import ContactSection from "@/components/sections/contact/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col text-white selection:text-black">
      <Hero />
      <Profile />
      <Expertise />
      <ProjectsHorizontalCarousel />
      <ContactSection />
      <Footer />
    </div>
  );
}
