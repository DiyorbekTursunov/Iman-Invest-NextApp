"use client"

import { useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"

export function usePhoneFormatting() {
  const { t } = useLanguage()

  useEffect(() => {
    const setupPhoneFormatting = () => {
      const phoneInputs = document.querySelectorAll(".phone-input")

      phoneInputs.forEach((input) => {
        const phoneInput = input as HTMLInputElement

        const handleMouseEnter = () => {
          if (!phoneInput.value && !phoneInput.matches(":focus")) {
            phoneInput.placeholder = t.form.placeholders.phoneFormat
          }
        }

        const handleMouseLeave = () => {
          if (!phoneInput.value && !phoneInput.matches(":focus")) {
            phoneInput.placeholder = t.form.placeholders.phoneHover
          }
        }

        const handleFocus = () => {
          phoneInput.placeholder = t.form.placeholders.phoneFormat
          if (!phoneInput.value) {
            phoneInput.value = "+998 "
          }
        }

        const handleBlur = () => {
          if (phoneInput.value === "+998 ") {
            phoneInput.value = ""
            phoneInput.placeholder = t.form.placeholders.phoneHover
          }
        }

        const handleInput = () => {
          let value = phoneInput.value.replace(/\D/g, "")

          if (!value.startsWith("998")) {
            if (value.length > 0) {
              value = "998" + value.substring(value.startsWith("998") ? 3 : 0)
            } else {
              value = "998"
            }
          }

          if (value.length > 12) {
            value = value.substring(0, 12)
          }

          let formatted = "+998"
          if (value.length > 3) {
            formatted += " " + value.substring(3, 5)
          }
          if (value.length > 5) {
            formatted += " " + value.substring(5, 8)
          }
          if (value.length > 8) {
            formatted += " " + value.substring(8, 10)
          }
          if (value.length > 10) {
            formatted += " " + value.substring(10, 12)
          }

          phoneInput.value = formatted
        }

        const handleKeyDown = (e: KeyboardEvent) => {
          if (
            (e.key === "Backspace" || e.key === "Delete") &&
            phoneInput.selectionStart! <= 5 &&
            phoneInput.selectionEnd! <= 5
          ) {
            e.preventDefault()
          }
        }

        phoneInput.addEventListener("mouseenter", handleMouseEnter)
        phoneInput.addEventListener("mouseleave", handleMouseLeave)
        phoneInput.addEventListener("focus", handleFocus)
        phoneInput.addEventListener("blur", handleBlur)
        phoneInput.addEventListener("input", handleInput)
        phoneInput.addEventListener("keydown", handleKeyDown)

        // Cleanup function
        return () => {
          phoneInput.removeEventListener("mouseenter", handleMouseEnter)
          phoneInput.removeEventListener("mouseleave", handleMouseLeave)
          phoneInput.removeEventListener("focus", handleFocus)
          phoneInput.removeEventListener("blur", handleBlur)
          phoneInput.removeEventListener("input", handleInput)
          phoneInput.removeEventListener("keydown", handleKeyDown)
        }
      })
    }

    setupPhoneFormatting()
  }, [t.form.placeholders.phoneFormat, t.form.placeholders.phoneHover])
}
