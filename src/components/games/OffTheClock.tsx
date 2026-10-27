"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import s from "./OffTheClock.module.css";
import statsS from "./WutheringWavesSection.module.css";

interface GameCard {
  id: string;
  num: string;
  genre: string;
  title: string;
  bigStat: string;
  sub: string;
  footer: string;
  bgGradient: string;
  glow: string;
  logo?: string;
  isInteractive?: boolean;
}

const CARDS: GameCard[] = [
  {
    id: "wuwa",
    num: "01",
    genre: "ACTION RPG",
    title: "Wuthering Waves",
    bigStat: "UL 80",
    sub: "Solaris-3 · 36 Resonators · 30/30 Hazard Zone speedrun",
    footer: "Open WebGL Engine",
    bgGradient:
      "radial-gradient(120% 80% at 15% 0%, #FFC9A8 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #E8402A 0%, transparent 60%), linear-gradient(165deg, #FF9A6B, #F25A38)",
    glow: "#FF7A4F",
    logo: "/images/wuwa/wuwa-mini-icon.png",
    isInteractive: true,
  },
  {
    id: "deadlock",
    num: "02",
    genre: "TACTICAL MOBA",
    title: "Deadlock",
    bigStat: "6v6",
    sub: "Valve hero shooter · Lane macro, wave control, and teamfight execution",
    footer: "Active Playtest",
    bgGradient:
      "radial-gradient(90% 60% at 0% 0%, #FFD24D 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #EE4B73 0%, transparent 60%), linear-gradient(165deg, #3AA6E0, #1667A8)",
    glow: "#3AA6E0",
  },
  {
    id: "rematch",
    num: "03",
    genre: "COMPETITIVE ACTION",
    title: "Rematch",
    bigStat: "+Frame",
    sub: "Neutral spacing pressure, frame advantage, and reactive whiff punishing",
    footer: "Competitive Fighter",
    bgGradient:
      "radial-gradient(90% 60% at 0% 0%, #FCC419 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #C92A2A 0%, transparent 60%), linear-gradient(165deg, #9C36B5, #E03131)",
    glow: "#D7262B",
  },
  {
    id: "valheim",
    num: "04",
    genre: "SURVIVAL & SYSTEM",
    title: "Valheim",
    bigStat: "Linux",
    sub: "Self-hosted Linux dedicated server · Structural load physics & procedural exploration",
    footer: "Norse Survival",
    bgGradient:
      "radial-gradient(90% 60% at 0% 0%, #D8F5A2 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #087F5B 0%, transparent 60%), linear-gradient(165deg, #2B8A3E, #1864AB)",
    glow: "#2B8A3E",
  },
];

export function OffTheClock() {
  const [modalOpen, setModalOpen] = useState(false);

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

  // Subtle interactive 3D card tilt following mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y / rect.height - 0.5) * -12).toFixed(2);
    const rotY = ((x / rect.width - 0.5) * 12).toFixed(2);
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-12px) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  const handleCardClick = (card: GameCard) => {
    if (card.isInteractive) {
      setModalOpen(true);
    }
  };

  return (
    <section id="off-the-clock" className={s.section} aria-label="Off the clock gaming rotation">
      {/* 1. Header: Modern high-contrast typography */}
      <div className={s.headerWrap}>
        <p className={s.kicker}>Off The Clock</p>
        <h2 className={s.headline}>
          When the terminal closes, <br />
          <span className={s.highlightText}>I play some video games.</span>
        </h2>
        <p className={s.subheadline}>
          When the IDE closes, I look for systems that demand the same precision: animation cancels,
          lane macro, and dedicated servers. Pick a card to explore.
        </p>
      </div>

      {/* 2. 4-Column Modern Floating Cards Grid */}
      <div className={s.gridWrap}>
        <div className={s.cardsGrid}>
          {CARDS.map((card) => {
            const isClickable = !!card.isInteractive;
            return (
              <button
                key={card.id}
                type="button"
                aria-label={`${card.title}, ${card.footer}`}
                className={`${s.card} ${isClickable ? s.cardInteractive : ""}`}
                style={
                  {
                    background: card.bgGradient,
                    "--glow": card.glow,
                  } as React.CSSProperties
                }
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCardClick(card)}
              >
                {/* Top Row: Icon/Logo on Left, Category Pill on Right */}
                <div className={s.cTop}>
                  <div className={s.cIconBox}>
                    {card.logo ? (
                      <Image
                        src={card.logo}
                        alt=""
                        width={32}
                        height={32}
                        className={s.cLogoImg}
                      />
                    ) : (
                      <span className={s.cIconNum}>{card.num}</span>
                    )}
                  </div>
                  <span className={s.cBadge}>
                    {card.num} · {card.genre}
                  </span>
                </div>

                {/* Middle: Title, Huge Stat, Subtitle */}
                <div className={s.cMid}>
                  <p className={s.cTitle}>{card.title}</p>
                  <div className={s.cBigStat}>{card.bigStat}</div>
                  <p className={s.cSub}>{card.sub}</p>
                </div>

                {/* Footer: Action Label + Arrow */}
                <div className={s.cFoot}>
                  <span>{card.footer}</span>
                  <span className={s.cFootArrow} aria-hidden="true">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Full-Screen Interactive Showcase Modal (Opens ONLY when card clicked!) */}
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
            {/* Live Spine 4.2 WebGL Stage (100vw, 92vh) */}
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
