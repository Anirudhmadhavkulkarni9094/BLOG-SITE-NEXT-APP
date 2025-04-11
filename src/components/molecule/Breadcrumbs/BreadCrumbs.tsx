"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ChevronRight } from "lucide-react";

function BreadCrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    return { href, label };
  });

  return (
    <nav className="w-full p-3 text-sm" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-gray-500">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-black transition-colors"
          >
            <span className="font-medium">Home</span>
          </Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href={crumb.href}
              className={`hover:text-black transition-colors ${
                index === crumbs.length - 1
                  ? "font-semibold text-gray-700"
                  : "text-gray-500"
              }`}
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumbs;
