"use client";

import { type ReactNode, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useAnimate, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

const desktopQuery = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
function subscribeDesktop(callback: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function Reveal({ children, className = "", delay = 0, variant = "rise" }: { children: ReactNode; className?: string; delay?: number; variant?: "rise" | "photo" | "line" }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  const played = useRef(false);
  useEffect(() => {
    if (!inView || played.current) return;
    played.current = true;
    scope.current.setAttribute("data-revealed", "true");
    if (reduced) return;
    // Progressive enhancement: the server markup is always visible.
    const distance = window.matchMedia("(min-width: 768px)").matches ? 28 : 12;
    const items = Array.from(scope.current.querySelectorAll<HTMLElement>("[data-stagger]"));
    const targets = items.length ? items : [scope.current];
    const animations = targets.map((element, index) => animate(element,
      variant === "line" ? { scaleX: [0.65, 1], skewX: -15, opacity: [0.5, 1] } : variant === "photo" ? { scale: [1.025, 1], opacity: [0.5, 1], y: [distance / 2, 0] } : { opacity: [0.45, 1], y: [distance, 0] },
      { duration: variant === "photo" ? 0.8 : 0.65, delay: delay + index * 0.1, ease: [0.22, 1, 0.36, 1] }));
    return () => { animations.forEach((animation) => animation.complete()); };
  }, [inView, reduced, animate, scope, delay, variant]);
  return <div ref={scope} className={className}>{children}</div>;
}

export function HeroEntrance({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduced = useReducedMotion();
  useEffect(() => {
    const elements = scope.current.querySelectorAll("[data-enter]");
    const distance = window.matchMedia("(min-width: 768px)").matches ? 16 : 8;
    const introDelay = !reduced && !window.location.hash ? 0.6 : 0;
    const animations = Array.from(elements).map((element, index) => animate(element as HTMLElement, { opacity: element.classList.contains("hero-actions") ? [1, 1] : [0.8, 1], y: reduced ? [0, 0] : [distance, 0] }, { duration: 0.4, delay: introDelay + index * 0.08, ease: "easeOut" }));
    return () => { animations.forEach((animation) => animation.complete()); };
  }, [reduced, animate, scope]);
  return <div ref={scope} className="hero-copy">{children}</div>;
}

export function Photo({ children, className = "", hero = false }: { children: ReactNode; className?: string; hero?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const reduced = useReducedMotion();
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);
  useEffect(() => {
    if (!hero || reduced) return;
    const mobile = !window.matchMedia("(min-width: 768px)").matches;
    const animation = animate(scope.current, { scale: [mobile ? 1.02 : 1.04, 1] }, { duration: mobile ? 0.4 : 0.6, ease: "easeOut" });
    return () => { animation.complete(); };
  }, [hero, reduced, animate, scope]);
  return <div ref={ref} className={`photo ${className}`}><motion.div className="photo-parallax" style={{ y: desktop ? y : 0 }}><div ref={scope} className="photo-entrance"><div className="photo-image">{children}</div></div></motion.div></div>;
}
