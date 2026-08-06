import Image from "next/image";

import { placeholderImage } from "@/lib/placeholder-image";
import { siteConfig } from "@/config/site";

const placeholderPosts = Array.from({ length: 6 }, (_, i) =>
  placeholderImage(`lh-instagram-${i}`, "Lavish Haus on Instagram", 400, 400)
);

/**
 * Static placeholder grid — replace with a live Instagram Graph API feed
 * once the Lavish Haus business account and access token are available.
 */
export function InstagramFeedPlaceholder() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {placeholderPosts.map((post, index) => (
          <a
            key={index}
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden bg-sand"
          >
            <Image
              src={post.src}
              alt={post.alt}
              fill
              sizes="(min-width: 640px) 16vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </a>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Follow{" "}
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline"
        >
          @lavishhaus
        </a>{" "}
        on Instagram
      </p>
    </div>
  );
}
