"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { sanitizePhone } from "@/lib/utils";
import { ShineButton } from "@/components/ui/shine-button";

export default function Contact() {
  const { content, dict } = useLanguage();

  return (
    <section className="relative pt-24 md:pt-32 xl:pt-48 bg-background overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-container relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="flex flex-col gap-4 mb-16 lg:mb-32">
            <BlurReveal>
              <span className="title-counter">[SECTION FIVE]</span>
            </BlurReveal>

            <BlurReveal>
              <h2 className="title">{dict.title.contact}</h2>
            </BlurReveal>

            <BlurReveal>
              <p className="text-lg mt-3 max-w-2xl italic font-medium tracking-tight text-foreground/60">
                Let&apos;s build something meaningful together — from modern web
                applications to AI-powered solutions.
              </p>
            </BlurReveal>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col w-full max-w-5xl mx-auto mb-12 sm:mb-24 xl:mb-32 border-t border-border/50">
          {/* Email */}
          <BlurReveal>
            <a
              href={`mailto:${content.contact.email}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-10 md:py-14 border-b border-border/50 transition-all duration-700 hover:px-4 md:hover:px-8"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-500" />

                <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase transition-colors duration-500 group-hover:text-foreground">
                  {dict.sendEmail}
                </span>
              </div>

              <div className="flex items-center gap-6 md:gap-8">
                <span className="text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground break-all transition-all duration-500 group-hover:text-primary">
                  {content.contact.email}
                </span>

                <div className="w-10 h-10 rounded-full border border-border/50 items-center justify-center bg-background group-hover:bg-foreground group-hover:border-foreground transition-all duration-700 shrink-0 hidden md:flex">
                  <ArrowUpRight className="w-6 h-6 text-foreground group-hover:text-background transition-colors duration-500" />
                </div>
              </div>
            </a>
          </BlurReveal>

          {/* Phone */}
          <BlurReveal>
            <a
              href={`tel:${sanitizePhone(content.contact.phone)}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-10 md:py-14 border-b border-border/50 transition-all duration-700 hover:px-4 md:hover:px-8"
            >
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-500" />

                <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase transition-colors duration-500 group-hover:text-foreground">
                  {dict.directLine}
                </span>
              </div>

              <div className="flex items-center gap-6 md:gap-8">
                <span className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground transition-all duration-500 group-hover:text-primary">
                  {content.contact.phone}
                </span>

                <div className="w-10 h-10 rounded-full border border-border/50 items-center justify-center bg-background group-hover:bg-foreground group-hover:border-foreground transition-all duration-700 shrink-0 hidden md:flex">
                  <ArrowUpRight className="w-6 h-6 text-foreground group-hover:text-background transition-colors duration-500" />
                </div>
              </div>
            </a>
          </BlurReveal>
        </div>

        {/* Footer */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pb-12 pt-8 border-t border-border/50 gap-8">
          {/* Copyright */}
          <div className="text-xs font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()}</span>

            <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>

            <span>ANMOL . {dict.allRightsReserved}</span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {content.social?.map((link: { label: string; href: string }) => (
              <BlurReveal key={link.label}>
                <ShineButton
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-11 px-6 rounded-full border border-border/60 bg-secondary/10 hover:bg-secondary/30 hover:border-foreground/40 transition-all duration-500 hover:scale-105 active:scale-95"
                  shineClassName="w-8 bg-foreground/10"
                >
                  <span className="relative z-10 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {link.label}

                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </ShineButton>
              </BlurReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
