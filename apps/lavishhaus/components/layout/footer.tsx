import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { footerNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { CookieSettingsButton } from "@/components/shared/consent";
import { FacebookIcon, InstagramIcon } from "@/components/shared/social-icons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-warm-black text-ivory/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={150}
                height={64}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-xs tracking-wide text-ivory/60 uppercase">
              Made by {siteConfig.manufacturer}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-wide text-ivory uppercase">
              Collections
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {footerNav.collections.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ivory/60 hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-wide text-ivory uppercase">
              Company
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ivory/60 hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-wide text-ivory uppercase">
              Visit
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-ivory/60">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {siteConfig.showroom.streetAddress}, {siteConfig.showroom.addressLocality}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            {/* Social links render only once the accounts are confirmed (config/site.ts). */}
            {siteConfig.social.instagram || siteConfig.social.facebook ? (
              <div className="mt-5 flex gap-4">
                {siteConfig.social.instagram ? (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Lavish Haus on Instagram (opens in a new tab)"
                    className="text-ivory/70 hover:text-gold"
                  >
                    <InstagramIcon className="size-5" />
                  </a>
                ) : null}
                {siteConfig.social.facebook ? (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Lavish Haus on Facebook (opens in a new tab)"
                    className="text-ivory/70 hover:text-gold"
                  >
                    <FacebookIcon className="size-5" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            ))}
            <CookieSettingsButton className="hover:text-gold" />
            <a
              href="https://qzenta.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              Powered by Qzenta
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
