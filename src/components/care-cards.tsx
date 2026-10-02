"use client";

import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useServiceSelection } from "@/components/service-selection";

const care = [
  { title: "Recuperar o acabamento", service: "Polimento técnico", text: "Para reduzir marcas superficiais e recuperar o brilho da pintura.", href: "#polimento" },
  { title: "Facilitar a conservação", service: "Vitrificação", text: "Para proteger a pintura e tornar a limpeza de manutenção mais simples.", href: "#vitrificacao" },
  { title: "Proteger a pintura", service: "PPF", text: "Para adicionar uma barreira física contra pequenos impactos e desgaste.", href: "#ppf" },
  { title: "Cuidar dos vidros", service: "Películas", text: "Para escolher conforto, privacidade ou retenção de fragmentos em caso de quebra.", href: "#insulfilm" },
];

export function CareCards() {
  const { selectedService, selectService } = useServiceSelection();
  const reduced = useReducedMotion();
  return care.map((item) => (
    <a className="care-item" href={item.href} key={item.title} data-stagger data-selected={selectedService?.id === item.href.slice(1)} onClick={(event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const serviceId = item.href.slice(1);
      selectService(serviceId);
      document.getElementById(serviceId)?.querySelector("summary")?.focus({ preventScroll: true });
      document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
      window.history.replaceState(null, "", item.href);
    }}>
      <span className="care-service">{item.service}</span><h3>{item.title}</h3><p>{item.text}</p>
      <span className="care-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
    </a>
  ));
}
