"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/animation";
import { useServiceSelection } from "@/components/service-selection";

type PreviewPhoto = { id: string; name: string; image: { src: string; alt: string } };
const initialPhoto: PreviewPhoto = {
  id: "detail",
  name: "O acabamento começa no cuidado.",
  image: { src: "/images/hero-car-v2.webp", alt: "Carro esportivo vermelho com pintura brilhante, imagem ilustrativa" },
};
const sizes = "(max-width: 767px) 90vw, (max-width: 1400px) 50vw, 700px";

function IncomingPhoto({ photo, onReveal }: { photo: PreviewPhoto; onReveal: (photo: PreviewPhoto) => void }) {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();
  return (
    <motion.div className="service-photo-layer" initial={false} animate={{ opacity: loaded ? 1 : 0 }} transition={{ duration: reduced ? 0.2 : 0.35, ease: "easeOut" }} onAnimationComplete={() => { if (loaded) onReveal(photo); }}>
      <Image src={photo.image.src} alt={photo.image.alt} fill sizes={sizes} quality={80} loading="eager" onLoad={() => setLoaded(true)} />
    </motion.div>
  );
}

export function ServicePreview() {
  const { selectedService } = useServiceSelection();
  const [displayed, setDisplayed] = useState<PreviewPhoto>(initialPhoto);
  const next = selectedService ?? initialPhoto;
  const changing = next.id !== displayed.id;

  return (
    <figure id="service-preview" className="service-preview" data-initial={displayed.id === "detail"}>
      <Photo className="service-photo">
        <div className="service-photo-layer" aria-hidden={changing ? true : undefined}>
          <Image src={displayed.image.src} alt={displayed.image.alt} fill sizes={sizes} quality={80} />
        </div>
        {changing && <IncomingPhoto key={next.id} photo={next} onReveal={setDisplayed} />}
      </Photo>
      <figcaption className="photo-caption" aria-live="polite" aria-atomic="true">
        <span>{displayed.name}</span>{displayed.id !== "detail" && <span className="service-preview-note">Imagem ilustrativa.</span>}
      </figcaption>
    </figure>
  );
}
