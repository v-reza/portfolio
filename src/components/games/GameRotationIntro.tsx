"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./GameRotationIntro.module.css";

gsap.registerPlugin(ScrollTrigger);
const LINE1 = ["When", "the", "terminal", "closes,", "I", "play", "some", "video", "games."];
const LINE2 = ["Wuthering", "Waves,", "Deadlock,", "Rematch,", "Valheim."];

interface GameLaunchItem {
  id: string;
  title: string;
  genre: string;
  desc: string;
  status: string;
  active: boolean;
  href: string;
}

const GAMES: GameLaunchItem[] = [
  {
    id: "wuwa",
    title: "Wuthering Waves",
    genre: "Action RPG",
    desc: "UL 80 · 36 Resonators · Fast-swap parry combat on Solaris-3",
    status: "Active Chapter ↓",
    active: true,
    href: "#wuthering-waves",
  },
  {
    id: "deadlock",
    title: "Deadlock",
    genre: "Valve 6v6 Shooter",
    desc: "Lane economy, hero synergies, and mechanical aim",
    status: "In Rotation",
    active: false,
    href: "#deadlock",
  },
  {
    id: "rematch",
    title: "Rematch",
    genre: "Competitive Action",
    desc: "Frame data advantage, spacing, and neutral execution",
    status: "In Rotation",
    active: false,
    href: "#rematch",
  },
  {
    id: "valheim",
    title: "Valheim",
    genre: "Norse Survival",
    desc: "Dedicated server engineering, building integrity & boss raids",
    status: "In Rotation",
    active: false,
    href: "#valheim",
  },
];

export function GameRotationIntro() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const [showLauncher, setShowLauncher] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

        ScrollTrigger.create({
          trigger: stageRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Words de-blur across progress 0.0 -> 0.55
            words.forEach((el, i) => {
              const start = (i / words.length) * 0.55;
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

            // Reveal 4-card launcher hub around p = 0.52
            setShowLauncher(p >= 0.5);

            // Reveal bottom hint around p = 0.72
            gsap.set(hintRef.current, {
              opacity: p > 0.7 ? Math.min(1, (p - 0.7) / 0.12) : 0,
            });
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setShowLauncher(true);
      });

      return () => mm.revert();
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className={s.stage}>
      <p className={s.kicker}>Off-The-Clock</p>

      <div className={s.inner}>
        {/* Line 1: When the terminal closes. */}
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

        {/* Line 2: Wuthering Waves, Deadlock, Rematch, Valheim. */}
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

        {/* Direction C: 4-Game Launcher Cards */}
        <div className={`${s.launcherGrid} ${showLauncher ? s.launcherVisible : ""}`}>
          {GAMES.map((game) => (
            <a
              key={game.id}
              href={game.href}
              className={`${s.gameCard} ${game.active ? s.activeCard : ""}`}
            >
              <div className={s.cardTop}>
                <span className={s.gameGenre}>{game.genre}</span>
                <span className={`${s.statusBadge} ${game.active ? s.activeBadge : ""}`}>
                  {game.status}
                </span>
              </div>
              <h3 className={s.gameTitle}>{game.title}</h3>
              <p className={`${s.gameDesc} ${game.active ? s.activeDesc : ""}`}>{game.desc}</p>
            </a>
          ))}
        </div>

        {/* Scroll hint to enter Wuthering Waves */}
        <div ref={hintRef} className={s.hint} aria-hidden="true">
          <span className={s.hintDot} />
          <span>Scroll to enter Solaris-3</span>
        </div>
      </div>
    </div>
  );
}
