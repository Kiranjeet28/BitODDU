import ResumeForm from "@/components/student/resume-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function Page() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-balance">Student Resume Builder</h1>
                    <p className="text-sm text-muted-foreground">Create and edit your professional resume.</p>
                </div>
                <Link href="/student/resume/view">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Resume
                    </Button>
                </Link>
            </header>
            <ResumeForm/>
        </main>
    )
}