"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";

import type { RoadmapItem } from "@/types/roadmap";

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { content, dict } = useLanguage();

  const roadmapItems: RoadmapItem[] = content.roadmap || [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Subtle background movement
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-t border-border/50 bg-background py-32 xl:py-48"
    >
      {/* Sticky Background Text */}
      <div className="pointer-events-none absolute inset-0 z-0 flex h-full w-full items-start justify-center overflow-hidden">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <motion.div
            style={{ y: yBackground }}
            className="select-none opacity-[0.08]"
          >
            <div className="whitespace-nowrap text-[20vw] font-black uppercase tracking-tighter">
              {dict.title.roadmap}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-full max-w-lg -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[500px] w-full max-w-lg translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto max-w-6xl px-container">
        {/* Header */}
        <div className="mb-24 flex flex-col gap-4 text-center md:mb-40 md:items-center">
          <BlurReveal>
            <span className="title-counter">[SECTION FOUR]</span>
          </BlurReveal>

          <BlurReveal>
            <h2 className="title">{dict.title.roadmap}</h2>
          </BlurReveal>

          <BlurReveal>
            <p className="mt-3 max-w-xl text-lg font-medium italic tracking-tight text-foreground/60">
              {dict.roadmapDescription}
            </p>
          </BlurReveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Background Line */}
          <div className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-border/40 md:left-1/2" />

          {/* Animated Progress Line */}
          <motion.div
            style={{
              scaleY,
              originY: 0,
            }}
            className="absolute bottom-0 left-6 top-0 z-10 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-primary/70 to-transparent shadow-[0_0_12px_rgba(0,0,0,0.25)] md:left-1/2"
          />

          {/* Timeline Items */}
          <div className="relative z-20 flex w-full flex-col gap-8 md:gap-24">
            {roadmapItems.map((item: RoadmapItem, index: number) => (
              <TimelineNode
                key={item.id}
                item={item}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TimelineNode = ({
  item,
  isEven,
}: {
  item: RoadmapItem;
  isEven: boolean;
}) => {
  return (
    <div
      className={cn(
        "group relative flex w-full items-center justify-between",
        isEven ? "flex-row" : "flex-row-reverse",
      )}
    >
      {/* Empty Side */}
      <div className="hidden w-[calc(50%-3rem)] md:block" />

      {/* Timeline Dot */}
      <div className="absolute left-6 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border/50 bg-background shadow-lg transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-primary/20 md:left-1/2 md:h-10 md:w-10">
        <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-125 md:h-3 md:w-3" />
      </div>

      {/* Content Card */}
      <div className="relative w-full pl-16 md:w-[calc(50%-3rem)] md:pl-0">
        <BlurReveal>
          <div
            className={cn(
              "group/card relative overflow-hidden border border-border/50 bg-secondary/5 p-8 backdrop-blur-md transition-all duration-700 ease-out md:p-10",
              "hover:border-border hover:bg-secondary/20 hover:shadow-2xl",
              isEven ? "md:text-right" : "md:text-left",
            )}
          >
            {/* ID */}
            <span
              className={cn(
                "mb-4 flex text-xs font-mono uppercase tracking-widest text-muted-foreground max-sm:hidden",
                isEven ? "md:justify-end" : "md:justify-start",
              )}
            >
              {item.id}
            </span>

            <div className="relative z-10 flex flex-col gap-3">
              {/* Year */}
              <h3 className="mt-2 font-serif text-4xl font-semibold italic uppercase tracking-tighter text-foreground transition-colors duration-500 group-hover/card:text-primary md:text-5xl lg:text-6xl">
                {item.year}
              </h3>

              {/* Description */}
              <p
                className={cn(
                  "mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base",
                  isEven ? "md:ml-auto" : "md:mr-auto",
                )}
              >
                {item.description}
              </p>

              {/* Tech Stack */}
              <div
                className={cn(
                  "mt-6 flex flex-wrap gap-2",
                  isEven ? "md:justify-end" : "md:justify-start",
                )}
              >
                {item.stack.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground shadow-sm transition-colors duration-300 hover:border-primary/40 hover:text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Large Background Year */}
            <div
              className={cn(
                "pointer-events-none absolute top-1/2 z-0 -translate-y-1/2 select-none text-[8rem] font-black italic text-foreground/[0.035] transition-all duration-700 lg:text-[10rem]",
                isEven ? "left-2 md:left-4" : "right-2 text-right md:right-4",
              )}
            >
              {item.year.slice(2)}
            </div>
          </div>
        </BlurReveal>
      </div>
    </div>
  );
};
