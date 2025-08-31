"use client"

import { RoleCard } from "./role-card"

export function RoleCardList() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 md:gap-6">
      <RoleCard
        role="student"
        title="For Students"
        description="Track applications, build resumes, practice tests, and manage your placement journey."
      />
      <RoleCard
        role="tpo"
        title="For Training & Placement Officer"
        description="Manage placement drives, enforce rules, and generate comprehensive reports."
      />
      <RoleCard
        role="company"
        title="For Companies"
        description="Post jobs, manage applications, and find the best talent efficiently."
      />
    </div>
  )
}

export default RoleCardList
