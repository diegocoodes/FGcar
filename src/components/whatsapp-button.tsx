import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";

export function WhatsAppButton() {
  return <a className="whatsapp-floating" href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp da FGCAR (abre em uma nova aba)"><MessageCircle size={28} aria-hidden="true" /><span>WhatsApp</span></a>;
}
