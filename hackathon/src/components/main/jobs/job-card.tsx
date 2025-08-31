"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type JobCardProps = {
  company: string
  role: string
  location: string
  logoSrc?: string
  applyHref?: string
  className?: string
}

export function JobCard({
  company,
  role,
  location,
  logoSrc = "/generic-company-logo.png",
  applyHref = "#",
  className,
}: JobCardProps) {
  return (
    <div
      className={cn("rounded-[32px] bg-white p-1 ring-1 ring-slate-200 shadow-sm", className)}
      role="article"
      aria-label={`${company} – ${role}`}
    >
      <div className="rounded-[28px] bg-slate-50 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <img
            src={logoSrc || "/placeholder.svg"}
            alt={`${company} logo`}
            className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border border-slate-200 bg-white"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900">{company}</h3>
            <Link
              href={applyHref}
              className="mt-1 inline-block text-blue-700 underline underline-offset-4 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
              aria-label={`View ${role} at ${company}`}
            >
              <span className="text-lg md:text-xl font-medium">{role}</span>
            </Link>
            <p className="text-sm md:text-base text-slate-600 mt-1">{location}</p>
          </div>
        </div>

        <div className="mt-6">
          <Button asChild className="rounded-full bg-blue-700 hover:bg-blue-800 text-white px-6 md:px-8">
            <Link href={applyHref} aria-label={`Apply to ${role} at ${company}`}>
              CLICK TO APPLY
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
