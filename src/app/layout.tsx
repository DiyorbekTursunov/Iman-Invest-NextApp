import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "@/components/client-layout"

export const metadata: Metadata = {
  title: "Imanum Growth Partners Imanum Growth Partners",
  description: "Imanum Growth Partners is your trusted advisor for successful U.S. market expansion, bridging the gap between international ventures and U.S. opportunities. We empower companies to navigate complexities and achieve sustainable growth.",
  generator: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
