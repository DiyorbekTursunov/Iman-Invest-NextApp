"use client";

import type React from "react";
import localFont from "next/font/local";
import { LanguageProvider } from "@/hooks/use-language";

const tenorSans = localFont({
    src: "../fonts/TenorSans-Regular.woff2",
    weight: "400",
    style: "normal",
    variable: "--font-tenor-sans",
});

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uz">
            <body className={`font-sans ${tenorSans.variable}`}>
                <LanguageProvider>{children}</LanguageProvider>
            </body>
        </html>
    );
}
