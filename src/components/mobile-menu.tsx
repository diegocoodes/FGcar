"use client";

import { useEffect, useRef } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/config/site";

export function MobileMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [scope, animate] = useAnimate();
  const reduced = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (media.matches) dialog.current?.close(); };
    media.addEventListener("change", onResize);
    return () => {
      media.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, []);

  function openMenu() {
    dialog.current?.showModal();
    trigger.current?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    animate(scope.current, { opacity: [0.5, 1], y: reduced ? [0, 0] : [-8, 0] }, { duration: 0.25, ease: "easeOut" });
  }

  async function closeMenu() {
    await animate(scope.current, { opacity: 0, y: reduced ? 0 : -8 }, { duration: 0.2, ease: "easeOut" });
    dialog.current?.close();
  }

  function onClose() {
    document.body.style.overflow = "";
    trigger.current?.setAttribute("aria-expanded", "false");
    trigger.current?.focus();
  }

  function navigate(href: string) {
    dialog.current?.close();
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(href);
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
      window.history.replaceState(null, "", href);
    });
  }

  function containFocus(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const items = event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <div className="mobile-menu">
      <button ref={trigger} className="icon-button menu-trigger" onClick={openMenu} aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-navigation"><Menu size={24} /></button>
      <dialog id="mobile-navigation" ref={dialog} className="mobile-dialog" aria-label="Menu de navegação" onClose={onClose} onKeyDown={containFocus} onCancel={(event) => { event.preventDefault(); void closeMenu(); }} onClick={(event) => { if (event.target === event.currentTarget) void closeMenu(); }}>
        <div ref={scope} className="mobile-dialog-content">
          <div className="mobile-dialog-top"><span className="eyebrow">FCar Garage</span><button className="icon-button" onClick={() => void closeMenu()} aria-label="Fechar menu" autoFocus><X size={24} /></button></div>
          <nav aria-label="Navegação mobile">{navigation.map((item) => <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); navigate(item.href); }}>{item.label}<ArrowUpRight size={22} /></a>)}</nav>
          <a className="button button-primary" href="#contato" onClick={(event) => { event.preventDefault(); navigate("#contato"); }}>Solicitar orçamento<ArrowUpRight size={18} /></a>
        </div>
      </dialog>
      <noscript><nav className="no-js-navigation" aria-label="Navegação mobile">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></noscript>
    </div>
  );
}
