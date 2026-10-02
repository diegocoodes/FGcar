import Image from "next/image";
import { ArrowDown, ArrowUpRight, Instagram, MapPin, MessageCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Brand } from "@/components/brand";
import { HeroEntrance, Photo, Reveal } from "@/components/animation";
import { Services } from "@/components/services";
import { site } from "@/config/site";
import { BrandIntro } from "@/components/brand-intro";
import Testimonial1 from "@/components/ui/testimonial-section-1";
import { CareCards } from "@/components/care-cards";
import { ServiceSelectionProvider } from "@/components/service-selection";
import { AboutPhoto } from "@/components/about-photo";

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
          <section className="services-layout" id="sobre" aria-labelledby="about-title">
            <Reveal className="services-visual"><AboutPhoto /></Reveal>
            <Reveal className="services-about">
              <p className="eyebrow">FGCAR Garage</p>
              <h2 id="about-title">Sobre <span>nós</span></h2>
              <p className="about-tagline">Seu carro. Nosso cuidado.</p>
              <p>O brilho chama atenção. O cuidado faz a diferença. Da pintura aos vidros, tratamos cada superfície para valorizar o acabamento do seu carro.</p>
              <h3>Um tratamento para cada necessidade.</h3>
              <p>Avaliamos o veículo e ajudamos você a escolher a proteção e o acabamento que combinam com a sua rotina.</p>
              <a className="text-link" href="#contato">Converse com a nossa equipe<ArrowUpRight size={16} aria-hidden="true" /></a>
            </Reveal>
          </section>
          <div className="services-divider" aria-hidden="true" />
          <Reveal className="services-heading"><h2 id="services-title">Nossos serviços</h2><p>Escolha um serviço e descubra o cuidado por trás de cada detalhe.</p></Reveal>
          <Reveal><Services /></Reveal>
        </div>
      </section>

      <section className="care-section section-space" id="cuidados" tabIndex={-1} aria-labelledby="care-title"><div className="container">
        <Reveal className="care-heading"><p className="eyebrow">Cuidados com seu carro</p><h2 id="care-title">O cuidado que seu<br /><span>carro merece.</span></h2><p>Brilho, proteção e conforto. Encontre o cuidado para o seu dia a dia.</p></Reveal>
        <Reveal className="care-grid"><CareCards /></Reveal>
        <Reveal className="care-note"><p>Na dúvida, conte como você usa seu carro. A gente ajuda a escolher.</p><a className="text-link" href="#contato">Fale com a FCar<ArrowUpRight size={16} /></a></Reveal>
      </div></section>

      <Testimonial1 />

      <section className="contact-section section-space" id="contato" tabIndex={-1} aria-labelledby="contact-title">
        <div className="container">
          <Reveal className="contact-heading">
              <p className="eyebrow">Seu próximo cuidado</p>
              <h2 id="contact-title">O próximo cuidado<br /><span>começa aqui.</span></h2>
              <p className="contact-description">Conte qual é o seu carro e o que você procura. A gente ajuda você a escolher o tratamento.</p>
          </Reveal>
          <Reveal className="contact-layout">
            <span className="contact-icon" aria-hidden="true"><MessageCircle size={30} /></span>
            <p className="contact-card-label">Fale com a FGCAR Garage</p>
            <div className="contact-phone"><a href={site.phoneHref} aria-label={`Ligar para ${site.phone}`}>{site.phone}</a></div>
            <p className="contact-channel">Telefone e WhatsApp</p>
            <a className="button button-primary contact-button" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" />Conversar no WhatsApp<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (abre em uma nova aba)</span></a>
            <div className="contact-links">
              <div className="contact-detail"><MapPin size={18} aria-hidden="true" /><span>{site.location}</span></div>
              <a className="contact-detail" href={site.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} aria-hidden="true" /><span>{site.instagramHandle}</span><ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (abre em uma nova aba)</span></a>
            </div>
            <p className="contact-note">Pintura, proteção e acabamento. Um cuidado de cada vez.</p>
          </Reveal>
        </div>
      </section>
    </main></ServiceSelectionProvider>
    <footer className="site-footer"><div className="container footer-main"><Brand /><p>Estética automotiva.<br />{site.location}</p><a className="footer-instagram" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram<ArrowUpRight size={17} /><span className="sr-only"> (abre em uma nova aba)</span></a><a className="back-top" href="#inicio">Voltar ao início<ArrowUpRight size={17} /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>Fotografias ilustrativas.</span></div></footer>
  </>;
}
