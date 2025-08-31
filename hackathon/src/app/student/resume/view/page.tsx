import ResumeViewer from "@/components/student/viewResume"

export default function ResumeViewPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-4 py-8">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Preview</h1>
                    <p className="text-gray-600">View and export your professional resume</p>
                </header>
                <ResumeViewer />
            </div>
        </main>
    )
}