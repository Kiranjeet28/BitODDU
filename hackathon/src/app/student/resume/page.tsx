import ResumeForm from "@/components/student/resume-form"

export default function Page() {
  
    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <header className="mb-8">
                <h1 className="text-2xl font-semibold text-balance">Student Resume</h1>
                <p className="text-sm text-muted-foreground">Light theme resume editor with backend integration.</p>
            </header>
            <ResumeForm/>
        </main>
    )
}
