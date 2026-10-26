"use client";

import Image from "next/image";
import s from "./WutheringWavesSection.module.css";

export function WutheringWavesSection() {
  return (
    <section id="wuthering-waves" className={s.section} aria-label="Wuthering Waves showcase">
      {/* 1. Cinematic Wuthering Waves Headline Banner */}
      <div className={s.bannerHeader}>
        <div className={s.titleArea}>
          <p className={s.kicker}>Off-Day Rotation · ARPG</p>
          <div className={s.wuwaLogoRow}>
            <h2 className={s.wuwaTitle}>Wuthering Waves</h2>
            <span className={s.cnSeal}>鳴潮</span>
          </div>
          <p className={s.subtitle}>
            Solaris-3 Resonance Protocol · High-speed combat, dodge-counter parries, and endgame
            Tower of Adversity speedrunning.
          </p>
        </div>

        <div className={s.statusPill}>
          <span className={s.statusDot} />
          <span>Active Main Game</span>
        </div>
      </div>

      {/* 2. Full-Width (100vw, 100vh) Live WebGL Spine 4.2 Resonators Showcase */}
      <div className={s.stageContainer}>
        <iframe
          src="/wuwa/hsin-viewer/index.html"
          title="Wuthering Waves Resonators Spine 4.2 WebGL Stage"
          className={s.stageIframe}
          loading="lazy"
          allow="autoplay"
        />
      </div>

      {/* 3. Reza's In-Game Account Stats Card (Exact match to screenshot) */}
      <div className={s.accountSection}>
        <div className={s.statsWidget}>
          <div className={s.widgetHeader}>
            <Image
              src="/images/wuwa/wuwa-mini-icon.png"
              alt="Wuthering Waves"
              width={22}
              height={22}
              className={s.widgetIcon}
            />
            <span className={s.widgetGameTitle}>Wuthering Waves</span>
          </div>

          <div className={s.widgetIdentityRow}>
            <div className={s.identityText}>
              <h3 className={s.playerIGN}>Vyrenn</h3>
              <p className={s.playerServerText}>Server: SEA</p>
            </div>

            <div className={s.portraitWrap}>
              <Image
                src="/images/wuwa/vyrenn-portrait.png"
                alt="Vyrenn"
                width={190}
                height={145}
                className={s.portraitImg}
                priority
              />
            </div>
          </div>

          <div className={s.statsGrid}>
            <div className={s.statItem}>
              <span className={s.statNumber}>80</span>
              <span className={s.statLabel}>Union Level</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statNumber}>36</span>
              <span className={s.statLabel}>Resonators</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statNumber}>723</span>
              <span className={s.statLabel}>Achievements</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statNumber}>744</span>
              <span className={s.statLabel}>Echoes</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statNumber}>574</span>
              <span className={s.statLabel}>Login Days</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statNumber}>30</span>
              <span className={s.statLabel}>Data Bank Level</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
