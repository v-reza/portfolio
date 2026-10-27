"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import s from "./OffTheClock.module.css";
import statsS from "./WutheringWavesSection.module.css";

interface GameDeckCard {
  id: string;
  num: string;
  title: string;
  bigStat: string;
  sub: string;
  footer: string;
  leftPx: number;
  bgGradient: string;
  glow: string;
  logo?: string;
  isInteractive?: boolean;
}

const DECK_CARDS: GameDeckCard[] = [
  {
    id: "wuwa",
    num: "01",
    title: "Wuthering Waves",
    bigStat: "UL 80",
    sub: "Solaris-3 · 36 Resonators · 30/30 Hazard",
    footer: "Open WebGL Engine →",
    leftPx: 60,
    bgGradient:
      "radial-gradient(120% 80% at 15% 0%, #FFC9A8 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #E8402A 0%, transparent 60%), linear-gradient(165deg, #FF9A6B, #F25A38)",
    glow: "#FF7A4F",
    logo: "/images/wuwa/wuwa-mini-icon.png",
    isInteractive: true,
  },
  {
    id: "deadlock",
    num: "02",
    title: "Deadlock",
    bigStat: "6v6",
    sub: "Valve Tactical Hero MOBA · Lane Macro",
    footer: "Active Playtest →",
    leftPx: 195,
    bgGradient:
      "radial-gradient(90% 60% at 0% 0%, #FFD24D 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #EE4B73 0%, transparent 60%), linear-gradient(165deg, #3AA6E0, #1667A8)",
    glow: "#3AA6E0",
  },
  {
    id: "rematch",
    num: "03",
    title: "Rematch",
    bigStat: "+Frame",
    sub: "Action Combat · Neutral Spacing & Punish",
    footer: "Competitive Action →",
    leftPx: 330,
    bgGradient:
      "radial-gradient(90% 60% at 0% 0%, #FCC419 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #C92A2A 0%, transparent 60%), linear-gradient(165deg, #9C36B5, #E03131)",
    glow: "#D7262B",
  },
  {
    id: "valheim",
    num: "04",
    title: "Valheim",
    bigStat: "Linux",
    sub: "Dedicated Server Host · Structural Physics",
    footer: "Norse Survival →",
    leftPx: 465,
    bgGradient:
      "radial-gradient(90% 60% at 0% 0%, #D8F5A2 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #087F5B 0%, transparent 60%), linear-gradient(165deg, #2B8A3E, #1864AB)",
    glow: "#2B8A3E",
  },
];

export function OffTheClock() {
  const [activeCardId, setActiveCardId] = useState<string>("wuwa");
  const [modalOpen, setModalOpen] = useState(false);
  const [isAnimatingPick, setIsAnimatingPick] = useState(false);
  const cardRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };

    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  const handleCardClick = (card: GameDeckCard) => {
    setActiveCardId(card.id);
    if (!card.isInteractive || isAnimatingPick) return;

    const el = cardRefs.current[card.id];
    if (el) {
      setIsAnimatingPick(true);
      // James Chugh pick animation: lift high into air, rotate flat to screen
      const BW = 660;
      const BD = 260;
      const CH = 304;
      const VIEW_X = 57;
      const VIEW_Z = 30;

      const from = getComputedStyle(el).transform;
      const mid = `translate3d(0px, 0px, ${CH + 60}px) rotateZ(-90deg) rotateX(-90deg) rotateY(0deg)`;
      const to = `translate3d(${(BW / 2 - card.leftPx).toFixed(1)}px, ${BD * 0.95}px, 220px) rotateZ(${-VIEW_Z}deg) rotateX(${-VIEW_X}deg) rotateY(0deg)`;

      const anim = el.animate(
        [
          { transform: from },
          { transform: mid, offset: 0.38 },
          { transform: to },
        ],
        {
          duration: 1100,
          easing: "cubic-bezier(.55, 0, .15, 1)",
          fill: "forwards",
        }
      );

      anim.onfinish = () => {
        setTimeout(() => {
          setModalOpen(true);
          setIsAnimatingPick(false);
          anim.cancel();
        }, 120);
      };
    } else {
      setModalOpen(true);
    }
  };

  return (
    <section id="off-the-clock" className={s.section} aria-label="Off the clock gaming rotation">
      {/* 1. Header: James Chugh typography with highlighter */}
      <div className={s.headerWrap}>
        <p className={s.kicker}>Off The Clock</p>
        <h2 className={s.headline}>
          When the terminal closes, <br />
          <span className={s.highlightText}>I play some video games.</span>
        </h2>
        <p className={s.subheadline}>
          When the IDE closes, I look for systems that demand the same precision: animation cancels,
          lane macro, and dedicated servers. Pick a card from the box.
        </p>
      </div>

      {/* 2. 3D Isometric Card Deck Box (Direct from James Chugh) */}
      <div className={s.boxTrack}>
        <div className={s.boxFit}>
          <div className={s.box3}>
            {/* Box Cast Shadow */}
            <div className={s.boxShadow} aria-hidden="true" />

            {/* Box Floor (Kraft cardboard texture) */}
            <div className={s.boxFloor} aria-hidden="true" />

            {/* 4 Real Walls from James Chugh */}
            <div className={`${s.wallFace} ${s.wallBack}`} aria-hidden="true" />
            <div className={`${s.wallFace} ${s.wallLeft}`} aria-hidden="true" />
            <div className={`${s.wallFace} ${s.wallRight}`} aria-hidden="true" />
            <div className={`${s.wallFace} ${s.wallFront}`} aria-hidden="true">
              <span className={s.brandLabel}>Things I played</span>
            </div>

            {/* Open Box Lid (Folded open behind the box at -72deg) */}
            <div className={s.boxLid} aria-hidden="true" />

            {/* Four Standing Isometric Game Cards */}
            {DECK_CARDS.map((card) => {
              const isSelected = activeCardId === card.id;
              return (
                <button
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[card.id] = el;
                  }}
                  type="button"
                  aria-label={`${card.title}, open showcase`}
                  className={`${s.cardBtn} ${isSelected ? s.cardActive : ""}`}
                  style={{
                    background: card.bgGradient,
                    left: `${card.leftPx}px`,
                  }}
                  onMouseEnter={() => setActiveCardId(card.id)}
                  onClick={() => handleCardClick(card)}
                >
                  <div className={s.cardTop}>
                    {card.logo ? (
                      <Image
                        src={card.logo}
                        alt=""
                        width={44}
                        height={44}
                        className={s.cardLogo}
                      />
                    ) : (
                      <div className={s.cardIconBox}>{card.num}</div>
                    )}
                    <span className={s.cardTag}>{card.num}</span>
                  </div>

                  <div className={s.cardMid}>
                    <p className={s.cardTitle}>{card.title}</p>
                    <div className={s.cardBigStat}>{card.bigStat}</div>
                    <p className={s.cardSub}>{card.sub}</p>
                  </div>

                  <div className={s.cardFooter}>
                    <span>{card.footer}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom Index Bar */}
      <div className={s.bottomIndex}>
        {DECK_CARDS.map((card) => {
          const isSelected = activeCardId === card.id;
          return (
            <button
              key={card.id}
              type="button"
              className={`${s.indexPill} ${isSelected ? s.indexPillActive : ""}`}
              onClick={() => handleCardClick(card)}
            >
              <span className={s.indexNum}>{card.num}</span>
              <span>{card.title}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Full-Screen Interactive Showcase Modal (Opens ONLY when card clicked!) */}
      {modalOpen && (
        <div
          className={s.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Wuthering Waves Live WebGL Showcase"
        >
          {/* Modal Sticky Top Bar */}
          <div className={s.modalTopBar}>
            <div className={s.modalTitleGroup}>
              <span className={s.modalGameTitle}>Wuthering Waves 鳴潮 · Live WebGL Engine</span>
              <span className={s.statusPillModal}>
                <span className={s.liveDot} />
                <span>Solaris-3 · SEA</span>
              </span>
            </div>

            <button
              type="button"
              className={s.modalCloseBtn}
              onClick={() => setModalOpen(false)}
              title="Close showcase (ESC)"
            >
              <span>✕ Close (ESC)</span>
            </button>
          </div>

          {/* Modal Body: Live Spine 4.2 WebGL Stage + Vyrenn Stats Card */}
          <div className={s.modalBody}>
            {/* Live Spine 4.2 WebGL Stage */}
            <div className={s.modalStageContainer}>
              <iframe
                src="/wuwa/hsin-viewer/index.html"
                title="Wuthering Waves Resonators Spine 4.2 WebGL Stage"
                className={s.modalIframe}
                loading="eager"
                allow="autoplay"
              />
            </div>

            {/* In-Game Stats Widget (Vyrenn · Server: SEA) */}
            <div className={statsS.accountSection}>
              <div className={statsS.statsWidget}>
                <div className={statsS.widgetHeader}>
                  <Image
                    src="/images/wuwa/wuwa-mini-icon.png"
                    alt="Wuthering Waves"
                    width={22}
                    height={22}
                    className={statsS.widgetIcon}
                  />
                  <span className={statsS.widgetGameTitle}>Wuthering Waves</span>
                </div>

                <div className={statsS.widgetIdentityRow}>
                  <div className={statsS.identityText}>
                    <h3 className={statsS.playerIGN}>Vyrenn</h3>
                    <p className={statsS.playerServerText}>Server: SEA</p>
                  </div>

                  <div className={statsS.portraitWrap}>
                    <Image
                      src="/images/wuwa/vyrenn-portrait.png"
                      alt="Vyrenn"
                      width={190}
                      height={145}
                      className={statsS.portraitImg}
                      priority
                    />
                  </div>
                </div>

                <div className={statsS.statsGrid}>
                  <div className={statsS.statItem}>
                    <span className={statsS.statNumber}>80</span>
                    <span className={statsS.statLabel}>Union Level</span>
                  </div>
                  <div className={statsS.statItem}>
                    <span className={statsS.statNumber}>36</span>
                    <span className={statsS.statLabel}>Resonators</span>
                  </div>
                  <div className={statsS.statItem}>
                    <span className={statsS.statNumber}>723</span>
                    <span className={statsS.statLabel}>Achievements</span>
                  </div>
                  <div className={statsS.statItem}>
                    <span className={statsS.statNumber}>744</span>
                    <span className={statsS.statLabel}>Echoes</span>
                  </div>
                  <div className={statsS.statItem}>
                    <span className={statsS.statNumber}>574</span>
                    <span className={statsS.statLabel}>Login Days</span>
                  </div>
                  <div className={statsS.statItem}>
                    <span className={statsS.statNumber}>30</span>
                    <span className={statsS.statLabel}>Data Bank Level</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
