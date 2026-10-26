"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./RidgeBand.module.css";

gsap.registerPlugin(ScrollTrigger);

const VB_W = 1560;
const VB_H = 340;
const BASE_Y = 276;

/**
 * The delivery pipeline elevation profile across the eight stations,
 * climbing through requirements & architecture to the implementation summit,
 * across the review gate, and into production release.
 */
interface StepPeak {
  step: string;
  name: string;
  note: string;
  elevation: number; // 0..100
}

const STATIONS: StepPeak[] = [
  { step: "01", name: "Requirements", note: "Elicit & scope", elevation: 34 },
  { step: "02", name: "Flows", note: "System flows", elevation: 48 },
  { step: "03", name: "UI", note: "Figma specs", elevation: 62 },
  { step: "04", name: "Code", note: "Fullstack build", elevation: 96 },
  { step: "05", name: "Tests", note: "Verification", elevation: 82 },
  { step: "06", name: "Documentation", note: "Technical docs", elevation: 54 },
  { step: "07", name: "Review", note: "Quality gate", elevation: 88 },
  { step: "08", name: "Release", note: "Production", elevation: 72 },
];

const PAD = 64;
const stepDist = (VB_W - PAD * 2) / (STATIONS.length - 1);

// Station peaks with precise (x, y) coordinates
const stationPoints = STATIONS.map((st, i) => {
  const x = PAD + i * stepDist;
  const h = (st.elevation / 100) * (BASE_Y - 48);
  return { ...st, x, y: BASE_Y - h };
});

// Full points array including ground lead-in and lead-out
const allCurvePoints = [
  { x: 20, y: BASE_Y },
  ...stationPoints,
  { x: VB_W - 20, y: BASE_Y },
];

/** Builds the smooth top ridgeline curve and the closed area polygon */
function buildPaths(pts: { x: number; y: number }[]) {
  let line = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;

    const lo = Math.min(p1.y, p2.y);
    const hi = Math.max(p1.y, p2.y);
    const clampY = (v: number) => Math.min(hi + 20, Math.max(lo - 20, v));

    const c1y = clampY(p1.y + (p2.y - p0.y) / 6);
    const c2y = clampY(p2.y - (p3.y - p1.y) / 6);

    line += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }

  const first = pts[0];
  const last = pts[pts.length - 1];
  const area = `${line} L ${last.x} ${BASE_Y} L ${first.x} ${BASE_Y} Z`;

  return { line, area };
}

const { line: linePath, area: areaPath } = buildPaths(allCurvePoints);

export function RidgeBand() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const marksRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const line = lineRef.current;
        if (!line) return;

        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 82%",
            once: true,
          },
        });

        // 1. Ridgeline draws smoothly from left to right
        tl.to(line, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
          // 2. Mountain area fill fades in behind it
          .to(fillRef.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, "-=0.4")
          // 3. Station waypoints fade up as the wave settles
          .from(
            marksRef.current ? Array.from(marksRef.current.children) : [],
            { opacity: 0, y: 6, duration: 0.35, stagger: 0.05, ease: "power2.out" },
            "-=0.9"
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(fillRef.current, { opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={s.band}>
      <div className={s.head}>
        <p className={s.caption}>The Delivery Elevation · Eight Stations</p>
        <p className={s.axis}>x — station (01 → 08) · y — delivery phase</p>
      </div>

      <div className={s.svgWrap}>
        <svg
          className={s.svg}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label="Ridgeline elevation profile across the eight stations of delivery: Requirements, Flows, UI, Code, Tests, Documentation, Review, and Release."
        >
          <defs>
            <linearGradient id="ridgeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4820" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#8f99a8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8f99a8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Baseline */}
          <line
            className={s.baseline}
            x1={10}
            y1={BASE_Y}
            x2={VB_W - 10}
            y2={BASE_Y}
          />

          {/* Mountain shaded area */}
          <path ref={fillRef} className={s.area} d={areaPath} fill="url(#ridgeFill)" />

          {/* Clean stroked ridgeline (no boxed outline) */}
          <path ref={lineRef} className={s.ridgeLine} d={linePath} />

          {/* 8 Station markers */}
          <g ref={marksRef}>
            {stationPoints.map((p) => (
              <g key={p.step}>
                {/* Waypoint circle at the peak */}
                <circle className={s.dot} cx={p.x} cy={p.y} r={5.5} />
                <circle className={s.dotRing} cx={p.x} cy={p.y} r={10.5} />

                {/* Step index above the waypoint */}
                <text className={s.stepIndex} x={p.x} y={p.y - 16}>
                  {p.step}
                </text>

                {/* Station name below baseline */}
                <text className={s.peakLabel} x={p.x} y={BASE_Y + 26}>
                  {p.name}
                </text>

                {/* Deliverable note */}
                <text className={s.peakValue} x={p.x} y={BASE_Y + 44}>
                  {p.note}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
