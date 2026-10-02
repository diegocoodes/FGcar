"use client";

import { ArrowUpRight, ShieldCheck, Sparkles, Sun } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useServiceSelection } from "@/components/service-selection";

const care = [
  { title: "Recuperar o acabamento", service: "Polimento técnico", text: "As marcas de lavagem e a perda de brilho aparecem com o tempo. O polimento técnico ajuda a recuperar o acabamento e valorizar a pintura do seu carro.", href: "#polimento", icon: Sparkles },
  { title: "Proteger a pintura", service: "PPF e vitrificação", text: "Mais cuidado entre a pintura e o dia a dia. Conheça as opções de proteção para reduzir o desgaste, conservar o brilho e facilitar a manutenção.", href: "#ppf", icon: ShieldCheck },
  { title: "Cuidar dos vidros", service: "Películas automotivas", text: "Conforto e privacidade também fazem parte do cuidado. Escolha a película para os vidros de acordo com o seu veículo, suas necessidades e sua rotina.", href: "#insulfilm", icon: Sun },
];

export function CareCards() {
  const { selectedService, selectService } = useServiceSelection();
  const reduced = useReducedMotion();
  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const serviceId = href.slice(1);
      selectService(serviceId);
      document.getElementById(serviceId)?.querySelector("summary")?.focus({ preventScroll: true });
      document.getElementById(serviceId)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
      window.history.replaceState(null, "", href);
  }
  return care.map((item, index) => (
    <article className="care-item" key={item.title} data-stagger data-selected={selectedService?.id === item.href.slice(1) || (index === 1 && selectedService?.id === "vitrificacao")}>
      <a className="care-action" href={item.href} onClick={(event) => navigate(event, item.href)}>
        <p>{item.text}</p>
        <div className="care-card-footer"><span className="care-icon" aria-hidden="true"><item.icon size={21} /></span><div><h3>{item.title}</h3><span className="care-service">{item.service}</span></div><ArrowUpRight className="care-arrow" size={19} aria-hidden="true" /></div>
      </a>
      {index === 1 && <a className="care-secondary" href="#vitrificacao" onClick={(event) => navigate(event, "#vitrificacao")}>Conhecer a vitrificação<ArrowUpRight size={14} aria-hidden="true" /></a>}
    </article>
  ));
}
