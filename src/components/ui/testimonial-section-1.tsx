import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/animation";
import { googleReviews } from "@/config/reviews";
import { cn } from "@/lib/utils";
import { ReviewerAvatar } from "./reviewer-avatar";

export default function Testimonial1() {
  return (
    <section className="reviews-section section-space" id="avaliacoes" tabIndex={-1} aria-labelledby="reviews-title">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">Avaliações no Google</p>
            <h2 id="reviews-title">Quem já passou<br />pela FG Car.</h2>
          </div>
          <div className="reviews-summary">
            <div className="reviews-score"><span>{googleReviews.rating.toLocaleString("pt-BR")}</span><Star size={22} fill="currentColor" aria-hidden="true" /><p>{googleReviews.reviewCount} avaliações no Google</p></div>
            <p className="reviews-business">{googleReviews.businessName}</p>
            <a className="text-link" href={googleReviews.mapsUrl} target="_blank" rel="noopener noreferrer">Ver no Google<ArrowUpRight size={16} /><span className="sr-only"> (abre em uma nova aba)</span></a>
          </div>
        </Reveal>
        <div className="testimonials-grid">
          {googleReviews.testimonials.map((testimonial) => (
            <Reveal key={testimonial.name} className={cn("testimonial-card", testimonial.featured && "testimonial-featured")} delay={testimonial.featured ? 0 : 0.08}>
              <figure>
                <Quote className="testimonial-quote-icon" size={27} strokeWidth={1.5} aria-hidden="true" />
                <blockquote><p>{testimonial.quote}</p></blockquote>
                <figcaption>
                  <ReviewerAvatar photo={testimonial.photo} initials={testimonial.initials} />
                  <div>
                    {testimonial.profileUrl ? (
                      <a className="testimonial-name" href={testimonial.profileUrl} target="_blank" rel="noopener noreferrer">
                        {testimonial.name}<span className="sr-only"> (abre o perfil no Google Maps em uma nova aba)</span>
                      </a>
                    ) : <span className="testimonial-name">{testimonial.name}</span>}
                    <span className="testimonial-source">Avaliação no Google</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="reviews-footnote">Comentários sobre a {googleReviews.businessName}, em Santo André.</p>
      </div>
    </section>
  );
}
