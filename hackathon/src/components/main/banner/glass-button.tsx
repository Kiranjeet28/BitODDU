import Link from "next/link"
import { cn } from "@/lib/utils"

type GlassButtonProps = {
  label: string
  href?: string
  className?: string
}

export function GlassButton({ label, href = "#", className }: GlassButtonProps) {
  const base =
    "group relative inline-flex w-full items-center justify-center rounded-2xl border border-white/35 bg-white/10 px-8 py-5 text-lg font-semibold tracking-wide text-white shadow-lg backdrop-blur-md ring-1 ring-white/10 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"

  return (
    <Link href={href} className={cn(base, className)} aria-label={label}>
      {/* glossy highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-4 h-8 w-24 rounded-full bg-white/25 blur-md"
      />
      <span className="relative">{label}</span>
    </Link>
  )
}
