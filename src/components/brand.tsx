import Image from "next/image";
import { site } from "@/config/site";

export function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="FCar Garage, início">
      {site.logo ? (
        <Image src={site.logo} alt="" width={150} height={150} className="brand-image" />
      ) : null}
      <span className="wordmark" aria-hidden="true"><span>F<span className="brand-red">Car</span></span><span className="wordmark-sub">GARAGE</span></span>
    </a>
  );
}
