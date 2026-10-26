"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { stackItems, stackLayers } from "@/content/stack";
import s from "./StackMatrix.module.css";

export function StackMatrix() {
  const [active, setActive] = useState<string>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: stackItems.length };
    for (const item of stackItems) {
      map[item.layer] = (map[item.layer] ?? 0) + 1;
    }
    return map;
  }, []);

  const visible = useMemo(
    () => (active === "all" ? stackItems : stackItems.filter((i) => i.layer === active)),
    [active]
  );

  return (
    <section id="stack" className={s.section} aria-labelledby="stack-title">
      <div className={s.spotlight} aria-hidden="true" />

      <div className={s.inner}>
        <div className={s.header}>
          <p className={s.kicker}>My stack</p>
          <h2 id="stack-title" className={s.title}>
            Everything I know, unwrapped.
          </h2>
          <p className={s.sub}>
            {stackItems.length} tools I run in production, from the first schema to the shipped build.
          </p>
        </div>

        <div className={s.filters} role="tablist" aria-label="Filter the stack by layer">
          {stackLayers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              role="tab"
              aria-selected={active === layer.id}
              className={s.filter}
              onClick={() => setActive(layer.id)}
            >
              {layer.label}
              <span className={s.count}>{counts[layer.id] ?? 0}</span>
            </button>
          ))}
        </div>

        <ul className={s.grid}>
          {visible.map((item) => (
            <li
              key={item.name}
              className={`${s.item} ${item.invert ? s.invert : ""} ${item.lift ? s.lift : ""}`}
            >
              <span className={s.tile}>
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                />
              </span>
              <span className={s.label}>{item.name}</span>
            </li>
          ))}
        </ul>

        <p className={s.footer}>
          {active === "all"
            ? "Filter by layer to narrow the surface"
            : `${visible.length} in ${stackLayers.find((l) => l.id === active)?.label.toLowerCase()}`}
        </p>
      </div>
    </section>
  );
}
