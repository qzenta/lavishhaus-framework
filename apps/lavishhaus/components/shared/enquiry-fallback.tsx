import { Mail, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

/** Shown when an enquiry couldn't be sent, so the visitor still has a way through. */
export function EnquiryFallback({ message, email }: { message: string; email: string }) {
  const { phone, whatsapp } = siteConfig.contact;
  const linkClass =
    "inline-flex items-center gap-2 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";
  return (
    <div role="alert" className="border border-destructive/40 bg-destructive/5 p-4 text-sm">
      <p className="text-destructive">{message}</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-charcoal">
        <li>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className={linkClass}>
            <Phone className="size-4" aria-hidden="true" />
            {phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${email}`} className={linkClass}>
            <Mail className="size-4" aria-hidden="true" />
            {email}
          </a>
        </li>
      </ul>
    </div>
  );
}
