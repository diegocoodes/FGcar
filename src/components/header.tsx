import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/config/site";
import { Brand } from "./brand";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return <header className="site-header"><div className="container header-inner"><Brand /><nav className="desktop-nav" aria-label="Navegação principal">{navigation.map((item) => <a className="menu-link" href={item.href} key={item.href}>{item.label}</a>)}</nav><a className="button button-header" href="#contato">Solicitar orçamento<ArrowUpRight size={17} /></a><MobileMenu /></div></header>;
}
