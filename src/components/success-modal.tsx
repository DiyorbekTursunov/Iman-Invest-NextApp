"use client"

import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"
import { useEffect } from "react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("thankYouModal")
      if (event.target === modal) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div id="thankYouModal" className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <div className="success-icon">
          <Image src="/img/verify.svg" width={69} height={69} loading="lazy" alt="verify" />
        </div>
        <h2>{t.form.success.title}</h2>
        <button className="modal-btn" onClick={onClose}>
          <svg width={50} height={50} viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
