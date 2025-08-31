"use client"

import Link from "next/link"

export type FeatureItem = {
  label: string
  href?: string
}

export function FeaturePill({ label, href = "#" }: FeatureItem) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group inline-flex items-center gap-2 rounded-xl md:rounded-full bg-blue-700 px-4 md:px-5 py-3 text-white shadow-md ring-1 ring-white/20 hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
    >
      <span className="uppercase tracking-wide text-sm md:text-base">{label}</span>
    </Link>
  )
}
