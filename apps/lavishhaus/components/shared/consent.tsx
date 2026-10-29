"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";

const CLARITY_ID = "xybxgfgo4s";

function useConsent() {
  return useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
}

/** Microsoft Clarity, loaded only after the visitor accepts analytics. */
export function ConsentedAnalytics() {
  if (useConsent() !== "granted") return null;
  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`,
      }}
    />
  );
}

/** Non-modal banner; shown until the visitor accepts or declines. */
export function ConsentBanner() {
  if (useConsent() !== null) return null;
  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-ivory/15 bg-warm-black text-ivory shadow-[0_-8px_24px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="max-w-2xl text-sm leading-relaxed text-ivory/85">
          We&apos;d like to use Microsoft Clarity analytics cookies to see how the site is used.
          Nothing is loaded unless you accept.{" "}
          <Link
            href="/privacy#analytics"
            className="text-gold-muted underline underline-offset-4 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
          >
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-none border-ivory/50 bg-transparent text-ivory hover:bg-ivory/10 hover:text-ivory focus-visible:ring-ivory sm:flex-none"
            onClick={() => writeConsent("denied")}
          >
            Decline
          </Button>
          <Button
            type="button"
            className="flex-1 rounded-none bg-gold text-warm-black hover:bg-gold-muted focus-visible:ring-ivory sm:flex-none"
            onClick={() => writeConsent("granted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Footer control to change the choice. Withdrawing consent reloads the page
 * so an already-running Clarity script is gone.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  const consent = useConsent();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        writeConsent(null);
        if (consent === "granted") window.location.reload();
      }}
    >
      Cookie settings
    </button>
  );
}
