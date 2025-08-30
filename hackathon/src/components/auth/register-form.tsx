"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RegisterSchema } from "@/app/api/register/schema"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

type FormValues = z.infer<typeof RegisterSchema>

export function RegisterForm() {
    const [role, setRole] = React.useState<FormValues["role"]>("STUDENT")

    const form = useForm<any>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            role: "STUDENT",
            // student defaults
            rollNo: "",
            branch: "",
            graduationYear: new Date().getFullYear(),
            // company defaults
            hrName: "",
            hrContact: "",
            hrLinkedIn: "",
            // tpo defaults
            institutionName: "",
            contactNo: "",
        },
        mode: "onBlur",
    })
    React.useEffect(() => {
        form.setValue("role", role)
    }, [role, form])
const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/"); // or your home page
        }
    }, [status, router]);
    async function onSubmit(values: FormValues) {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
            const data = await res.json()
            if (!res.ok) {
                const msg =
                    data?.error ||
                    "Registration failed. Please check your details and try again."
                toast.error(msg)
                return
            }
            toast.success("Registered successfully. You can now sign in.")
            router.push('/login')
            form.reset()
            setRole("STUDENT")
        } catch (err: any) {
            toast.error("Something went wrong. Please try again.")
        }
    }

    const renderRoleFields = () => {
        const errors = form.formState.errors as any
        switch (role) {
            case "STUDENT":
                return (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="rollNo">Roll Number</Label>
                            <Input id="rollNo" {...form.register("rollNo")} />
                            {errors.rollNo && (
                                <p className="text-sm text-destructive">
                                    {errors.rollNo.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Input id="branch" {...form.register("branch")} />
                            {errors.branch && (
                                <p className="text-sm text-destructive">
                                    {errors.branch.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="graduationYear">Graduation Year</Label>
                            <Input
                                id="graduationYear"
                                type="number"
                                {...form.register("graduationYear", { valueAsNumber: true })}
                            />
                            {errors.graduationYear && (
                                <p className="text-sm text-destructive">
                                    {errors.graduationYear.message}
                                </p>
                            )}
                        </div>
                    </>
                )
            case "COMPANY":
                return (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="hrName">HR Name</Label>
                            <Input id="hrName" {...form.register("hrName")} />
                            {errors.hrName && (
                                <p className="text-sm text-destructive">
                                    {errors.hrName.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="hrContact">HR Contact</Label>
                            <Input id="hrContact" {...form.register("hrContact")} />
                            {errors.hrContact && (
                                <p className="text-sm text-destructive">
                                    {errors.hrContact.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="hrLinkedIn">HR LinkedIn (optional)</Label>
                            <Input
                                id="hrLinkedIn"
                                placeholder="https://linkedin.com/in/..."
                                {...form.register("hrLinkedIn")}
                            />
                            {errors.hrLinkedIn && (
                                <p className="text-sm text-destructive">
                                    {errors.hrLinkedIn.message}
                                </p>
                            )}
                        </div>
                    </>
                )
            case "TPO":
                return (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="institutionName">Institution Name</Label>
                            <Input
                                id="institutionName"
                                {...form.register("institutionName")}
                            />
                            {errors.institutionName && (
                                <p className="text-sm text-destructive">
                                    {errors.institutionName.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="contactNo">Contact Number</Label>
                            <Input id="contactNo" {...form.register("contactNo")} />
                            {errors.contactNo && (
                                <p className="text-sm text-destructive">
                                    {errors.contactNo.message}
                                </p>
                            )}
                        </div>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="grid gap-4 mb-4">
                <Label htmlFor="role">Select Role</Label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as FormValues["role"])}
                    className="border rounded px-3 py-2"
                >
                    <option value="STUDENT">Student</option>
                    <option value="COMPANY">Company</option>
                    <option value="TPO">TPO</option>
                </select>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" noValidate>
                {/* Common fields */}
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...form.register("email")}
                        aria-invalid={!!form.formState.errors.email}
                    />
                    {form.formState.errors.email && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.email.message as string}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...form.register("password")}
                        aria-invalid={!!form.formState.errors.password}
                    />
                    {form.formState.errors.password && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.password.message as string}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        {...form.register("confirmPassword")}
                        aria-invalid={!!form.formState.errors.confirmPassword}
                    />
                    {form.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.confirmPassword.message as string}
                        </p>
                    )}
                </div>

                {/* Role-specific fields */}
                {renderRoleFields()}

                <Button type="submit" className="mt-2">
                    Create account
                </Button>
            </form>
            <p className="mt-4 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-pretty underline">
                    Log in
                </Link>
            </p>
        </div>
    )
}
