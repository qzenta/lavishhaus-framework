"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Menu, MessageCircle } from "lucide-react";

import { COLLECTIONS_HREF, collectionCategories, primaryNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// The mobile menu (Radix Dialog) is only downloaded when it's first opened.
const MobileMenu = dynamic(() => import("./mobile-menu").then((m) => m.MobileMenu), {
  ssr: false,
});

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuRequested, setMenuRequested] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const collectionsIndex = primaryNav.findIndex((link) => link.href === COLLECTIONS_HREF);
  const collectionsLabel = primaryNav[collectionsIndex].label;
  const beforeCollections = primaryNav.slice(0, collectionsIndex);
  const afterCollections = primaryNav.slice(collectionsIndex + 1);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 lg:px-8">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={150}
            height={64}
            className="h-14 w-auto lg:h-16"
          />
        </Link>

        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList>
            {beforeCollections.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link href={link.href} className="font-medium text-charcoal">
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium text-charcoal">
                {collectionsLabel}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[560px] grid-cols-2 gap-1 p-2">
                  {collectionCategories.map((category) => (
                    <li key={category.slug}>
                      <NavigationMenuLink asChild>
                        <Link href={`/collections/${category.slug}`}>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-heading text-base text-charcoal">
                              {category.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {category.description}
                            </span>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {afterCollections.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link href={link.href} className="font-medium text-charcoal">
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Lavish Haus on WhatsApp"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            className="bg-charcoal text-ivory hover:bg-warm-black rounded-none px-5"
          >
            <Link href="/quote">Request a Quote</Link>
          </Button>
        </div>

        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={mobileOpen}
          className="lg:hidden"
          onClick={() => {
            setMenuRequested(true);
            setMobileOpen(true);
          }}
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
        {menuRequested ? (
          <MobileMenu
            open={mobileOpen}
            onOpenChange={setMobileOpen}
            returnFocusTo={menuButtonRef}
          />
        ) : null}
      </div>
    </header>
  );
}
