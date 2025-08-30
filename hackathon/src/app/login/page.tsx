import Image from "next/image"
import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/signIn"

export const metadata: Metadata = {
    title: "Login",
    description: "Sign in to your account",
}

export default function LoginPage() {
    return (
        <main className="min-h-screen grid md:grid-cols-2">
            {/* Left: Image (hidden on small screens) */}
            <section className="relative hidden md:block">
                <Image
                    src="/1.jpeg"
                    alt="Decorative office background"
                    fill
                    priority
                    className="object-cover"
                />
                <span className="sr-only">Decorative background image</span>
            </section>

            {/* Right: Form */}
            <section className="flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <header className="mb-6">
                        <h1 className="text-2xl font-semibold text-pretty">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">Sign in to continue</p>
                    </header>
                    <LoginForm />
                </div>
            </section>
        </main>
    )
}
