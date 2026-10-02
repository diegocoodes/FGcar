import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { Brand } from "@/components/brand";
import { Reveal } from "@/components/animation";
import { navigation, services, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Reveal className="footer-heading">
          <div><p className="eyebrow">FGCAR Garage</p><h2>Cuidado em cada detalhe.<br /><span>Do início ao acabamento.</span></h2></div>
          <a className="button button-outline" href="#contato">Vamos cuidar do seu carro<ArrowUpRight size={18} aria-hidden="true" /></a>
        </Reveal>
        <Reveal className="footer-main">
          <div className="footer-brand" data-stagger><Brand /><p>Estética automotiva para valorizar<br />o que acompanha você todos os dias.</p><span className="footer-location">{site.location}</span><div className="footer-socials"><a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da FGCAR (abre em uma nova aba)"><Instagram size={20} aria-hidden="true" /></a><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da FGCAR (abre em uma nova aba)"><MessageCircle size={20} aria-hidden="true" /></a></div></div>
          <nav className="footer-nav" aria-label="Navegação do rodapé" data-stagger><h3>Explore</h3><a href="#sobre">Sobre nós</a>{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <nav className="footer-nav" aria-label="Serviços no rodapé" data-stagger><h3>Seu próximo cuidado</h3>{services.map((service) => <a key={service.id} href={`#${service.id}`}>{service.name}</a>)}</nav>
          <div className="footer-contact" data-stagger><h3>Uma conversa faz a diferença.</h3><p>Conte como está seu carro.<br />A gente ajuda a escolher o cuidado.</p><a className="text-link" href="#contato">Solicitar orçamento<ArrowUpRight size={16} aria-hidden="true" /></a></div>
        </Reveal>
        <Reveal className="footer-signature"><span aria-hidden="true">FGCAR<span> GARAGE</span></span></Reveal>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>Fotografias ilustrativas.</span><a className="back-top" href="#inicio">Voltar ao início<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
