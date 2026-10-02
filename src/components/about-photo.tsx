import Image from "next/image";

export function AboutPhoto() {
  return (
    <figure id="about-photo" className="service-preview">
      <div className="photo service-photo">
        <Image
          src="/images/about-fgcar.jpg"
          alt="Profissional com luvas realizando polimento no capô de um carro vermelho"
          fill
          sizes="(max-width: 767px) 90vw, (max-width: 1400px) 50vw, 700px"
          quality={85}
        />
      </div>
      <figcaption className="photo-caption">O acabamento começa no cuidado.</figcaption>
    </figure>
  );
}
