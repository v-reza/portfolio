"use client";

import { useId, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import s from "./SamayHero.module.css";

export function SamayHero() {
  const headingId = useId();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  const heroRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const polaroid1Ref = useRef<HTMLDivElement>(null);
  const polaroid2Ref = useRef<HTMLDivElement>(null);
  const handNoteRef = useRef<HTMLDivElement>(null);
  const expBarRef = useRef<HTMLDivElement>(null);

  // Concept A: Buttery 600-800ms staggered physical entrance (0ms artificial wait)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Text elements slide up gently
        if (leftContentRef.current) {
          const children = leftContentRef.current.children;
          tl.fromTo(
            children,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.08,
            },
            0.05
          );
        }

        // 2. Polaroid 1 (Workspace) drops onto the desk with physical damping
        if (polaroid1Ref.current) {
          tl.fromTo(
            polaroid1Ref.current,
            { opacity: 0, y: -45, scale: 0.9, rotate: -12 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: -5,
              duration: 0.85,
              ease: "back.out(1.4)",
            },
            0.2
          );
        }

        // 3. Polaroid 2 (Portrait) drops slightly after and overlaps naturally
        if (polaroid2Ref.current) {
          tl.fromTo(
            polaroid2Ref.current,
            { opacity: 0, y: -50, scale: 0.88, rotate: 10 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 3.5,
              duration: 0.9,
              ease: "back.out(1.5)",
            },
            0.32
          );
        }

        // 4. Handwritten note settles in
        if (handNoteRef.current) {
          tl.fromTo(
            handNoteRef.current,
            { opacity: 0, x: -12, rotate: -8 },
            { opacity: 1, x: 0, rotate: -3, duration: 0.6, ease: "power2.out" },
            0.5
          );
        }

        // 5. Experiences bar glides in smoothly at the bottom
        if (expBarRef.current) {
          tl.fromTo(
            expBarRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            0.4
          );
        }
      });

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, active: false }));
  }, []);

  // Flashlight mask revealing the Bromo / Malang backdrop under cursor
  const backdropMaskStyle: React.CSSProperties = mousePos.active
    ? {
        maskImage: `radial-gradient(460px 360px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 38%, rgba(0, 0, 0, 0.1) 68%, rgba(0, 0, 0, 0) 100%)`,
        WebkitMaskImage: `radial-gradient(460px 360px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 38%, rgba(0, 0, 0, 0.1) 68%, rgba(0, 0, 0, 0) 100%)`,
        opacity: 0.88,
      }
    : {
        maskImage: "none",
        WebkitMaskImage: "none",
        opacity: 0,
      };

  return (
    <section
      ref={heroRef}
      className={s.heroSection}
      aria-labelledby={headingId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive mouse-hover backdrop revealing Bromo / Semeru */}
      <div
        className={s.heroBackdrop}
        style={backdropMaskStyle}
        aria-hidden="true"
      />

      <div className={s.heroContent}>
        <div ref={leftContentRef} className={s.left}>
          <div className={s.tag}>Fullstack & AI Systems Engineer · Malang, Indonesia</div>

          <div className={s.salutation}>hey, I’m</div>

          <div className={s.nameWrap}>
            <h1 id={headingId} className={s.name}>
              reza<span className={s.dot}>.</span>
            </h1>
            <span className={s.bubble} aria-hidden="true">
              psst. engineering lead
            </span>
          </div>

          <p className={s.desc}>
            I build scalable fullstack systems. <br />
            <strong>I also teach autonomous AI agents to build and verify them.</strong>
            <span className={s.subline}>
              TypeScript, Spring Boot, Go, Python on PostgreSQL. Co-founder & software engineer at Nexatriv.
            </span>
          </p>
        </div>

        <div className={s.polaroids} aria-label="Personal snapshots and roots">
          {/* Polaroid 1: Real Workspace */}
          <div
            ref={polaroid1Ref}
            className={`${s.polaroid} ${s.p1}`}
            tabIndex={0}
            role="figure"
            aria-label="Coding setup: Code, Build, Repeat"
          >
            <Image
              src="/images/reza-workspace.webp"
              alt="Reza's coding workstation with multiple monitors, mechanical keyboard, and coffee"
              width={220}
              height={280}
              className={s.photoImg}
              priority
            />
            <div className={s.caption}>the setup · focus</div>
          </div>

          {/* Polaroid 2: Reza Portrait */}
          <div
            ref={polaroid2Ref}
            className={`${s.polaroid} ${s.p2}`}
            tabIndex={0}
            role="figure"
            aria-label="M Zulfi Fahreza portrait"
          >
            <Image
              src="/images/reza-portrait.webp"
              alt="M Zulfi Fahreza studio portrait"
              width={220}
              height={280}
              className={s.photoImg}
              priority
            />
            <div className={s.caption}>that’s me — 100% engineer</div>
          </div>

          <div ref={handNoteRef} className={s.handNote} aria-hidden="true">
            roots: malang ↗
          </div>
        </div>
      </div>

      {/* Experiences bar coded exactly like Samay Maurya */}
      <div ref={expBarRef} className={s.heroContext}>
        <p className={s.sectionLabel}>Experiences</p>
        <ul className={s.heroOrgs} aria-label="Places I’ve worked">
          <li className={s.heroOrg}>
            <Image
              src="/images/full-nexatriv.png"
              alt="Nexatriv"
              width={130}
              height={30}
              className={s.fullLogo}
            />
            <span className={s.heroOrgNow}>
              <span className={s.heroOrgNowDot} aria-hidden="true" />
              currently here
            </span>
          </li>
          <li className={s.heroOrg}>
            <Image
              src="/images/full-mgg.png"
              alt="MGG Software"
              width={160}
              height={26}
              className={s.fullLogo}
            />
            <span className={s.heroOrgNow}>
              <span className={s.heroOrgNowDot} aria-hidden="true" />
              currently here
            </span>
          </li>
          <li className={s.heroOrg}>
            <Image
              src="/images/full-icube.png"
              alt="ICUBE by SIRCLO"
              width={130}
              height={28}
              className={s.fullLogo}
            />
          </li>
          <li className={s.heroOrg}>
            <Image
              src="/images/full-sekawan.png"
              alt="Sekawan Media"
              width={28}
              height={28}
              className={s.heroOrgMark}
            />
            <span className={s.heroOrgName}>Sekawan Media</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
