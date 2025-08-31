import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  href: string
  label: string
  icon: ReactNode
  className?: string
}

export function SocialLink({ href, label, icon, className }: Props) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full",
        "bg-sky-600 text-white shadow-sm ring-1 ring-white/40",
        "transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500",
        className,
      )}
    >
      <span aria-hidden="true" className="flex items-center justify-center">
        {icon}
      </span>
    </Link>
  )
}
