"use client"

type SectionHeaderProps = {
  title: string
  className?: string
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={["w-full text-center", className].filter(Boolean).join(" ")}>
      <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
    </div>
  )
}
