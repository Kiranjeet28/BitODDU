"use client"

import * as React from "react"
import useSWR from "swr"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resumeSchema, type ResumeInput } from "@/app/api/student/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Props = {
    initialStudentId?: string
}

export default function ResumeForm({ initialStudentId = "" }: Props) {
    const [rollNo, setRollNo] = React.useState(initialStudentId)

    const form = useForm<ResumeInput>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            action: "resume",
            name: "",
            address: "",
            linkedin: "",
            phoneNo: "",
            course: "",
            branch: "",
            graduationYear: new Date().getFullYear(),
            cgpa: undefined,
            education: [],
            experience: [],
            projects: [],
            skills: [],
            languages: [],
        },
        mode: "onBlur",
    })

    const { reset, handleSubmit, register, control, formState } = form
    const { errors, isSubmitting } = formState

    // Arrays
    const educationFA = useFieldArray({ control, name: "education" })
    const experienceFA = useFieldArray({ control, name: "experience" })
    const projectsFA = useFieldArray({ control, name: "projects" })
    const skillsFA = useFieldArray({ control, name: "skills" })
    const languagesFA = useFieldArray({ control, name: "languages" })

    // Load data when rollNo is set
    const { data, isValidating } = useSWR(
        rollNo ? `/api/student` : null,
        fetcher,
    )

    React.useEffect(() => {
        if (data?.success && data?.student) {
            const { student, ..._rest } = data
            // Normalize empty strings for optional URL/number fields
            reset({
                action : "resume",
                name: student.name || "",
                address: student.address || "",
                linkedin: student.linkedin || "",
                phoneNo: student.phoneNo || "",
                course: student.course || "",
                branch: student.branch || "",
                graduationYear: student.graduationYear || new Date().getFullYear(),
                cgpa: typeof student.cgpa === "number" ? student.cgpa : undefined,
                education: student.education || [],
                experience: student.experience || [],
                projects: student.projects || [],
                skills: student.skills || [],
                languages: student.languages || [],
            })
        }
    }, [data, reset])

    async function onSubmit(values: ResumeInput) {
        if (!rollNo) {
            // @ts-expect-error sonnar
            sonnar.error("Student ID required", "Enter a student ID to save the resume.")
            return
        }
        try {
            const res = await fetch(`/api/student`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rollNo, ...values }),
            })
            const json = await res.json()
            if (!res.ok || !json.success) {
                const details = json?.details?.fieldErrors
                    ? Object.entries(json.details.fieldErrors)
                        .map(([k, v]) => `${k}: ${(v as string[]).join(", ")}`)
                        .join("; ")
                    : json.error || "Unknown error"
                throw new Error(details)
            }
            // @ts-expect-error sonnar
            sonnar.success("Saved", "Resume has been updated.")
        } catch (e: any) {
            // @ts-expect-error sonnar
            sonnar.error("Failed to save", e?.message || "Unexpected error occurred")
        }
    }

    return (
        <div className="space-y-6">
            {/* Student ID */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-balance">Student Identifier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
                        <div>
                            <Label htmlFor="rollNo">Student ID</Label>
                            <Input
                                id="rollNo"
                                placeholder="e.g., 223"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                aria-describedby="studentIdHelp"
                            />
                            <p id="studentIdHelp" className="mt-1 text-xs text-muted-foreground">
                                Used to load and save the resume.
                            </p>
                        </div>
                        <div className="flex items-end">
                            <Button
                                type="button"
                                onClick={() => {
                                    // trigger SWR reload by changing key (rollNo state already bound)
                                }}
                                disabled={!rollNo || isValidating}
                            >
                                {isValidating ? "Loading..." : "Load"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-balance">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Full Name" error={errors.name?.message}>
                            <Input placeholder="John Doe" {...register("name")} />
                        </Field>
                        <Field label="Phone Number" error={errors.phoneNo?.message}>
                            <Input placeholder="+1 555 0100" {...register("phoneNo")} />
                        </Field>
                        <Field label="LinkedIn URL" error={errors.linkedin?.message}>
                            <Input placeholder="https://linkedin.com/in/username" {...register("linkedin")} />
                        </Field>
                        <Field label="Address" error={errors.address?.message}>
                            <Input placeholder="City, Country" {...register("address")} />
                        </Field>
                        <Field label="Course" error={errors.course?.message}>
                            <Input placeholder="B.Tech" {...register("course")} />
                        </Field>
                        <Field label="Branch" error={errors.branch?.message}>
                            <Input placeholder="Computer Science" {...register("branch")} />
                        </Field>
                        <Field label="Graduation Year" error={errors.graduationYear?.message}>
                            <Input type="number" placeholder="2026" {...register("graduationYear")} />
                        </Field>
                        <Field label="CGPA" error={errors.cgpa?.message}>
                            <Input type="number" step="0.01" placeholder="8.5" {...register("cgpa")} />
                        </Field>
                    </div>
                </CardContent>
            </Card>

            {/* Education */}
            <ArrayCard
                title="Education"
                emptyCta="Add education"
                onAdd={() => educationFA.append({ course: "", collegeName: "", startYear: new Date().getFullYear(), duration: 4, cgpa: undefined })}
            >
                {educationFA.fields.map((f, idx) => (
                    <div key={f.id} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Course" error={errors.education?.[idx]?.course?.message}>
                            <Input {...register(`education.${idx}.course` as const)} placeholder="B.Tech" />
                        </Field>
                        <Field label="College" error={errors.education?.[idx]?.collegeName?.message}>
                            <Input {...register(`education.${idx}.collegeName` as const)} placeholder="ABC Institute" />
                        </Field>
                        <Field label="Start Year" error={errors.education?.[idx]?.startYear?.message}>
                            <Input {...register(`education.${idx}.startYear` as const)} placeholder="2022" />
                        </Field>
                        <Field label="Duration" error={errors.education?.[idx]?.duration?.message}>
                            <Input {...register(`education.${idx}.duration` as const)} placeholder="4 years" />
                        </Field>
                        <Field label="CGPA" error={errors.education?.[idx]?.cgpa?.message}>
                            <Input type="number" step="0.01" {...register(`education.${idx}.cgpa` as const)} placeholder="8.2" />
                        </Field>
                        <div className="flex items-end">
                            <Button variant="secondary" type="button" onClick={() => educationFA.remove(idx)}>
                                Remove
                            </Button>
                        </div>
                        <Separator className="md:col-span-2" />
                    </div>
                ))}
            </ArrayCard>

            {/* Experience */}
            <ArrayCard
                title="Experience"
                emptyCta="Add experience"
                onAdd={() =>
                    experienceFA.append({
                        companyName: "",
                        position: "",
                        startYear: new Date().getFullYear(),
                        endYear: new Date().getFullYear(),
                        achievement: ""
                    })
                }
            >
                {experienceFA.fields.map((f, idx) => (
                    <div key={f.id} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Company" error={errors.experience?.[idx]?.companyName?.message}>
                            <Input {...register(`experience.${idx}.companyName` as const)} placeholder="Acme Corp" />
                        </Field>
                        <Field label="Position" error={errors.experience?.[idx]?.position?.message}>
                            <Input {...register(`experience.${idx}.position` as const)} placeholder="Intern" />
                        </Field>
                        <Field label="Start Year" error={errors.experience?.[idx]?.startYear?.message}>
                            <Input {...register(`experience.${idx}.startYear` as const)} placeholder="2024" />
                        </Field>
                        <Field label="End Year" error={errors.experience?.[idx]?.endYear?.message}>
                            <Input {...register(`experience.${idx}.endYear` as const)} placeholder="2024" />
                        </Field>
                        <Field label="Achievement" error={errors.experience?.[idx]?.achievement?.message} className="md:col-span-2">
                            <Textarea {...register(`experience.${idx}.achievement` as const)} placeholder="What did you achieve?" />
                        </Field>
                        <div className="flex items-end">
                            <Button variant="secondary" type="button" onClick={() => experienceFA.remove(idx)}>
                                Remove
                            </Button>
                        </div>
                        <Separator className="md:col-span-2" />
                    </div>
                ))}
            </ArrayCard>

            {/* Projects */}
            <ArrayCard
                title="Projects"
                emptyCta="Add project"
                onAdd={() => projectsFA.append({ title: "", description: "", link: "" })}
            >
                {projectsFA.fields.map((f, idx) => (
                    <div key={f.id} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Title" error={errors.projects?.[idx]?.title?.message}>
                            <Input {...register(`projects.${idx}.title` as const)} placeholder="Portfolio Website" />
                        </Field>
                        <Field label="Description" error={errors.projects?.[idx]?.description?.message} className="md:col-span-2">
                            <Textarea
                                {...register(`projects.${idx}.description` as const)}
                                placeholder="Short overview of the project"
                            />
                        </Field>
                        <Field label="Link" error={errors.projects?.[idx]?.link?.message}>
                            <Input {...register(`projects.${idx}.link` as const)} placeholder="https://example.com" />
                        </Field>
                        <div className="flex items-end">
                            <Button variant="secondary" type="button" onClick={() => projectsFA.remove(idx)}>
                                Remove
                            </Button>
                        </div>
                        <Separator className="md:col-span-2" />
                    </div>
                ))}
            </ArrayCard>

            {/* Skills */}
            <ArrayCard title="Skills" emptyCta="Add skill" onAdd={() => skillsFA.append({ name: "", level: "Intermediate" })}>
                {skillsFA.fields.map((f, idx) => (
                    <div key={f.id} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Skill" error={errors.skills?.[idx]?.name?.message}>
                            <Input {...register(`skills.${idx}.name` as const)} placeholder="JavaScript" />
                        </Field>
                        <Field label="Level" error={errors.skills?.[idx]?.level?.message}>
                            <Input {...register(`skills.${idx}.level` as const)} placeholder="Beginner | Intermediate | Advanced" />
                        </Field>
                        <div className="flex items-end">
                            <Button variant="secondary" type="button" onClick={() => skillsFA.remove(idx)}>
                                Remove
                            </Button>
                        </div>
                        <Separator className="md:col-span-2" />
                    </div>
                ))}
            </ArrayCard>

            {/* Languages */}
            <ArrayCard
                title="Languages"
                emptyCta="Add language"
                onAdd={() => languagesFA.append({ name: "", fluency: "Native" })}
            >
                {languagesFA.fields.map((f, idx) => (
                    <div key={f.id} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Language" error={errors.languages?.[idx]?.name?.message}>
                            <Input {...register(`languages.${idx}.name` as const)} placeholder="English" />
                        </Field>
                        <Field label="Fluency" error={errors.languages?.[idx]?.fluency?.message}>
                            <Input
                                {...register(`languages.${idx}.fluency` as const)}
                                placeholder="Basic | Conversational | Fluent | Native"
                            />
                        </Field>
                        <div className="flex items-end">
                            <Button variant="secondary" type="button" onClick={() => languagesFA.remove(idx)}>
                                Remove
                            </Button>
                        </div>
                        <Separator className="md:col-span-2" />
                    </div>
                ))}
            </ArrayCard>

            {/* Submit */}
            <div className="flex justify-end">
                <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Resume"}
                </Button>
            </div>
        </div>
    )
}

function Field({
    label,
    error,
    className,
    children,
}: {
    label: string
    error?: string
    className?: string
    children: React.ReactNode
}) {
    const id = React.useId()
    return (
        <div className={cn("space-y-1", className)}>
            <Label htmlFor={id}>{label}</Label>
            <div id={id} className="space-y-1">
                {children}
            </div>
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>
    )
}

function ArrayCard({
    title,
    emptyCta,
    onAdd,
    children,
}: {
    title: string
    emptyCta: string
    onAdd: () => void
    children: React.ReactNode
}) {
    const hasItems = React.Children.count(children) > 0
    return (
        <Card>
            <CardHeader className="flex items-center justify-between space-y-0">
                <CardTitle className="text-balance">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {hasItems ? children : <p className="text-sm text-muted-foreground">No items added yet.</p>}
                <Button type="button" variant="outline" onClick={onAdd}>
                    {emptyCta}
                </Button>
            </CardContent>
        </Card>
    )
}
