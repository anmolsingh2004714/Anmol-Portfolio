"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

import { useLanguage } from "@/providers/language-provider";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";

import type { ProjectItem } from "@/types/project";

export default function Projects() {
  const { content, dict } = useLanguage();

  const isDesktop = useMediaQuery(BREAKPOINTS.x1);

  const targetRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  const [scrollRange, setScrollRange] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("auto");

  const [selectedProject, setSelectedProject] =
    useState<ProjectItem | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isDesktop) {
      setScrollRange(0);
      setSectionHeight("auto");
      return;
    }

    const updateMeasurements = () => {
      const container = horizontalContainerRef.current;

      if (!container) return;

      const totalWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;

      const range = Math.max(totalWidth - viewportWidth, 0);

      setScrollRange(range);
      setSectionHeight(`${range + window.innerHeight}px`);
    };

    const frame = requestAnimationFrame(updateMeasurements);

    const timeout = window.setTimeout(updateMeasurements, 150);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateMeasurements);
    });

    if (horizontalContainerRef.current) {
      resizeObserver.observe(horizontalContainerRef.current);
    }

    window.addEventListener("resize", updateMeasurements);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [isDesktop, content.projects]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange],
  );

  const smoothX = useSpring(x, {
    stiffness: 400,
    damping: 60,
    restDelta: 0.5,
  });

  const handleOpenProject = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  return (
    <section
      ref={targetRef}
      data-slot="projects"
      className="relative overflow-x-clip py-20 md:py-28 lg:py-32 xl:py-0"
      style={{
        height: isDesktop ? sectionHeight : "auto",
      }}
    >
      <div
        className={
          isDesktop
            ? "sticky top-0 flex h-screen w-full items-center"
            : "relative flex w-full flex-col"
        }
      >
        {!isDesktop ? (
          <>
            <div className="mb-12 flex flex-col gap-4 px-container">
              <BlurReveal>
                <span className="title-counter">
                  [SECTION THREE]
                </span>
              </BlurReveal>

              <BlurReveal>
                <h2 className="title">
                  {dict.title.projects}
                </h2>
              </BlurReveal>

              <BlurReveal>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {dict.projectsIntro}
                </p>
              </BlurReveal>
            </div>

            <div className="flex w-full max-w-full flex-col gap-container px-container">
              {content.projects.map((project: ProjectItem) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleOpenProject(project)}
                />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            ref={horizontalContainerRef}
            style={{ x: smoothX }}
            className="flex w-max min-w-full items-center px-container"
          >
            <div className="flex w-[60vw] shrink-0 flex-col justify-center xl:w-[40vw]">
              <div className="flex flex-col gap-4">
                <BlurReveal>
                  <span className="title-counter">
                    [SECTION THREE]
                  </span>
                </BlurReveal>

                <BlurReveal>
                  <h2 className="title">
                    {dict.title.projects}
                  </h2>
                </BlurReveal>

                <BlurReveal>
                  <p className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-tight xl:text-5xl">
                    {dict.projectsIntro}
                  </p>
                </BlurReveal>

                <BlurReveal>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="h-px w-20 bg-border xl:w-24" />

                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      {dict.projectsScrollText}
                    </span>
                  </div>
                </BlurReveal>
              </div>
            </div>

            <div className="flex items-center gap-8 pl-12">
              {content.projects.map((project: ProjectItem) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleOpenProject(project)}
                />
              ))}

              <div className="flex h-[70vh] w-[40vw] shrink-0 items-center justify-center">
                <h3 className="select-none text-[10vw] font-black uppercase tracking-tighter text-border/40">
                  {dict.projectsEndText}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <ProjectModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        project={selectedProject}
      />
    </section>
  );
}

const ProjectCard = React.memo(function ProjectCard({
  project,
  onClick,
}: {
  project: ProjectItem;
  onClick?: () => void;
}) {
  const imageSrc =
    typeof project.image === "string"
      ? project.image.trim()
      : "";

  return (
    <BlurReveal>
      <article
        onClick={onClick}
        className="group relative aspect-[4/3] w-full shrink-0 cursor-pointer overflow-hidden rounded-none border border-border/50 bg-muted transition-all duration-700 hover:border-foreground/30 hover:shadow-2xl md:aspect-[16/10] xl:mx-6 xl:w-[45vw]"
      >
        <div className="absolute inset-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={project.title || "Project image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 45vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              priority={String(project.id) === "1"}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-sm text-muted-foreground">
                Project image unavailable
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-95" />

          <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 xl:p-12">
          <div className="flex items-start justify-between gap-4">
            <div className="overflow-hidden">
              <span className="block translate-y-full text-xs font-mono uppercase tracking-widest text-muted-foreground transition-transform duration-500 group-hover:translate-y-0 md:text-sm">
                {project.category}
              </span>
            </div>

            <div className="overflow-hidden">
              <span className="block translate-y-full text-xs font-mono uppercase tracking-widest text-muted-foreground transition-transform delay-100 duration-500 group-hover:translate-y-0 md:text-sm">
                {project.year}
              </span>
            </div>
          </div>

          <div>
            <span className="mb-3 block text-xs font-mono uppercase tracking-[0.2em] text-foreground/50 transition-all duration-500 group-hover:text-foreground/80">
              Project / {project.id}
            </span>

            <h3 className="max-w-[90%] text-4xl font-black uppercase tracking-tighter text-foreground transition-all duration-700 md:text-5xl lg:text-6xl xl:text-7xl">
              {project.title}
            </h3>

            <div className="mt-5 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-all duration-500 group-hover:text-foreground">
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />

              <span>View Project</span>

              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-10 right-4 z-[1] select-none text-[9rem] font-black italic tracking-tighter text-foreground/[0.035] transition-transform duration-1000 group-hover:translate-x-3 md:text-[12rem] xl:text-[15rem]">
          {String(project.id).padStart(2, "0")}
        </div>
      </article>
    </BlurReveal>
  );
});
