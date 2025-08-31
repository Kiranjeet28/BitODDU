"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

export default function ResumePage() {
    return (
        <Suspense fallback={
            <main className="mx-auto max-w-4xl px-4 py-10">
                <div className="text-center">
                    <p className="text-lg">Loading...</p>
                </div>
            </main>
        }>
            <ResumePageContent />
        </Suspense>
    )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import Link from "next/link"

interface StudentData {
    id: string
    rollNo: string
    name?: string
    branch?: string
    graduationYear: number
    linkedin?: string
    phoneNo?: string
    course?: string
    cgpa?: number
    address?: string
    education: Array<{
        course: string
        collegeName: string
        startYear: number
        duration: number
        cgpa?: number
    }>
    experience: Array<{
        companyName: string
        position: string
        startYear: number
        endYear?: number
        achievement?: string
    }>
    projects: Array<{
        title: string
        description?: string
        link?: string
    }>
    skills: Array<{
        name: string
        level?: string
    }>
    languages: Array<{
        name: string
        fluency?: string
    }>
}

interface ExportSections {
    basicInfo: boolean
    education: boolean
    experience: boolean
    projects: boolean
    skills: boolean
    languages: boolean
}

function ResumePageContent() {
    const searchParams = useSearchParams()
    const rollNoParam = searchParams.get('rollNo')

    const [rollNo, setRollNo] = useState(rollNoParam || '')
    const [studentData, setStudentData] = useState<StudentData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
    const [exportSections, setExportSections] = useState<ExportSections>({
        basicInfo: true,
        education: true,
        experience: true,
        projects: true,
        skills: true,
        languages: true
    })

    const fetchStudentData = async (rollNumber: string) => {
        if (!rollNumber.trim()) {
            toast.error("Please enter a roll number")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/student?rollNo=${encodeURIComponent(rollNumber)}`)
            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to fetch student data')
            }

            setStudentData(data.student)
        } catch (err: any) {
            setError(err.message)
            toast.error("Failed to load resume", err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (rollNoParam) {
            fetchStudentData(rollNoParam)
        }
    }, [rollNoParam])

    const handleSearch = () => {
        fetchStudentData(rollNo)
    }

    const handleExportSectionChange = (section: keyof ExportSections, checked: boolean) => {
        setExportSections(prev => ({
            ...prev,
            [section]: checked
        }))
    }

    const generatePDF = () => {
        // Create a new window with the selected sections
        const printWindow = window.open('', '_blank')
        if (!printWindow || !studentData) return

        // Generate HTML content based on selected sections
        let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Resume - ${studentData.name || studentData.rollNo}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #333;
                        padding-bottom: 15px;
                    }
                    .section {
                        margin-bottom: 25px;
                        page-break-inside: avoid;
                    }
                    .section-title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #2563eb;
                        border-bottom: 1px solid #e5e7eb;
                        padding-bottom: 5px;
                        margin-bottom: 15px;
                    }
                    .grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-bottom: 15px;
                    }
                    .grid-item {
                        margin-bottom: 8px;
                    }
                    .separator {
                        border-top: 1px solid #e5e7eb;
                        margin: 15px 0;
                    }
                    .skills-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 10px;
                    }
                    .link {
                        color: #2563eb;
                        text-decoration: none;
                    }
                    .link:hover {
                        text-decoration: underline;
                    }
                    @media print {
                        body {
                            margin: 0;
                            padding: 15px;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${studentData.name || 'Student Resume'}</h1>
                    <p>Roll Number: ${studentData.rollNo}</p>
                </div>
        `

        // Basic Information
        if (exportSections.basicInfo) {
            htmlContent += `
                <div class="section">
                    <div class="section-title">Basic Information</div>
                    <div class="grid">
                        <div class="grid-item"><strong>Name:</strong> ${studentData.name || 'Not provided'}</div>
                        <div class="grid-item"><strong>Roll Number:</strong> ${studentData.rollNo}</div>
                        <div class="grid-item"><strong>Course:</strong> ${studentData.course || 'Not provided'}</div>
                        <div class="grid-item"><strong>Branch:</strong> ${studentData.branch || 'Not provided'}</div>
                        <div class="grid-item"><strong>Graduation Year:</strong> ${studentData.graduationYear}</div>
                        <div class="grid-item"><strong>CGPA:</strong> ${studentData.cgpa || 'Not provided'}</div>
                        <div class="grid-item"><strong>Phone:</strong> ${studentData.phoneNo || 'Not provided'}</div>
                        <div class="grid-item"><strong>LinkedIn:</strong> ${studentData.linkedin ? `<a href="${studentData.linkedin}" class="link">View Profile</a>` : 'Not provided'}</div>
                        ${studentData.address ? `<div class="grid-item" style="grid-column: 1 / -1;"><strong>Address:</strong> ${studentData.address}</div>` : ''}
                    </div>
                </div>
            `
        }

        // Education
        if (exportSections.education && studentData.education && studentData.education.length > 0) {
            htmlContent += `
                <div class="section">
                    <div class="section-title">Education</div>
                    ${studentData.education.map((edu, index) => `
                        <div>
                            <div class="grid">
                                <div class="grid-item"><strong>Course:</strong> ${edu.course}</div>
                                <div class="grid-item"><strong>College:</strong> ${edu.collegeName}</div>
                                <div class="grid-item"><strong>Start Year:</strong> ${edu.startYear}</div>
                                <div class="grid-item"><strong>Duration:</strong> ${edu.duration} years</div>
                                ${edu.cgpa ? `<div class="grid-item"><strong>CGPA:</strong> ${edu.cgpa}</div>` : ''}
                            </div>
                            ${index < studentData.education.length - 1 ? '<div class="separator"></div>' : ''}
                        </div>
                    `).join('')}
                </div>
            `
        }

        // Experience
        if (exportSections.experience && studentData.experience && studentData.experience.length > 0) {
            htmlContent += `
                <div class="section">
                    <div class="section-title">Experience</div>
                    ${studentData.experience.map((exp, index) => `
                        <div>
                            <div class="grid">
                                <div class="grid-item"><strong>Company:</strong> ${exp.companyName}</div>
                                <div class="grid-item"><strong>Position:</strong> ${exp.position}</div>
                                <div class="grid-item"><strong>Start Year:</strong> ${exp.startYear}</div>
                                ${exp.endYear ? `<div class="grid-item"><strong>End Year:</strong> ${exp.endYear}</div>` : ''}
                            </div>
                            ${exp.achievement ? `<div class="grid-item"><strong>Achievement:</strong> ${exp.achievement}</div>` : ''}
                            ${index < studentData.experience.length - 1 ? '<div class="separator"></div>' : ''}
                        </div>
                    `).join('')}
                </div>
            `
        }

        // Projects
        if (exportSections.projects && studentData.projects && studentData.projects.length > 0) {
            htmlContent += `
                <div class="section">
                    <div class="section-title">Projects</div>
                    ${studentData.projects.map((project, index) => `
                        <div>
                            <div class="grid-item">
                                <strong>Title:</strong> ${project.title}
                                ${project.link ? `<a href="${project.link}" class="link">View Project</a>` : ''}
                            </div>
                            ${project.description ? `<div class="grid-item"><strong>Description:</strong> ${project.description}</div>` : ''}
                            ${index < studentData.projects.length - 1 ? '<div class="separator"></div>' : ''}
                        </div>
                    `).join('')}
                </div>
            `
        }

        // Skills
        if (exportSections.skills && studentData.skills && studentData.skills.length > 0) {
            htmlContent += `
                <div class="section">
                    <div class="section-title">Skills</div>
                    <div class="skills-grid">
                        ${studentData.skills.map(skill => `
                            <div class="grid-item">
                                ${skill.name}
                                ${skill.level ? `<span style="color: #666;"> (${skill.level})</span>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `
        }

        // Languages
        if (exportSections.languages && studentData.languages && studentData.languages.length > 0) {
            htmlContent += `
                <div class="section">
                    <div class="section-title">Languages</div>
                    <div class="grid">
                        ${studentData.languages.map(language => `
                            <div class="grid-item">
                                ${language.name}
                                ${language.fluency ? `<span style="color: #666;"> (${language.fluency})</span>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `
        }

        htmlContent += `
            </body>
            </html>
        `

        printWindow.document.write(htmlContent)
        printWindow.document.close()

        // Wait for content to load then trigger print
        setTimeout(() => {
            printWindow.print()
            printWindow.close()
        }, 500)

        setIsExportDialogOpen(false)
        toast.success("PDF generation initiated")
    }

    const selectAllSections = () => {
        setExportSections({
            basicInfo: true,
            education: true,
            experience: true,
            projects: true,
            skills: true,
            languages: true
        })
    }

    const deselectAllSections = () => {
        setExportSections({
            basicInfo: false,
            education: false,
            experience: false,
            projects: false,
            skills: false,
            languages: false
        })
    }

    if (loading) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-10">
                <div className="text-center">
                    <p className="text-lg">Loading resume...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-center mb-2">Student Resume</h1>
                <p className="text-center text-muted-foreground">View student resume details</p>
            </header>

            {/* Search Section */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <Label htmlFor="rollNo">Student Roll Number</Label>
                            <Input
                                id="rollNo"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                placeholder="Enter roll number (e.g., 223)"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <Button onClick={handleSearch} disabled={loading}>
                            {loading ? "Searching..." : "Load Resume"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {error && (
                <Card className="mb-6 border-destructive">
                    <CardContent className="pt-6">
                        <p className="text-destructive">{error}</p>
                    </CardContent>
                </Card>
            )}

            {studentData && (
                <div className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <strong>Name:</strong> {studentData.name || 'Not provided'}
                                </div>
                                <div>
                                    <strong>Roll Number:</strong> {studentData.rollNo}
                                </div>
                                <div>
                                    <strong>Course:</strong> {studentData.course || 'Not provided'}
                                </div>
                                <div>
                                    <strong>Branch:</strong> {studentData.branch || 'Not provided'}
                                </div>
                                <div>
                                    <strong>Graduation Year:</strong> {studentData.graduationYear}
                                </div>
                                <div>
                                    <strong>CGPA:</strong> {studentData.cgpa || 'Not provided'}
                                </div>
                                <div>
                                    <strong>Phone:</strong> {studentData.phoneNo || 'Not provided'}
                                </div>
                                <div>
                                    <strong>LinkedIn:</strong>
                                    {studentData.linkedin ? (
                                        <a href={studentData.linkedin} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                                            View Profile
                                        </a>
                                    ) : (
                                        ' Not provided'
                                    )}
                                </div>
                                {studentData.address && (
                                    <div className="md:col-span-2">
                                        <strong>Address:</strong> {studentData.address}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Education */}
                    {studentData.education && studentData.education.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Education</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {studentData.education.map((edu, index) => (
                                        <div key={index}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <div><strong>Course:</strong> {edu.course}</div>
                                                <div><strong>College:</strong> {edu.collegeName}</div>
                                                <div><strong>Start Year:</strong> {edu.startYear}</div>
                                                <div><strong>Duration:</strong> {edu.duration} years</div>
                                                {edu.cgpa && <div><strong>CGPA:</strong> {edu.cgpa}</div>}
                                            </div>
                                            {index < studentData.education.length - 1 && <Separator className="mt-4" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Experience */}
                    {studentData.experience && studentData.experience.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Experience</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {studentData.experience.map((exp, index) => (
                                        <div key={index}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <div><strong>Company:</strong> {exp.companyName}</div>
                                                <div><strong>Position:</strong> {exp.position}</div>
                                                <div><strong>Start Year:</strong> {exp.startYear}</div>
                                                {exp.endYear && <div><strong>End Year:</strong> {exp.endYear}</div>}
                                            </div>
                                            {exp.achievement && (
                                                <div className="mt-2">
                                                    <strong>Achievement:</strong> {exp.achievement}
                                                </div>
                                            )}
                                            {index < studentData.experience.length - 1 && <Separator className="mt-4" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Projects */}
                    {studentData.projects && studentData.projects.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Projects</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {studentData.projects.map((project, index) => (
                                        <div key={index}>
                                            <div>
                                                <strong>Title:</strong> {project.title}
                                                {project.link && (
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                                                        View Project
                                                    </a>
                                                )}
                                            </div>
                                            {project.description && (
                                                <div className="mt-1">
                                                    <strong>Description:</strong> {project.description}
                                                </div>
                                            )}
                                            {index < studentData.projects.length - 1 && <Separator className="mt-4" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Skills */}
                    {studentData.skills && studentData.skills.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {studentData.skills.map((skill, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{skill.name}</span>
                                            {skill.level && <span className="text-muted-foreground">({skill.level})</span>}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Languages */}
                    {studentData.languages && studentData.languages.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Languages</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {studentData.languages.map((language, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{language.name}</span>
                                            {language.fluency && <span className="text-muted-foreground">({language.fluency})</span>}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                        <Button asChild>
                            <Link href={`/student/resume?rollNo=${studentData.rollNo}`}>
                                Edit Resume
                            </Link>
                        </Button>

                        <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Export PDF
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Select Sections to Export</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={selectAllSections}>
                                            Select All
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={deselectAllSections}>
                                            Deselect All
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="basicInfo"
                                                checked={exportSections.basicInfo}
                                                onCheckedChange={(checked) => handleExportSectionChange('basicInfo', !!checked)}
                                            />
                                            <Label htmlFor="basicInfo">Basic Information</Label>
                                        </div>

                                        {studentData.education && studentData.education.length > 0 && (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="education"
                                                    checked={exportSections.education}
                                                    onCheckedChange={(checked) => handleExportSectionChange('education', !!checked)}
                                                />
                                                <Label htmlFor="education">Education</Label>
                                            </div>
                                        )}

                                        {studentData.experience && studentData.experience.length > 0 && (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="experience"
                                                    checked={exportSections.experience}
                                                    onCheckedChange={(checked) => handleExportSectionChange('experience', !!checked)}
                                                />
                                                <Label htmlFor="experience">Experience</Label>
                                            </div>
                                        )}

                                        {studentData.projects && studentData.projects.length > 0 && (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="projects"
                                                    checked={exportSections.projects}
                                                    onCheckedChange={(checked) => handleExportSectionChange('projects', !!checked)}
                                                />
                                                <Label htmlFor="projects">Projects</Label>
                                            </div>
                                        )}

                                        {studentData.skills && studentData.skills.length > 0 && (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="skills"
                                                    checked={exportSections.skills}
                                                    onCheckedChange={(checked) => handleExportSectionChange('skills', !!checked)}
                                                />
                                                <Label htmlFor="skills">Skills</Label>
                                            </div>
                                        )}

                                        {studentData.languages && studentData.languages.length > 0 && (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="languages"
                                                    checked={exportSections.languages}
                                                    onCheckedChange={(checked) => handleExportSectionChange('languages', !!checked)}
                                                />
                                                <Label htmlFor="languages">Languages</Label>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 justify-end pt-4">
                                        <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={generatePDF}>
                                            Generate PDF
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        
                    </div>
                </div>
            )}

            {!loading && !studentData && !error && (
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground">Enter a roll number above to load a student's resume</p>
                    </CardContent>
                </Card>
            )}
        </main>
    )
}