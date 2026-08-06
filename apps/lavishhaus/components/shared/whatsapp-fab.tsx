import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";

export function WhatsappFab() {
  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
        "Hi Lavish Haus, I'd like to enquire about a piece."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Lavish Haus on WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
