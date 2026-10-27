"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import s from "./OffTheClock.module.css";
import statsS from "./WutheringWavesSection.module.css";

interface GameCard {
  id: string;
  title: string;
  footer: string;
  bgGradient?: string;
  bgImage?: string;
  borderColor: string;
  highlightColor: string;
  glow: string;
  textLogo?: string;
  isInteractive?: boolean;
}

const CARDS: GameCard[] = [
  {
    id: "wuwa",
    title: "Wuthering Waves",
    footer: "View My Profile",
    bgImage: "/images/wuwa/bg_main.webp",
    textLogo: "/images/wuwa/wuwa-text-only.png",
    borderColor: "rgba(218, 182, 125, 0.45)",
    highlightColor: "#dab67d",
    glow: "rgba(218, 182, 125, 0.45)",
    isInteractive: true,
  },
  {
    id: "deadlock",
    title: "Deadlock",
    footer: "Active Playtest",
    bgGradient:
      "radial-gradient(circle at 50% 50%, rgba(58, 166, 224, 0.22) 0%, transparent 65%), linear-gradient(160deg, #101622 0%, #080d16 100%)",
    borderColor: "rgba(58, 166, 224, 0.35)",
    highlightColor: "#3aa6e0",
    glow: "rgba(58, 166, 224, 0.4)",
  },
  {
    id: "rematch",
    title: "Rematch",
    footer: "Action Fighter",
    bgGradient:
      "radial-gradient(circle at 50% 50%, rgba(224, 49, 49, 0.22) 0%, transparent 65%), linear-gradient(160deg, #1c0e12 0%, #0a0507 100%)",
    borderColor: "rgba(224, 49, 49, 0.35)",
    highlightColor: "#ff4d4f",
    glow: "rgba(224, 49, 49, 0.4)",
  },
  {
    id: "valheim",
    title: "Valheim",
    footer: "Norse Survival",
    bgGradient:
      "radial-gradient(circle at 50% 50%, rgba(43, 138, 62, 0.22) 0%, transparent 65%), linear-gradient(160deg, #0d1813 0%, #060b08 100%)",
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
    const rotX = ((y / rect.height - 0.5) * -10).toFixed(2);
    const rotY = ((x / rect.width - 0.5) * 10).toFixed(2);
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
      {/* 1. Header: Clean kicker and headline only */}
      <div className={s.headerWrap}>
        <p className={s.kicker}>Off The Clock</p>
        <h2 className={s.headline}>
          When the terminal closes, <br />
          <span className={s.highlightText}>I play some video games.</span>
        </h2>
      </div>

      {/* 2. 4-Column Minimal Cards Grid */}
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
                {/* Full-bleed background key art */}
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

                {/* Center of card: Just the official logo/text, nothing else */}
                <div className={s.cCenter}>
                  {card.textLogo ? (
                    <Image
                      src={card.textLogo}
                      alt={card.title}
                      width={210}
                      height={67}
                      className={s.cCenterLogo}
                      priority
                    />
                  ) : (
                    <span className={s.cCenterTitle}>{card.title}</span>
                  )}
                </div>

                {/* Card Footer: Action Label + Arrow */}
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

      {/* 3. Full-Screen Interactive Showcase Modal (Opens on Wuthering Waves click) */}
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
              <span className={s.modalGameTitle}>Wuthering Waves 鸣潮 · Live WebGL Engine</span>
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
