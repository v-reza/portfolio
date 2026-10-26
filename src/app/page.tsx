import { SplashScreen } from "@/components/splash/SplashScreen";
import { SiteHeader } from "@/components/header/SiteHeader";
import { SamayHero } from "@/components/hero/SamayHero";
import { GlassesTransition } from "@/components/transition/GlassesTransition";
import { FeaturedWork } from "@/components/work/FeaturedWork";
import { StackMatrix } from "@/components/stack/StackMatrix";
import { DeliveryPipeline } from "@/components/process/DeliveryPipeline";
import { AboutMe } from "@/components/about/AboutMe";
import { GameRotationIntro } from "@/components/games/GameRotationIntro";
import { WutheringWavesSection } from "@/components/games/WutheringWavesSection";
import { GuestBook } from "@/components/guestbook/GuestBook";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <SiteHeader />
      <main>
        <SamayHero />
        <GlassesTransition />
        <FeaturedWork />
        <StackMatrix />
        <DeliveryPipeline />
        <AboutMe />
        <GameRotationIntro />
        <WutheringWavesSection />
        <GuestBook />
        <ContactSection />
      </main>
    </>
  );
}
