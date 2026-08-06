import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="font-heading text-6xl text-gold">404</span>
      <h1 className="mt-4 font-heading text-3xl text-charcoal">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button asChild className="mt-8 rounded-none bg-charcoal py-6 text-ivory hover:bg-warm-black">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
