"use client";

import { type ComponentProps, type CSSProperties, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type DrawTextProps = {
  afterFill?: boolean;
  color?: string;
  fontSize?: number;
  letterSpacing?: number;
  oneByOne?: boolean;
  strokeWidth?: number;
  text: string;
  wordSpacing?: number;
  accentFrom?: number;
  decorative?: boolean;
} & Omit<ComponentProps<"svg">, "children" | "color">;

/** Real text reserves the layout and stays readable without JavaScript. */
export function DrawLineText({
  text,
  oneByOne = true,
  afterFill = true,
  color = "currentColor",
  fontSize = 60,
  wordSpacing = 0,
  strokeWidth = 1.5,
  letterSpacing = 0,
  accentFrom,
  decorative = false,
  className,
  style,
  ...props
}: DrawTextProps) {
  const wrapper = useRef<HTMLSpanElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const root = wrapper.current;
      const graphic = svg.current;
      if (!root || !graphic) return;
      const letters = Array.from(graphic.querySelectorAll("tspan"));
      const readable = root.querySelector(".draw-line-readable");
      letters.forEach((letter) => {
        const length = Math.max(letter.getComputedTextLength() * 8, 80);
        gsap.set(letter, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(graphic, { opacity: 1 });
      if (afterFill) gsap.set(readable, { opacity: decorative ? 0 : 0.65 });
      const timeline = gsap.timeline();
      timeline.to(letters, {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: oneByOne ? { amount: 0.14 } : 0,
      });
      timeline.to(readable, { opacity: 1, duration: 0.28, ease: "power2.out" }, 0.64);
      timeline.to(graphic, { opacity: 0, duration: 0.28, ease: "power2.out" }, 0.64);
    });
    return () => media.revert();
  }, { scope: wrapper, dependencies: [text, oneByOne, afterFill, strokeWidth, decorative], revertOnUpdate: true });

  const variables = {
    "--draw-font-size": `${fontSize}px`,
    color,
    letterSpacing: `${letterSpacing}px`,
    wordSpacing: `${wordSpacing}px`,
  } as CSSProperties;

  return (
    <span ref={wrapper} className={cn("draw-line-text", className)} style={variables}>
      <span className="draw-line-readable">{accentFrom === undefined ? text : <>{text.slice(0, accentFrom)}<span className="draw-line-accent">{text.slice(accentFrom)}</span></>}</span>
      <svg {...props} ref={svg} className="draw-line-svg" style={style} viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <text x="0" y="95" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="100" fill="none" stroke={color} strokeWidth={strokeWidth} style={{ letterSpacing, wordSpacing }}>
          {Array.from(text).map((char, index) => <tspan key={index} stroke={accentFrom !== undefined && index >= accentFrom ? "var(--red)" : color}>{char}</tspan>)}
        </text>
      </svg>
    </span>
  );
}
