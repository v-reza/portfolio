"use client";

import { useEffect, useState } from "react";
import s from "./SplashScreen.module.css";

export function SplashScreen() {
  const [count, setCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = setTimeout(() => {
        setDismissed(true);
        setUnmounted(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    let current = 0;
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * 8) + 5;
      current = Math.min(100, current + inc);
      setCount(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setDismissed(true);
          setTimeout(() => {
            setUnmounted(true);
          }, 850);
        }, 220);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (unmounted) return null;

  return (
    <div
      className={`${s.splashOverlay} ${dismissed ? s.splashDismissed : ""}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className={s.gridPattern} aria-hidden="true" />

      {/* Top Bar */}
      <div className={s.topBar}>
        <span>M Zulfi Fahreza</span>
        <span>Portfolio · 2026</span>
      </div>

      {/* Center Block */}
      <div className={s.centerBlock}>
        <h1 className={s.nameTitle}>
          reza<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <div className={s.roleSub}>Fullstack & AI Systems Engineer</div>

        <div className={s.progressWrap}>
          <div className={s.track}>
            <div className={s.fill} style={{ width: `${count}%` }} />
          </div>
          <span className={s.percentNum}>{count.toString().padStart(2, "0")}%</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={s.bottomBar}>
        <span>Malang, East Java</span>
        <span>Lat -7.98° Long 112.63°</span>
      </div>
    </div>
  );
}
