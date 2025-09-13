"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, getTranslations, type Translations } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("uz")
  const [t, setT] = useState<Translations>(getTranslations("uz"))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language
      if (savedLang && ["uz", "ru", "en"].includes(savedLang)) {
        setLanguage(savedLang)
        setT(getTranslations(savedLang))
        document.documentElement.lang = savedLang
      }
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    setT(getTranslations(lang))
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
      document.documentElement.lang = lang
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
