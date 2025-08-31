// src/contexts/StudentContext.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface StudentContextType {
    rollNo: string | null
    setRollNo: (rollNo: string) => void
    clearRollNo: () => void
    isLoading: boolean
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: React.ReactNode }) {
    const [rollNo, setRollNoState] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { data: session, status } = useSession()

    useEffect(() => {
        // Auto-set rollNo from session if user is a student
        if (status === 'authenticated' && session?.user?.role === 'STUDENT') {
            if (session.user.rollNo) {
                setRollNoState(session.user.rollNo)
            }
            setIsLoading(false)
        } else if (status === 'unauthenticated') {
            setIsLoading(false)
        }
    }, [session, status])

    const setRollNo = (newRollNo: string) => {
        setRollNoState(newRollNo)
        // Store in localStorage for persistence
        if (typeof window !== 'undefined') {
            localStorage.setItem('student-rollno', newRollNo)
        }
    }

    const clearRollNo = () => {
        setRollNoState(null)
        if (typeof window !== 'undefined') {
            localStorage.removeItem('student-rollno')
        }
    }

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined' && !rollNo && status !== 'loading') {
            const stored = localStorage.getItem('student-rollno')
            if (stored) {
                setRollNoState(stored)
            }
        }
    }, [rollNo, status])

    return (
        <StudentContext.Provider value={{
            rollNo,
            setRollNo,
            clearRollNo,
            isLoading: isLoading || status === 'loading'
        }}>
            {children}
        </StudentContext.Provider>
    )
}

export function useStudent() {
    const context = useContext(StudentContext)
    if (context === undefined) {
        throw new Error('useStudent must be used within a StudentProvider')
    }
    return context
}