"use client";

import { ArrowRight } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { useState } from "react";
import { AboutModal } from "@/components/modals/about-modal";
import { HangingProfile } from "@/components/widgets/hanging-profile";

export default function About() {
  const { dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full container-void bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-container">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-32">
          {/* Left Side */}
          <div className="xl:w-1/4">
            <div className="flex flex-col gap-4 sticky top-32">
              <BlurReveal>
                <span className="title-counter">[Section-One]</span>
              </BlurReveal>

              <BlurReveal>
                <h2 className="title-relative z-10">{dict.title.about}</h2>
              </BlurReveal>

              <div className="mt-8 flex justify-center xl:justify-start">
                <HangingProfile />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="xl:w-3/4 flex flex-col gap-24">
            <div className="space-y-12">
              {/* Intro */}
              <BlurReveal>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1]">
                  I’m a developer who enjoys building modern web applications
                  and exploring AI-powered solutions.
                </h3>
              </BlurReveal>

              {/* Description */}
              <BlurReveal>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  I work mainly with React, JavaScript, Python, Django, Flask,
                  and REST APIs to build responsive and practical applications.
                  Alongside full-stack development, I’m exploring Generative AI,
                  LLMs, AI Agents, and automation to create smarter software.
                </p>
              </BlurReveal>

              {/* Skills */}
              <BlurReveal>
                <div className="flex flex-wrap gap-3 max-w-3xl">
                  {[
                    "React.js",
                    "JavaScript",
                    "TypeScript",
                    "Tailwind CSS",
                    "Python",
                    "Django",
                    "Flask",
                    "REST API",
                    "MySQL",
                    "AI Agents",
                    "GenAI",
                    "LLMs",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full border border-foreground/10 bg-foreground/5 text-sm md:text-base"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </BlurReveal>

              {/* Read More */}
              <BlurReveal>
                <button
                  onClick={() => setIsOpen(true)}
                  className="group relative inline-flex cursor-pointer items-center gap-2 text-lg md:text-2xl font-medium py-2"
                >
                  <span className="relative z-10 border-b-2 border-foreground/30 pb-1 group-hover:border-foreground transition-all duration-300">
                    {dict.readFullVersion}
                  </span>

                  <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </BlurReveal>

              <AboutModal open={isOpen} onOpenChange={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
