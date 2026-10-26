"use client";

import s from "./AboutMe.module.css";

export function AboutMe() {
  return (
    <section id="about" className={s.section} aria-labelledby="about-title">
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.num}>ABOUT ME</div>
          <h2 id="about-title" className={s.title}>
            A little more about me.
            <span className={s.handNote}>— yet, I have too many tabs open.</span>
          </h2>
        </div>

        {/* Browser window mockup */}
        <div className={s.browserWindow}>
          <div className={s.browserHeader}>
            <div className={s.dots}>
              <span className={s.dot} style={{ background: "#ef4444" }} />
              <span className={s.dot} style={{ background: "#f59e0b" }} />
              <span className={s.dot} style={{ background: "#10b981" }} />
            </div>
            <div className={s.addressBar}>
              https://reza.dev/about · Malang Engine Core
            </div>
          </div>

          <div className={s.browserContent}>
            <div>
              <h3 className={s.bioHeading}>
                Engineer by trade. <br />
                Builder by obsession.
              </h3>
              <p className={s.bioText}>
                Based in Malang, East Java. I spend my days designing high-scale modular monoliths
                and microservices, orchestrating multi-LLM pipelines, and building autonomous agent
                teams that turn human intent into verified software.
              </p>
              <p className={s.bioText} style={{ color: "var(--muted)", fontStyle: "italic" }}>
                “I believe the best code is either zero lines, or so well-tested and deterministic
                that you forget it runs.”
              </p>
            </div>

            <div className={s.factsList}>
              <div className={s.factRow}>
                <span className={s.factKey}>Location</span>
                <span className={s.factVal}>Malang, East Java, Indonesia</span>
              </div>
              <div className={s.factRow}>
                <span className={s.factKey}>Focus</span>
                <span className={s.factVal}>Fullstack Architecture & AI Agent Fleets</span>
              </div>
              <div className={s.factRow}>
                <span className={s.factKey}>Company</span>
                <span className={s.factVal}>Nexatriv (Co-founder & Software Engineer)</span>
              </div>
              <div className={s.factRow}>
                <span className={s.factKey}>Languages</span>
                <span className={s.factVal}>Bahasa Indonesia (Native) · English (Professional)</span>
              </div>
              <div className={s.factRow}>
                <span className={s.factKey}>Editor</span>
                <span className={s.factVal}>Hermes · OpenCode · Neovim</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
