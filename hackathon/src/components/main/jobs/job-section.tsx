"use client"
import { SectionHeader } from "./section-header"
import { JobGrid, type JobItem } from "./job-grid"

type JobsSectionProps = {
  title?: string
  jobs: JobItem[]
  className?: string
}

export function JobsSection({ title = "APPLY TO LATEST JOBS", jobs, className }: JobsSectionProps) {
  return (
    <section className={["w-full py-10 md:py-14 bg-slate-50", className].filter(Boolean).join(" ")}>
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader title={title} />
        <JobGrid jobs={jobs} className="mt-8 md:mt-10" />
      </div>
    </section>
  )
}
