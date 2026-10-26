"use client";

import { useEffect, useState } from "react";
import { VisitCounter } from "@/components/guestbook/VisitCounter";
import { scrollToY } from "@/lib/smooth-scroll";
import s from "./SiteHeader.module.css";

const navSections = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "guestbook", label: "Buku Tamu" },
];

export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const sections = navSections.flatMap((item) => document.getElementById(item.id) ?? []);

    // The header belongs to the opening section only. Once the hero has
    // scrolled away it stays hidden for the rest of the page.
    const hero = document.querySelector("main > section");

    const onScroll = () => {
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setHidden(heroBottom <= 72);

      const current = sections.findLast(
        (sec) => sec.getBoundingClientRect().top <= window.innerHeight * 0.4
      );
      setActive(current?.id ?? null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    if (id === "top") {
      scrollToY(0);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    scrollToY(el.getBoundingClientRect().top + window.scrollY - 70);
  };

  return (
    <header className={`${s.header} ${hidden ? s.headerHidden : ""}`}>
      <button type="button" className={s.brand} onClick={() => go("top")}>
        <span>M ZULFI FAHREZA</span>
        <span className={s.brandDot} aria-hidden="true" />
      </button>

      <nav className={s.nav} aria-label="Main chapters">
        <ul className={s.navList}>
          {navSections.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${s.navLink} ${active === item.id ? s.navLinkActive : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={s.rightGroup}>
        <VisitCounter />
        <a
          href="#contact"
          className={s.sayHeyBtn}
          onClick={(e) => {
            e.preventDefault();
            go("contact");
          }}
        >
          <span>Say hey</span>
          <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className={s.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Index"}
        </button>
      </div>

      {menuOpen && (
        <div className={s.mobileMenu}>
          {navSections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={s.navLink}
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
