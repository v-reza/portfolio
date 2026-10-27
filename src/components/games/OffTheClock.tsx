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
  bigStatLabel?: string;
  sub: string;
  footer: string;
  bgGradient?: string;
  bgImage?: string;
  borderColor: string;
  highlightColor: string;
  glow: string;
  logo?: string;
  textLogo?: string;
  isInteractive?: boolean;
}

const CARDS: GameCard[] = [
  {
    id: "wuwa",
    num: "01",
    genre: "ARPG",
    title: "Wuthering Waves 鸣潮",
    bigStat: "UL 80",
    bigStatLabel: "Union Level",
    sub: "Solaris-3 · Data Bank Lv. 30 · Tower of Adversity 30/30 · 36 Resonators",
    footer: "Launch WebGL Engine",
    bgImage: "/images/wuwa/bg_main.webp",
    borderColor: "rgba(218, 182, 125, 0.4)",
    highlightColor: "#dab67d",
    glow: "rgba(218, 182, 125, 0.45)",
    logo: "/images/wuwa/wuwa-mini-icon.png",
    textLogo: "/images/wuwa/wuwa-text-only.png",
    isInteractive: true,
  },
  {
    id: "deadlock",
    num: "02",
    genre: "TACTICAL MOBA",
    title: "Deadlock",
    bigStat: "6v6",
    bigStatLabel: "Hero Shooter",
    sub: "Valve closed playtest · Lane priority, wave control, and teamfight execution",
    footer: "Active Playtest",
    bgGradient:
      "radial-gradient(circle at 80% 15%, rgba(58, 166, 224, 0.18) 0%, transparent 55%), linear-gradient(160deg, #101622 0%, #080d16 100%)",
    borderColor: "rgba(58, 166, 224, 0.35)",
    highlightColor: "#3aa6e0",
    glow: "rgba(58, 166, 224, 0.4)",
  },
  {
    id: "rematch",
    num: "03",
    genre: "COMPETITIVE ACTION",
    title: "Rematch",
    bigStat: "+Frame",
    bigStatLabel: "Neutral Control",
    sub: "Neutral spacing pressure, frame advantage, and reactive whiff punishing",
    footer: "Action Fighter",
    bgGradient:
      "radial-gradient(circle at 80% 15%, rgba(224, 49, 49, 0.2) 0%, transparent 55%), linear-gradient(160deg, #1c0e12 0%, #0a0507 100%)",
    borderColor: "rgba(224, 49, 49, 0.35)",
    highlightColor: "#ff4d4f",
    glow: "rgba(224, 49, 49, 0.4)",
  },
  {
    id: "valheim",
    num: "04",
    genre: "NORSE SURVIVAL",
    title: "Valheim",
    bigStat: "Linux",
    bigStatLabel: "Dedicated Host",
    sub: "Self-hosted Linux dedicated server · Structural load physics & procedural exploration",
    footer: "Norse Survival",
    bgGradient:
      "radial-gradient(circle at 80% 15%, rgba(43, 138, 62, 0.2) 0%, transparent 55%), linear-gradient(160deg, #0d1813 0%, #060b08 100%)",
    borderColor: "rgba(43, 138, 62, 0.35)",
    highlightColor: "#51cf66",
    glow: "rgba(43, 138, 62, 0.4)",
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
      {/* 1. Header: Kuro Games refined gold and bone-ivory typography */}
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
                    "--bg": card.bgGradient || "transparent",
                    "--border-color": card.borderColor,
                    "--highlight-color": card.highlightColor,
                    "--glow": card.glow,
                  } as React.CSSProperties
                }
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCardClick(card)}
              >
                {/* Background Image Layer for Wuthering Waves (bg_main.webp) */}
                {card.bgImage && (
                  <>
                    <div
                      className={s.cardBgImage}
                      style={{ backgroundImage: `url(${card.bgImage})` }}
                      aria-hidden="true"
                    />
                    <div className={s.cardOverlay} aria-hidden="true" />
                  </>
                )}

                {/* Top Row: Official Kuro Logo + Badge */}
                <div className={s.cTop}>
                  <div className={s.cLogoGroup}>
                    <div className={s.cIconBox}>
                      {card.logo ? (
                        <Image
                          src={card.logo}
                          alt=""
                          width={28}
                          height={28}
                          className={s.cLogoImg}
                        />
                      ) : (
                        <span className={s.cIconNum}>{card.num}</span>
                      )}
                    </div>

                    {/* Official Kuro "WUTHERING WAVES" text logo */}
                    {card.textLogo && (
                      <Image
                        src={card.textLogo}
                        alt="Wuthering Waves"
                        width={96}
                        height={31}
                        className={s.cTextLogoImg}
                      />
                    )}
                  </div>

                  <span className={s.cBadge}>
                    {card.num} · {card.genre}
                  </span>
                </div>

                {/* Middle: Title, Stat, Subtitle */}
                <div className={s.cMid}>
                  <p className={s.cTitle}>{card.title}</p>
                  <div className={s.cBigStatRow}>
                    <span className={s.cBigStat}>{card.bigStat}</span>
                    {card.bigStatLabel && (
                      <span className={s.cBigStatLabel}>{card.bigStatLabel}</span>
                    )}
                  </div>
                  <p className={s.cSub}>{card.sub}</p>
                </div>

                {/* Footer: Action Link + Arrow */}
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

      {/* 3. Full-Screen Interactive Showcase Modal */}
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
