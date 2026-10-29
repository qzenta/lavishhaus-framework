"use client";

import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";

import { COLLECTIONS_HREF, collectionCategories, primaryNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export function MobileMenu({
  open,
  onOpenChange,
  returnFocusTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
}) {
  const collectionsIndex = primaryNav.findIndex((link) => link.href === COLLECTIONS_HREF);
  const collectionsLabel = primaryNav[collectionsIndex].label;
  const beforeCollections = primaryNav.slice(0, collectionsIndex);
  const afterCollections = primaryNav.slice(collectionsIndex + 1);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-sm bg-ivory"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusTo.current?.focus();
        }}
      >
        <SheetHeader>
          <SheetTitle>
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={104}
              height={44}
              className="h-11 w-auto"
            />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {beforeCollections.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-2 py-2 font-medium text-charcoal hover:bg-sand"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
          <p className="mt-2 mb-1 text-xs tracking-wide text-muted-foreground uppercase">
            {collectionsLabel}
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
          {afterCollections.map((link) => (
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
  );
}
