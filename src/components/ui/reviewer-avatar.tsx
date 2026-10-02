"use client";

import Image from "next/image";
import { useState } from "react";

export function ReviewerAvatar({ photo, initials }: { photo: string | null; initials: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="reviewer-avatar" aria-hidden="true">
      {photo && !failed ? (
        <Image src={photo} alt="" fill sizes="52px" className="reviewer-photo" onError={() => setFailed(true)} />
      ) : <span className="testimonial-initials">{initials}</span>}
    </span>
  );
}
