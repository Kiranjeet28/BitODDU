"use client";

import { SessionProvider } from "next-auth/react";
import { StudentProvider } from "@/contexts/StudentContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <StudentProvider>
                {children}
            </StudentProvider>
        </SessionProvider>
    );
}