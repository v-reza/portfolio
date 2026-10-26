"use client";

import { ProcessIntro } from "./ProcessIntro";
import { DeliveryElevation } from "./DeliveryElevation";
import s from "./DeliveryPipeline.module.css";

export function DeliveryPipeline() {
  return (
    <section id="process" className={s.section} aria-label="How I work">
      {/* 1. Full-screen word de-blur intro */}
      <ProcessIntro />

      {/* 2. Unified Delivery Elevation: 8 stations along the mountain + 4 animated metric cards */}
      <DeliveryElevation />
    </section>
  );
}
