"use client"
import { JobCard, type JobCardProps } from "./job-card"

export type JobItem = JobCardProps

type JobGridProps = {
  jobs: JobItem[]
  className?: string
}

export function JobGrid({ jobs, className }: JobGridProps) {
  return (
    <div
      className={["grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", className].filter(Boolean).join(" ")}
    >
      {jobs.map((job, idx) => (
        <JobCard key={idx} {...job} />
      ))}
    </div>
  )
}
