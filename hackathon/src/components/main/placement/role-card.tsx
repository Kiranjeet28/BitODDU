"use client"

import { GraduationCap, ClipboardList, BriefcaseBusiness } from "lucide-react"

type Role = "student" | "tpo" | "company"

export interface RoleCardProps {
  role: Role
  title: string
  description: string
  href?: string
}

/**
 * RoleCard
 * - Left blue hexagon badge with an icon
 * - White card with a beveled/arrowed right edge (clip-path)
 * - Matches the provided reference while remaining responsive and accessible
 */
export function RoleCard({ role, title, description }: RoleCardProps) {
  const Icon = role === "student" ? GraduationCap : role === "tpo" ? ClipboardList : BriefcaseBusiness

  return (
    <div
      className="relative isolate w-full max-w-3xl rounded-xl bg-white shadow-sm ring-1 ring-gray-200"
      style={{
        // Arrow/bevel on the right edge
        clipPath: "polygon(0 0, calc(100% - 2rem) 0, 100% 50%, calc(100% - 2rem) 100%, 0 100%, 0 0)",
      }}
    >
      <div className="flex items-center gap-4 p-4 md:p-5">
        {/* Blue hexagon icon badge */}
        <div
          className="shrink-0 text-white"
          aria-hidden="true"
          style={{
            width: 56,
            height: 56,
            backgroundColor: "rgb(29 78 216)", // tailwind blue-700
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        {/* Text block */}
        <div className="flex-1">
          <h3 className="font-sans text-base md:text-lg font-semibold text-slate-800">{title}</h3>
          <p className="mt-1 text-sm md:text-base text-slate-600 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Subtle bevel highlight on the arrow end for depth */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden md:block"
        aria-hidden="true"
        style={{
          width: "2rem",
          background: "linear-gradient(90deg, rgba(226,232,240,0.6), rgba(226,232,240,0.15))",
          clipPath: "polygon(0 0, 100% 50%, 0 100%)",
        }}
      />
    </div>
  )
}

export default RoleCard
