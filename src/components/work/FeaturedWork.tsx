"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RestrictedPanel } from "./RestrictedPanel";
import s from "./FeaturedWork.module.css";

gsap.registerPlugin(ScrollTrigger);


type Card = {
  id: string;
  title: string;
  tags: string[];
  companyLogo: string | null;
  companyName: string;
  logoWidth: number;
  logoHeight?: number;
  mediaImg?: string;
  alt?: string;
  aspect?: string;
  unoptimized?: boolean;
  status?: "soon" | "restricted";
  restrictedTitle?: string;
  restrictedNote?: string;
};

// Complete 12 Production Projects from CV ordered chronologically (Newest -> Oldest)
const ALL_FEATURED_PROJECTS: Card[] = [
  // --- 1. Nexatriv (Jan 2026 – Present) ---
  {
    id: "nexalab",
    status: "soon",
    title: "Nexalab Platform — Deeply Nested Task Engine",
    tags: ["Rust Core", "PostgreSQL", "DAG Dependency Graph", "10,000+ Tasks"],
    companyLogo: "/images/full-nexatriv-white.png",
    companyName: "Nexatriv",
    logoWidth: 110,
    mediaImg: "/images/projects/coming-soon.webp",
    alt: "Coming soon",
    unoptimized: true,
  },
  {
    id: "erp",
    status: "soon",
    title: "ERP for SMEs — Finance, Inventory & HR Suite",
    tags: ["Modular Monolith", "PostgreSQL", "TypeScript", "ERP Suite"],
    companyLogo: "/images/full-nexatriv-white.png",
    companyName: "Nexatriv",
    logoWidth: 110,
    mediaImg: "/images/projects/coming-soon.webp",
    alt: "Coming soon",
    unoptimized: true,
  },

  // --- 2. Open Source & Hackathons (2026) ---
  {
    id: "agentdeck",
    title: "AgentDeck — Self-Hosted AI Fleet Board",
    tags: ["Go", "PostgreSQL 16", "React 19", "Integer µUSD"],
    companyLogo: null,
    companyName: "Personal Project",
    logoWidth: 0,
    mediaImg: "/images/projects/agentdeck-v3.webp",
    aspect: "16/11.75",
    alt: "AgentDeck fleet orchestration and cost accounting dashboard",
  },
  {
    id: "assay",
    title: "Assay — Active Socratic Learning Engine",
    tags: ["Socratic RAG", "Next.js", "Google Cloud", "MediaPipe Anti-Cheat"],
    companyLogo: "/images/aibuildercup.png",
    companyName: "AI Builder Cup 2026",
    logoWidth: 36,
    logoHeight: 34,
    mediaImg: "/images/projects/assay-v3.webp",
    aspect: "16/9",
    alt: "Assay Socratic assessment and interview quiz interface",
  },

  // --- 3. MGG Software LTD. (Dec 2022 – Jan 2026) ---
  {
    id: "arche",
    title: "Arche Framework — AI Delivery Automation",
    tags: ["Multi-LLM Routing", "TypeScript", "Code Generation", "Docker"],
    companyLogo: "/images/full-mgg-white.png",
    companyName: "MGG Software",
    logoWidth: 135,
    mediaImg: "/images/projects/arche-v3.webp",
    aspect: "2/1",
    alt: "Arche Framework requirements-to-code pipeline interface",
  },
  {
    id: "appeals",
    status: "restricted",
    title: "Singapore Government — Appeal Management System",
    tags: ["Government Compliance", "Spring Boot", "React", "Azure Cloud"],
    companyLogo: "/images/full-mgg-white.png",
    companyName: "MGG Software",
    logoWidth: 135,
    restrictedTitle: "Restricted access",
    restrictedNote:
      "Submission, review and decision workflows. Screen withheld under government confidentiality.",
  },
  {
    id: "parking",
    status: "restricted",
    title: "Singapore Government — Use of Parking Lots",
    tags: ["Lot Inventory & Allocation", "Spring Boot", "React", "Azure Cloud"],
    companyLogo: "/images/full-mgg-white.png",
    companyName: "MGG Software",
    logoWidth: 135,
    restrictedTitle: "Restricted access",
    restrictedNote:
      "Lot inventory, allocation and usage reporting. Screen withheld under government confidentiality.",
  },

  // --- 4. ICUBE by SIRCLO (Apr 2022 – Sep 2022) ---
  {
    id: "senheng",
    title: "Senheng Malaysia eCommerce Platform",
    tags: ["eCommerce PWA", "Next.js", "Magento (PHP)", "GraphQL"],
    companyLogo: "/images/full-icube-white.png",
    companyName: "ICUBE by SIRCLO",
    logoWidth: 120,
    mediaImg: "/images/projects/senheng-v3.webp",
    aspect: "16/10",
    alt: "Senheng live production eCommerce progressive web application",
  },
  {
    id: "wacoal",
    title: "Wacoal Philippines Brand Store",
    tags: ["Global Apparel", "Magento", "High Traffic", "Pen-tested"],
    companyLogo: "/images/full-icube-white.png",
    companyName: "ICUBE by SIRCLO",
    logoWidth: 120,
    mediaImg: "/images/projects/wacoal-v3.webp",
    aspect: "16/10",
    alt: "Wacoal Philippines live production brand store",
  },
  {
    id: "erha",
    title: "Erhastore — Official Online Skincare Store",
    tags: ["Skincare Brand Store", "Magento", "Docker", "REST APIs"],
    companyLogo: "/images/full-icube-white.png",
    companyName: "ICUBE by SIRCLO",
    logoWidth: 120,
    mediaImg: "/images/projects/erha-v3.webp",
    aspect: "16/10",
    alt: "ERHA Store live production skincare eCommerce website",
  },
  {
    id: "datascrip",
    title: "DatascripMall.ID B2B/B2C Commerce Platform",
    tags: ["B2B & B2C Platform", "Magento", "Product Catalog", "Transactions"],
    companyLogo: "/images/full-icube-white.png",
    companyName: "ICUBE by SIRCLO",
    logoWidth: 120,
    mediaImg: "/images/projects/datascrip-v3.webp",
    aspect: "16/10",
    alt: "DatascripMall.ID live enterprise commerce platform",
  },

  // --- 5. PT. Sekawan Media Informatika (May 2021 – Dec 2021) ---
  {
    id: "sipas",
    title: "SIPAS — e-Office Document Management System",
    tags: ["Microservices", "REST APIs", "Letter Tracking", "PHP Falcon"],
    companyLogo: "/images/full-sekawan.png",
    companyName: "PT. Sekawan Media",
    logoWidth: 28,
    mediaImg: "/images/projects/sipas-v3.webp",
    aspect: "16/10.25",
    alt: "SIPAS e-Office document management system production interface",
  },
];

export function FeaturedWork() {
  const scrollRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt on card hover
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    card.style.transform = `perspective(1000px) rotateX(${y * -2.5}deg) rotateY(${x * 3.5}deg) translateY(-4px)`;
  }, []);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }, []);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const rail = railRef.current;
      if (!stage || !rail) return;

      const mm = gsap.matchMedia();

      // Desktop: Horizontal rail scrub matching Samay Maurya
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const getScrollDistance = () => rail.scrollWidth - window.innerWidth + 200;

        const railTween = gsap.to(rail, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
          },
        });

        // The screenshots must read exactly as captured, so no image parallax:
        // any translate/scale here pushes pixels past the 2:1 frame.
        const cards = gsap.utils.toArray<HTMLElement>(`.${s.workCard}`);
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.55 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: railTween,
                start: "left 92%",
                end: "left 46%",
                scrub: true,
              },
            }
          );
        });

        return () => {
          railTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: scrollRef }
  );

  return (
    <section id="work" ref={scrollRef} className={s.workScroll} aria-label="Featured work section">
      {/* Pinned Top Stage Bar matching Samay */}
      <div className={s.stageTopBar}>
        <h2 className={s.stageLabel}>Featured work</h2>
        <a href="#stack" className={s.stageSkip}>
          SKIP AHEAD →
        </a>
      </div>

      <div ref={stageRef} className={s.workStage}>
        <div ref={railRef} className={s.workRail}>
          {/* Left Intro Card with 'Systems I built, measured to impact.' */}
          <div className={s.introCard}>
            <h2 className={s.title}>Systems I built, measured to impact.</h2>
            <p className={s.sub}>
              Twelve production architectures spanning live enterprise eCommerce platforms across
              Southeast Asia, internal AI delivery automation, and distributed agent fleets.
            </p>
            <div className={s.scrollIndicator}>
              <span>Explore Projects</span>
              <span className={s.indicatorArrow} aria-hidden="true">→</span>
            </div>
          </div>

          {/* All 12 Project Cards formatted exactly like Samay's card layout */}
          {ALL_FEATURED_PROJECTS.map((card) => (
            <a
              key={card.id}
              href={`#${card.id}`}
              className={s.workCard}
              aria-label={`${card.title} — open project`}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Card Header: Title/Tags on Left, Company Logo on Right */}
              <div className={s.workCardHeader}>
                <div className={s.workCardHeading}>
                  <h3 className={s.workCardTitle}>{card.title}</h3>
                  <div className={s.tagRow}>
                    {card.status && (
                      <span
                        className={
                          card.status === "restricted" ? s.statusRestricted : s.statusSoon
                        }
                      >
                        {card.status === "restricted" ? "Restricted" : "Coming soon"}
                      </span>
                    )}
                    <ul className={s.workCardTags} aria-label="Project technologies">
                      {card.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={s.workCardMeta}>
                  {card.companyLogo ? (
                    <Image
                      src={card.companyLogo}
                      alt={card.companyName}
                      width={card.logoWidth}
                      height={card.logoHeight ?? 28}
                      className={s.companyLogoImg}
                    />
                  ) : (
                    <span className={s.selfBadge}>
                      {card.companyName === "AI Builder Cup 2026" ? "AI Builder Cup 2026" : "Personal Project"}
                    </span>
                  )}
                </div>
              </div>

              {/* 2:1 Widescreen Framed Application Media */}
              <div
                className={s.workCardMedia}
                style={card.aspect ? { aspectRatio: card.aspect } : undefined}
              >
                {card.status === "restricted" ? (
                  <RestrictedPanel
                    title={card.restrictedTitle ?? "Restricted access"}
                    note={card.restrictedNote ?? ""}
                  />
                ) : (
                  <Image
                    src={card.mediaImg ?? ""}
                    alt={card.alt ?? card.title}
                    fill
                    sizes="(max-width: 900px) 100vw, (max-width: 1600px) 92vw, 1500px"
                    quality={95}
                    priority={card.id === "nexalab"}
                    unoptimized={card.unoptimized}
                  />
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
