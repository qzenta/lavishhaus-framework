"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, MessageCircle } from "lucide-react";

import { collectionCategories, primaryNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            width={864}
            height={368}
            className="h-14 w-auto lg:h-16"
            priority
          />
        </Link>

        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium text-charcoal">
                Shop by Room
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
            {primaryNav
              .filter((link) => link.label !== "Shop by Room")
              .map((link) => (
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

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm bg-ivory">
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.name}
                  width={864}
                  height={368}
                  className="h-11 w-auto"
                />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              <p className="mt-2 mb-1 text-xs tracking-wide text-muted-foreground uppercase">
                Shop by Room
              </p>
              {collectionCategories.map((category) => (
                <SheetClose asChild key={category.slug}>
                  <Link
                    href={`/collections/${category.slug}`}
                    className="rounded-md px-2 py-2 text-charcoal hover:bg-sand"
                  >
                    {category.label}
                  </Link>
                </SheetClose>
              ))}
              <div className="my-3 h-px bg-border" />
              {primaryNav
                .filter((link) => link.label !== "Shop by Room")
                .map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-2 py-2 font-medium text-charcoal hover:bg-sand"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              <div className="my-3 h-px bg-border" />
              <SheetClose asChild>
                <Button
                  asChild
                  className="bg-charcoal text-ivory hover:bg-warm-black rounded-none"
                >
                  <Link href="/quote">Request a Quote</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
