"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Label } from "@/components/ui/label"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl: "/",
            })
            if (res?.error) {
                setError("Invalid email or password.")
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4" aria-describedby="form-status">
            <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>

            <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>

            {error ? (
            <p id="form-status" className="text-sm text-destructive" role="alert" aria-live="polite">
                {error}
            </p>
            ) : (
            <p id="form-status" className="sr-only" aria-live="polite">
                {/* Status messages will appear here */}
            </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center mt-2">
            <span className="text-sm">Don't have an account? </span>
            <a
                href="/register"
                className="text-primary underline hover:text-primary/80"
            >
                Register
            </a>
            </div>
        </form>
    )
}
