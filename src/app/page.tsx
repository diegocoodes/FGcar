import Image from "next/image";
import { ArrowDown, ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { Header } from "@/components/header";
import { Brand } from "@/components/brand";
import { HeroEntrance, Photo, Reveal } from "@/components/animation";
import { Services } from "@/components/services";
import { site } from "@/config/site";
import { BrandIntro } from "@/components/brand-intro";
import Testimonial1 from "@/components/ui/testimonial-section-1";
import { CareCards } from "@/components/care-cards";
import { ServiceSelectionProvider } from "@/components/service-selection";
import { ServicePreview } from "@/components/service-preview";

export default function Home() {
  return <>
    <BrandIntro />
    <Header />
    <ServiceSelectionProvider><main id="conteudo" tabIndex={-1}>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <HeroEntrance>
            <p className="eyebrow hero-eyebrow" data-enter>Estética automotiva em Santo André</p>
            <div className="hero-scene">
              <h1 id="hero-title" aria-label="FGcar Garage" data-enter>FGCAR</h1>
              <Photo className="hero-car" hero><Image src="/images/hero-car-v2.webp" alt="Carro esportivo vermelho visto de frente e de lado, imagem ilustrativa" fill priority sizes="(max-width: 767px) 90vw, (max-width: 1100px) 90vw, 1080px" /></Photo>
            </div>
            <p className="hero-description" data-enter>Seu carro merece esse cuidado.</p>
            <div className="hero-services" data-enter>
              <div><strong>Pintura</strong><span>Polimento e vitrificação</span></div>
              <div><strong>Proteção</strong><span>PPF para a carroceria</span></div>
              <div><strong>Vidros</strong><span>Insulfilm e película de segurança</span></div>
            </div>
            <div className="hero-actions" data-enter><a className="button button-primary" href="#contato">Solicitar orçamento<ArrowUpRight size={18} aria-hidden="true" /></a><a className="button button-outline" href="#servicos">Conhecer os serviços<ArrowDown size={16} aria-hidden="true" /></a></div>
          </HeroEntrance>
        </div>
      </section>

      <section className="services-section section-space" id="servicos" tabIndex={-1} aria-labelledby="services-title">
        <div className="container">
          <Reveal className="section-heading"><div><p className="eyebrow">Nossos serviços</p><h2 id="services-title">O cuidado certo.<br /><span className="muted">Para cada superfície.</span></h2></div><p className="section-intro">Da pintura aos vidros, cada tratamento tem uma função. Conheça as opções para o seu carro.</p></Reveal>
          <div className="services-layout"><Reveal className="services-visual"><ServicePreview /></Reveal><Reveal><Services /></Reveal></div>
        </div>
      </section>

      <section className="care-section section-space" id="cuidados" tabIndex={-1} aria-labelledby="care-title"><div className="container">
        <Reveal className="section-heading"><div><p className="eyebrow">Cuidados com o veículo</p><h2 id="care-title">O que seu carro<br />precisa hoje?</h2></div><p className="section-intro">O uso, o estado da pintura e a sua rotina ajudam a escolher o tratamento. A indicação depende da avaliação da nossa equipe.</p></Reveal>
        <Reveal className="care-grid"><CareCards /></Reveal>
        <Reveal className="care-note"><p>Na dúvida, conte como você usa seu carro. A gente ajuda a escolher.</p><a className="text-link" href="#contato">Fale com a FCar<ArrowUpRight size={16} /></a></Reveal>
      </div></section>

      <Testimonial1 />

      <section className="contact-section section-space" id="contato" tabIndex={-1} aria-labelledby="contact-title"><div className="container"><Reveal className="contact-layout"><div><p className="eyebrow">Seu próximo cuidado</p><h2 id="contact-title">Vamos cuidar<br />do seu carro<span className="red-text">?</span></h2><p className="contact-description">Conte qual é o seu veículo<br />e o serviço que você procura.</p><a className="button button-primary contact-button" href={site.instagram} target="_blank" rel="noopener noreferrer">Conversar no Instagram<ArrowUpRight size={19} /><span className="sr-only"> (abre em uma nova aba)</span></a></div><div className="contact-details"><div className="contact-detail"><MapPin size={20} aria-hidden="true" /><div><span>Encontre a FCar</span><p>{site.location}</p></div></div><div className="contact-detail"><Instagram size={20} aria-hidden="true" /><div><span>Acompanhe no Instagram</span><a href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramHandle}<ArrowUpRight size={16} /><span className="sr-only"> (abre em uma nova aba)</span></a></div></div><p className="contact-note">Pintura, proteção e acabamento.<br />Um cuidado de cada vez.</p></div></Reveal></div></section>
    </main></ServiceSelectionProvider>
    <footer className="site-footer"><div className="container footer-main"><Brand /><p>Estética automotiva.<br />{site.location}</p><a className="footer-instagram" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram<ArrowUpRight size={17} /><span className="sr-only"> (abre em uma nova aba)</span></a><a className="back-top" href="#inicio">Voltar ao início<ArrowUpRight size={17} /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>Fotografias ilustrativas.</span></div></footer>
  </>;
}
