"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { services, site } from "@/config/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const message = [
    "Olá, FGCAR Garage! Gostaria de solicitar um orçamento.",
    `Nome: ${name.trim()}`,
    `Veículo: ${vehicle.trim()}`,
    `Serviço: ${service}`,
    details.trim() ? `Detalhes: ${details.trim()}` : "",
  ].filter(Boolean).join("\n");

  return (
    <form className="contact-form" action={site.whatsapp} method="get" target="_blank" rel="noopener noreferrer">
      <input type="hidden" name="text" value={message} />
      <div className="contact-form-row">
        <div className="contact-field"><label htmlFor="contact-name">Seu nome</label><input id="contact-name" autoComplete="name" placeholder="Como podemos chamar você?" value={name} onChange={(event) => setName(event.target.value)} required pattern=".*\S.*" maxLength={80} /></div>
        <div className="contact-field"><label htmlFor="contact-vehicle">Seu veículo</label><input id="contact-vehicle" autoComplete="off" placeholder="Ex.: Volkswagen Golf 2020" value={vehicle} onChange={(event) => setVehicle(event.target.value)} required pattern=".*\S.*" maxLength={120} /></div>
      </div>
      <div className="contact-field"><label htmlFor="contact-service">Qual cuidado você procura?</label><select id="contact-service" value={service} onChange={(event) => setService(event.target.value)} required><option value="" disabled>Selecione um serviço</option>{services.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}<option value="Preciso de orientação">Preciso de orientação</option></select></div>
      <div className="contact-field"><label htmlFor="contact-details">Conte um pouco mais <span>(opcional)</span></label><textarea id="contact-details" rows={3} placeholder="Como está seu carro? O que você gostaria de melhorar?" value={details} onChange={(event) => setDetails(event.target.value)} maxLength={1000} /></div>
      <button className="button button-primary contact-button" type="submit"><MessageCircle size={20} aria-hidden="true" />Continuar no WhatsApp<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (abre em uma nova aba)</span></button>
      <p className="contact-form-note">Sua mensagem estará pronta no WhatsApp. Revise e envie para nossa equipe.</p>
    </form>
  );
}
