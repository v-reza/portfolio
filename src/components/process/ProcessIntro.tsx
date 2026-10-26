"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./ProcessIntro.module.css";

gsap.registerPlugin(ScrollTrigger);

const LINE1 = ["How", "I", "work."];
const LINE2 = ["Eight", "steps,", "one", "review", "gate."];

export function ProcessIntro() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

        ScrollTrigger.create({
          trigger: stageRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // words de-blur one at a time, the same way the work intro does
            words.forEach((el, i) => {
              const start = (i / words.length) * 0.62;
              const end = start + 0.1;

              if (p <= start) {
                gsap.set(el, { filter: "blur(16px)", opacity: 0 });
              } else if (p >= end) {
                gsap.set(el, { filter: "blur(0px)", opacity: 1 });
              } else {
                const t = (p - start) / (end - start);
                gsap.set(el, {
                  filter: `blur(${(16 * (1 - t)).toFixed(1)}px)`,
                  opacity: t.toFixed(2),
                });
              }
            });

            gsap.set(hintRef.current, {
              opacity: p > 0.66 ? Math.min(1, (p - 0.66) / 0.12) : 0,
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className={s.stage}>
      <p className={s.kicker}>Process</p>

      <div className={s.inner}>
        <h2 className={s.line1}>
          {LINE1.map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className={s.word}
            >
              {word}
            </span>
          ))}
        </h2>
        <p className={s.line2}>
          {LINE2.map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                wordsRef.current[LINE1.length + i] = el;
              }}
              className={s.word}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div ref={hintRef} className={s.hint} aria-hidden="true">
        <span className={s.hintDot} />
        <span>Keep scrolling</span>
      </div>
    </div>
  );
}
