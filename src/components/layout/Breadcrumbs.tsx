"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return <span className="text-sm text-white/70">Home</span>;
  }

  return (
    <nav className="flex items-center gap-2 text-sm">
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-white font-medium">{formatSegment(segment)}</span>
            ) : (
              <Link href={href} className="text-white/70 hover:text-white">
                {formatSegment(segment)}
              </Link>
            )}
            {!isLast ? <span className="text-white/40">/</span> : null}
          </div>
        );
      })}
    </nav>
  );
}