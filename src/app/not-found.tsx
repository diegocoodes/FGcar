import Link from "next/link";

export default function NotFound() {
  return <main className="container not-found"><p className="eyebrow">FCar Garage</p><h1>Página não encontrada.</h1><p>Volte ao início para conhecer os serviços e entrar em contato.</p><Link className="button button-primary" href="/">Voltar ao início</Link></main>;
}
