"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./DeliveryElevation.module.css";

gsap.registerPlugin(ScrollTrigger);

const VB_W = 1560;
const VB_H = 320;
const BASE_Y = 250;

interface Station {
  index: string;
  name: string;
  what: string;
  elevation: number; // 0..100
  icon: React.ReactNode;
}

const STATIONS: Station[] = [
  {
    index: "01",
    name: "Requirements",
    what: "Elicit and analyse them with the client, and commit the team to agreed scope and dates.",
    elevation: 32,
    icon: (
      <>
        <path d="M4 4h11l5 5v11H4z" />
        <path d="M15 4v5h5M8 13h8M8 17h5" />
      </>
    ),
  },
  {
    index: "02",
    name: "Flows",
    what: "Write the flows the team and the client work from.",
    elevation: 46,
    icon: (
      <>
        <rect x="3" y="4" width="7" height="5" rx="1.5" />
        <rect x="14" y="15" width="7" height="5" rx="1.5" />
        <path d="M10 6.5h5a2 2 0 0 1 2 2V15" />
      </>
    ),
  },
  {
    index: "03",
    name: "UI",
    what: "Specify the screens and functional documentation.",
    elevation: 60,
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 9v11" />
      </>
    ),
  },
  {
    index: "04",
    name: "Code",
    what: "Hands-on across React, Vanilla JS and backend services, with AI assistance.",
    elevation: 96, // summit!
    icon: (
      <>
        <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </>
    ),
  },
  {
    index: "05",
    name: "Tests",
    what: "Test planning and validation for the team's work.",
    elevation: 82,
    icon: (
      <>
        <path d="M5 4v6a7 7 0 0 0 14 0V4" />
        <path d="M9 20h6" />
      </>
    ),
  },
  {
    index: "06",
    name: "Documentation",
    what: "Technical and functional docs, generated and checked against requirements.",
    elevation: 54,
    icon: (
      <>
        <path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M9 12h6M9 16h4" />
      </>
    ),
  },
  {
    index: "07",
    name: "Review",
    what: "Requirements, flows, UI, code, tests and docs reviewed before release.",
    elevation: 88, // final gate
    icon: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l4 4" />
        <path d="M9 11l1.5 1.5 3-3" />
      </>
    ),
  },
  {
    index: "08",
    name: "Release",
    what: "Shipped to the client on the committed date.",
    elevation: 74,
    icon: (
      <>
        <path d="M12 2v13M8 11l4 4 4-4" />
        <path d="M4 19h16" />
      </>
    ),
  },
];

interface MetricFigure {
  value: string;
  label: string;
  badge: string;
  icon: React.ReactNode;
}

const FIGURES: MetricFigure[] = [
  {
    value: "~70%",
    label: "less feature rework",
    badge: "Efficiency",
    icon: (
      <>
        <path d="M4 12v-2a8 8 0 0 1 14.93-4M20 12v2a8 8 0 0 1-14.93 4" />
        <polyline points="15 6 19 2 23 6" />
        <polyline points="9 18 5 22 1 18" />
      </>
    ),
  },
  {
    value: "90%",
    label: "of milestones on committed date",
    badge: "Predictable",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
        <line x1="9" y1="3" x2="15" y2="3" />
      </>
    ),
  },
  {
    value: "80%",
    label: "releases with no traceable defect",
    badge: "Quality",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </>
    ),
  },
  {
    value: "5",
    label: "engineers mentored on workflow",
    badge: "Leadership",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

const PAD = 68;
const stepDist = (VB_W - PAD * 2) / (STATIONS.length - 1);

const stationPoints = STATIONS.map((st, i) => {
  const x = PAD + i * stepDist;
  const h = (st.elevation / 100) * (BASE_Y - 48);
  return { ...st, x, y: BASE_Y - h };
});

const allCurvePoints = [
  { x: 16, y: BASE_Y },
  ...stationPoints,
  { x: VB_W - 16, y: BASE_Y },
];

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

export function DeliveryElevation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const orbRef = useRef<SVGGElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const badgeTextRefs = useRef<(SVGTextElement | null)[]>([]);
  const nameTextRefs = useRef<(SVGTextElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [showMetrics, setShowMetrics] = useState<boolean>(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* 1. Desktop & normal heights: Pinned Elevation Stepper */
      mm.add(
        "(min-width: 601px) and (min-height: 580px) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage = stageRef.current;
          const line = lineRef.current;
          const fill = fillRef.current;
          const orb = orbRef.current;
          if (!stage || !line || !fill || !orb) return;

          const totalLen = line.getTotalLength();
          gsap.set(line, { strokeDasharray: totalLen, strokeDashoffset: totalLen });

          ScrollTrigger.create({
            trigger: stage,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress; // 0.0 -> 1.0

              // 1. Draw ridgeline
              const drawnLen = p * totalLen;
              gsap.set(line, { strokeDashoffset: totalLen - drawnLen });

              // 2. Position transit orb exactly along the curve
              if (drawnLen > 0) {
                const pt = line.getPointAtLength(drawnLen);
                gsap.set(orb, {
                  attr: { transform: `translate(${pt.x}, ${pt.y})` },
                  opacity: 1,
                });
              }

              // 3. Shaded mountain fill opacity builds up
              gsap.set(fill, { opacity: Math.min(1, p * 1.4) });

              // 4. Active station index along the 8 waypoints
              // Progress 0..0.86 maps to stations 0..7
              const stationP = Math.min(0.999, p / 0.86);
              const curIdx = Math.min(7, Math.floor(stationP * 8));

              setActiveIdx(curIdx);

              // 5. Update waypoint visual states
              stationPoints.forEach((sp, k) => {
                const dot = dotRefs.current[k];
                const badge = badgeTextRefs.current[k];
                const name = nameTextRefs.current[k];
                if (!dot || !badge || !name) return;

                if (k < curIdx) {
                  // Past: Reviewed
                  dot.setAttribute("class", `${s.waypointDot} ${s.waypointCompleted}`);
                  badge.textContent = "Reviewed";
                  badge.setAttribute("class", `${s.stationBadge} ${s.badgeCompleted}`);
                  name.setAttribute("class", `${s.stationName} ${s.textCompleted}`);
                } else if (k === curIdx) {
                  // Current: Reviewing (or Shipped if last)
                  dot.setAttribute("class", `${s.waypointDot} ${s.waypointActive}`);
                  badge.textContent = k === 7 ? "Shipped" : "Reviewing";
                  badge.setAttribute("class", `${s.stationBadge} ${s.badgeActive}`);
                  name.setAttribute("class", `${s.stationName} ${s.textActive}`);
                } else {
                  // Future: Queued (or Planned if last)
                  dot.setAttribute("class", s.waypointDot);
                  badge.textContent = k === 7 ? "Planned" : "Queued";
                  badge.setAttribute("class", s.stationBadge);
                  name.setAttribute("class", s.stationName);
                }
              });

              // 6. When Release (station 08) is reached (p >= 0.86), reveal metrics!
              const reachedRelease = p >= 0.86;
              setShowMetrics(reachedRelease);
            },
          });
        }
      );

      /* 2. Reduced motion: Everything visible & complete */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (lineRef.current) gsap.set(lineRef.current, { strokeDashoffset: 0 });
        if (fillRef.current) gsap.set(fillRef.current, { opacity: 1 });
        setShowMetrics(true);
        setActiveIdx(7);
      });

      return () => mm.revert();
    },
    { scope: stageRef }
  );

  const activeStation = STATIONS[activeIdx] ?? STATIONS[0];

  return (
    <div ref={stageRef} className={s.elevationSection}>
      <div className={s.glow} aria-hidden="true" />

      <div className={s.inner}>
        {/* Headline & Subtitle */}
        <header className={s.header}>
          <p className={s.kicker}>Delivery Elevation</p>
          <h2 id="process-title" className={s.title}>
            Eight steps from brief to release.
          </h2>
          <p className={s.sub}>
            I run this AI-assisted delivery workflow for my team end to end. Every artifact is
            reviewed against the requirements before it leaves the station.
          </p>
        </header>

        {/* Mountain SVG Ridgeline */}
        <div className={s.svgWrap}>
          <svg
            className={s.svg}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            role="img"
            aria-label="Delivery elevation ridgeline across the eight stations from Requirements to Release."
          >
            <defs>
              <linearGradient id="elevFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff4820" stopOpacity="0.28" />
                <stop offset="60%" stopColor="#ff4820" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#0b0d12" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Baseline */}
            <line className={s.baseline} x1={10} y1={BASE_Y} x2={VB_W - 10} y2={BASE_Y} />

            {/* Dormant dashed guide */}
            <path className={s.ridgeDormant} d={linePath} />

            {/* Shaded mountain fill */}
            <path ref={fillRef} className={s.ridgeFill} d={areaPath} fill="url(#elevFill)" />

            {/* Live drawing orange ridgeline */}
            <path ref={lineRef} className={s.ridgeLine} d={linePath} />

            {/* Transit Orb */}
            <g ref={orbRef} transform="translate(-100, -100)">
              <circle cx={0} cy={0} r={5.5} className={s.transitOrb} />
              <circle cx={0} cy={0} r={14} className={s.transitPulse} />
            </g>

            {/* 8 Station Waypoint Markers */}
            {stationPoints.map((p, idx) => (
              <g key={p.index}>
                {/* Peak waypoint circle */}
                <circle
                  ref={(el) => {
                    dotRefs.current[idx] = el;
                  }}
                  className={idx === 0 ? `${s.waypointDot} ${s.waypointActive}` : s.waypointDot}
                  cx={p.x}
                  cy={p.y}
                  r={5.5}
                />

                {/* Step index above waypoint */}
                <text
                  className={idx === 0 ? `${s.stationIndex} ${s.indexActive}` : s.stationIndex}
                  x={p.x}
                  y={p.y - 14}
                >
                  {p.index}
                </text>

                {/* Station Name below baseline */}
                <text
                  ref={(el) => {
                    nameTextRefs.current[idx] = el;
                  }}
                  className={idx === 0 ? `${s.stationName} ${s.textActive}` : s.stationName}
                  x={p.x}
                  y={BASE_Y + 24}
                >
                  {p.name}
                </text>

                {/* Station Status Badge below name */}
                <text
                  ref={(el) => {
                    badgeTextRefs.current[idx] = el;
                  }}
                  className={idx === 0 ? `${s.stationBadge} ${s.badgeActive}` : s.stationBadge}
                  x={p.x}
                  y={BASE_Y + 42}
                >
                  {idx === 0 ? "Reviewing" : idx === 7 ? "Planned" : "Queued"}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Lower Deck: Transitions from Station Inspector to 4 Metric Cards */}
        <div className={s.lowerDeck}>
          {/* 1. Active Station Inspector */}
          <div
            className={s.inspectorCard}
            style={{
              opacity: showMetrics ? 0 : 1,
              pointerEvents: showMetrics ? "none" : "auto",
              transform: showMetrics ? "scale(0.97)" : "scale(1)",
            }}
          >
            <div className={s.inspectorIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {activeStation.icon}
              </svg>
            </div>

            <div className={s.inspectorBody}>
              <div className={s.inspectorTop}>
                <span className={s.inspectorStep}>{activeStation.index}</span>
                <h3 className={s.inspectorName}>{activeStation.name}</h3>
                <span className={s.inspectorBadge}>
                  {activeIdx === 7 ? "Shipped" : "Reviewing"}
                </span>
              </div>
              <p className={s.inspectorWhat}>{activeStation.what}</p>
            </div>
          </div>

          {/* 2. Four Impact Metric Cards (Animated on Release) */}
          <div
            className={`${s.metricsGrid} ${showMetrics ? s.metricsGridVisible : ""}`}
            role="region"
            aria-label="Workflow impact metrics"
          >
            {FIGURES.map((fig) => (
              <div key={fig.label} className={s.metricCard}>
                <div className={s.metricTop}>
                  <div className={s.metricIcon} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {fig.icon}
                    </svg>
                  </div>
                  <span className={s.metricBadge}>{fig.badge}</span>
                </div>

                <div className={s.metricValue}>{fig.value}</div>
                <p className={s.metricLabel}>{fig.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
