"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAnimate } from "motion/react";
import { DrawLineText } from "@/components/ui/draw-line-text";
import { site } from "@/config/site";

export function BrandIntro() {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.location.hash) return;
    const element = scope.current as HTMLDivElement;
    element.setAttribute("data-playing", "true");
    const fade = animate(element, { opacity: [1, 0] }, { delay: 0.65, duration: 0.3, ease: "easeOut" });
    fade.then(() => { element.setAttribute("data-playing", "false"); });
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cancel = () => {
      if (media.matches) {
        fade.complete();
        element.setAttribute("data-playing", "false");
      }
    };
    media.addEventListener("change", cancel);
    return () => {
      media.removeEventListener("change", cancel);
      fade.complete();
      element.setAttribute("data-playing", "false");
    };
  }, [animate, scope]);

  return (
    <div ref={scope} className="brand-intro" data-playing="false" aria-hidden="true">
      <div className="intro-signature">
        {site.logo && <Image src={site.logo} width={150} height={150} alt="" className="intro-symbol" />}
        <DrawLineText className="intro-name" text="FGcar" fontSize={170} letterSpacing={-5} strokeWidth={2} accentFrom={2} decorative />
        <span className="intro-label">Garage</span>
      </div>
    </div>
  );
}
