"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassesCanvas } from "./GlassesCanvas";
import s from "./GlassesTransition.module.css";

gsap.registerPlugin(ScrollTrigger);

const LINE1_WORDS = ["Welcome", "to", "my", "work", "section."];
const LINE2_WORDS = ["but", "first", "—", "put", "these", "on."];

export function GlassesTransition() {
  const stageRef = useRef<HTMLElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const line1WordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const line2WordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [glassesProgress, setGlassesProgress] = useState(0);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const textWrap = textWrapRef.current;
      const canvasWrap = canvasWrapRef.current;
      const curtain = curtainRef.current;
      const hint = hintRef.current;
      const line1Words = line1WordRefs.current;
      const line2Words = line2WordRefs.current;
      if (!stage || !textWrap || !canvasWrap || !curtain || !hint) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // -------------------------------------------------------------
            // BEAT 1: Line 1 de-blurs word-by-word (p: 0.0 -> 0.26)
            // (Glasses are completely hidden)
            // -------------------------------------------------------------
            line1Words.forEach((el, i) => {
              if (!el) return;
              const start = (i / LINE1_WORDS.length) * 0.18;
              const end = start + 0.08;

              if (p <= start) {
                gsap.set(el, { filter: "blur(14px)", opacity: 0 });
              } else if (p >= end) {
                gsap.set(el, { filter: "blur(0px)", opacity: 1 });
              } else {
                const ratio = (p - start) / (end - start);
                const blurVal = (14 * (1 - ratio)).toFixed(1);
                const opVal = ratio.toFixed(2);
                gsap.set(el, { filter: `blur(${blurVal}px)`, opacity: opVal });
              }
            });

            // -------------------------------------------------------------
            // BEAT 2: Line 2 de-blurs word-by-word (p: 0.26 -> 0.54)
            // (Glasses are STILL completely hidden)
            // -------------------------------------------------------------
            line2Words.forEach((el, i) => {
              if (!el) return;
              const start = 0.26 + (i / LINE2_WORDS.length) * 0.2;
              const end = start + 0.08;

              if (p <= start) {
                gsap.set(el, { filter: "blur(14px)", opacity: 0 });
              } else if (p >= end) {
                gsap.set(el, { filter: "blur(0px)", opacity: 1 });
              } else {
                const ratio = (p - start) / (end - start);
                const blurVal = (14 * (1 - ratio)).toFixed(1);
                const opVal = ratio.toFixed(2);
                gsap.set(el, { filter: `blur(${blurVal}px)`, opacity: opVal });
              }
            });

            // -------------------------------------------------------------
            // BEAT 3: Glasses appear ONLY AFTER Line 2 is completed!
            // (p: 0.56 -> 0.68 fades in canvas)
            // -------------------------------------------------------------
            if (p < 0.56) {
              gsap.set(canvasWrap, { opacity: 0, pointerEvents: "none" });
              gsap.set(hint, { opacity: 0 });
            } else if (p <= 0.68) {
              const fadeIn = (p - 0.56) / 0.12;
              gsap.set(canvasWrap, { opacity: fadeIn, pointerEvents: "auto" });
              gsap.set(hint, { opacity: fadeIn });
            } else {
              gsap.set(canvasWrap, { opacity: 1, pointerEvents: "auto" });
            }

            // -------------------------------------------------------------
            // BEAT 4: Text block exit & Glasses Zoom into view
            // (p: 0.68 -> 1.0)
            // -------------------------------------------------------------
            if (p < 0.68) {
              gsap.set(textWrap, { opacity: 1, scale: 1, y: 0 });
              setGlassesProgress(0);
            } else if (p <= 0.86) {
              const exitRatio = (p - 0.68) / 0.18;
              gsap.set(textWrap, {
                opacity: 1 - exitRatio,
                scale: 1 + exitRatio * 0.35,
                y: -exitRatio * 35,
              });
              gsap.set(hint, { opacity: Math.max(0, 1 - exitRatio * 2) });

              const gProg = (p - 0.68) / 0.32;
              setGlassesProgress(Math.min(1, gProg));
            } else {
              gsap.set(textWrap, { opacity: 0 });
              gsap.set(hint, { opacity: 0 });
              const gProg = (p - 0.68) / 0.32;
              setGlassesProgress(Math.min(1, gProg));
            }

            // Dark curtain fades in to plunge background into #0d0f14
            if (p < 0.74) {
              gsap.set(curtain, { opacity: 0 });
            } else {
              const curtainProgress = Math.min(1, (p - 0.74) / 0.24);
              gsap.set(curtain, { opacity: curtainProgress });
            }
          },
        });
      });

      return () => mm.revert();
    },
    { scope: stageRef }
  );

  return (
    <section ref={stageRef} className={s.pinnedStage} aria-label="Transition to work section">
      <div ref={textWrapRef} className={s.textWrap}>
        <div className={s.line1}>
          {LINE1_WORDS.map((word, idx) => (
            <span
              key={idx}
              ref={(el) => {
                line1WordRefs.current[idx] = el;
              }}
              className={s.word}
            >
              {word}
            </span>
          ))}
        </div>

        <div className={s.line2}>
          {LINE2_WORDS.map((word, idx) => (
            <span
              key={idx}
              ref={(el) => {
                line2WordRefs.current[idx] = el;
              }}
              className={s.word}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div ref={canvasWrapRef} className={s.canvasContainer}>
        <GlassesCanvas progress={glassesProgress} />
      </div>

      <div ref={curtainRef} className={s.darkCurtain} aria-hidden="true" />

      <div ref={hintRef} className={s.scrollHint} aria-hidden="true">
        <span className={s.hintDot} />
        <span>Scroll to put them on</span>
      </div>
    </section>
  );
}
