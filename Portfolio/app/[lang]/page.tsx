import Navbar from "@/components/layout/navbar";
import ScrollProgress from "@/components/layout/Scroll-Progress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/about";
import Stack from "@/components/sections/stack";
import Projects from "@/components/sections/projects";
import ManifestoFlow from "@/components/effects/mainfesto-flow";
import Roadmap from "@/components/sections/roadmap";
import Contact from "@/components/sections/contact";

export default function Home() {
    return (
        <>
            <Navbar />
            <ScrollProgress />

            <main className="bg-background relative">
                <Hero />
                <div className="relative z-10 bg-background border-t border-border">
                    <section id="about">
                        <About />
                    </section>
                    <ManifestoFlow />
                    <section className="stack">
                        <Stack />
                    </section>
                    <ManifestoFlow reverse />

                    <section id="projects">
                        <Projects />
                    </section>
                    <ManifestoFlow />
                    <section id="roadmap">
                        <Roadmap />
                    </section>
                    <ManifestoFlow reverse />
                    <section id="contact">
                        <Contact />
                    </section>
                </div>
            </main>
        </>
    )
}