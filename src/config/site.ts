export const site = {
  name: "FCar Garage",
  location: "Santo André, SP",
  instagram: "https://www.instagram.com/fcargarage_/",
  instagramHandle: "@fcargarage_",
  title: "FCar Garage | Estética automotiva em Santo André",
  description:
    "Conheça os serviços de vitrificação, PPF, polimento técnico e películas da FCar Garage em Santo André, SP. Entre em contato e solicite um orçamento.",
  logo: "/images/logofgcar.png" as string | null,
};

export const navigation = [
  { href: "#servicos", label: "Serviços" },
  { href: "#cuidados", label: "Cuidados" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export const services = [
  {
    id: "vitrificacao",
    name: "Vitrificação",
    description: "Proteção para a pintura. Mais facilidade para manter o brilho.",
    detail: "Um revestimento que ajuda a proteger a pintura e facilita a limpeza. Pode ser indicado para quem quer conservar o acabamento e simplificar a manutenção do carro.",
    image: { src: "/images/services/vitrificacao.webp", alt: "Aplicação de revestimento cerâmico com um aplicador na pintura de um carro preto" },
  },
  {
    id: "ppf",
    name: "PPF",
    description: "Uma película transparente entre a pintura e o dia a dia.",
    detail: "A película de proteção de pintura ajuda a reduzir marcas de pequenos impactos e do desgaste cotidiano. Indicada para adicionar proteção física às áreas mais expostas, após avaliação da equipe.",
    image: { src: "/images/services/ppf.webp", alt: "Instalação de película transparente de proteção sobre a carroceria de um carro" },
  },
  {
    id: "polimento",
    name: "Polimento técnico",
    description: "Menos marcas superficiais. O brilho da pintura de volta.",
    detail: "Reduz imperfeições superficiais e recupera o brilho, conforme as condições e a espessura da pintura. Pode ser indicado para marcas de lavagem e perda de acabamento, após avaliação.",
    image: { src: "/images/services/polimento.webp", alt: "Politriz com boina de espuma trabalhando sobre a pintura de um carro preto" },
  },
  {
    id: "insulfilm",
    name: "Insulfilm",
    description: "Conforto e privacidade, com a película certa para seu carro.",
    detail: "Películas para os vidros que podem melhorar o conforto e a privacidade. A equipe orienta a escolha conforme o veículo, o uso e as características de cada opção.",
    image: { src: "/images/services/insulfilm.webp", alt: "Aplicação de película escurecida no vidro lateral de um carro com uma espátula" },
  },
  {
    id: "antivandalismo",
    name: "Película antivandalismo",
    description: "Ajuda a manter os fragmentos do vidro unidos em caso de quebra.",
    detail: "Adiciona uma camada aos vidros para ajudar a manter os fragmentos unidos quando há quebra. A aplicação depende da avaliação do veículo. Não é blindagem nem oferece proteção absoluta.",
    image: { src: "/images/services/antivandalismo.webp", alt: "Demonstração ilustrativa de película de segurança mantendo unidos os fragmentos de um vidro automotivo quebrado" },
  },
];
