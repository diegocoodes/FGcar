"use client";

import { useRef } from "react";
import { frame, useAnimate, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { services } from "@/config/site";
import { useServiceSelection } from "@/components/service-selection";

function Service({ service, index }: { service: (typeof services)[number]; index: number }) {
  const details = useRef<HTMLDetailsElement>(null);
  const busy = useRef(false);
  const pendingToggle = useRef(false);
  const [scope, animate] = useAnimate();
  const reduced = useReducedMotion();
  const { selectedService, selectService } = useServiceSelection();

  async function toggle(event?: React.MouseEvent<HTMLElement>) {
    event?.preventDefault();
    if (event) selectService(service.id);
    if (busy.current) {
      pendingToggle.current = !pendingToggle.current;
      return;
    }
    if (!details.current) return;
    busy.current = true;
    const element = details.current;
    const panel = scope.current as HTMLDivElement;
    const closing = element.open;
    if (!closing) element.open = true;
    const height = panel.scrollHeight;
    try {
      await animate(panel, { height: closing ? [height, 0] : [0, height], opacity: closing ? [1, 0] : [0, 1] }, { duration: reduced ? 0.2 : 0.3, ease: "easeOut" });
      if (closing) element.open = false;
    } finally {
      // Clear after Motion's final paint so the content can reflow on resize.
      await new Promise<void>((resolve) => frame.postRender(() => {
        panel.style.height = "";
        panel.style.opacity = "";
        resolve();
      }));
      busy.current = false;
      if (pendingToggle.current) {
        pendingToggle.current = false;
        void toggle();
      }
    }
  }

  return <details ref={details} className="service-item" id={service.id} data-selected={selectedService?.id === service.id} data-stagger><summary onClick={(event) => void toggle(event)}><span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div className="service-summary-copy"><h3>{service.name}</h3><p>{service.description}</p></div><Plus className="service-plus" size={22} aria-hidden="true" /></summary><div ref={scope} className="service-detail"><p>{service.detail}</p><a className="text-link" href="#contato">Consultar sobre este serviço<span aria-hidden="true">↗</span></a></div></details>;
}

export function Services() {
  return <div className="services-list">{services.map((service, index) => <Service key={service.id} service={service} index={index} />)}</div>;
}
