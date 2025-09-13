"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/use-language";
import type { Language } from "@/lib/i18n";
import Image from "next/image";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] =
    useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
    document.body.style.height = "";
    setIsMobileLangDropdownOpen(false);
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
    setIsMobileLangDropdownOpen(false);
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileMenuOpen) {
          closeMobileMenu();
        }
        setIsLangDropdownOpen(false);
        setIsMobileLangDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;

      // Check for desktop dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsLangDropdownOpen(false);
      }

      // Check for mobile dropdown
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(target)
      ) {
        setIsMobileLangDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Cleanup body styles on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="header_per">
          <div className="header__container">
            <div className="header__left">
              <a href="#" className="header__logo">
                <Image
                  src="/img/logo.svg"
                  alt="logo"
                  width={168}
                  height={41}
                  loading="lazy"
                  className="header__logo-img"
                />
              </a>
              <ul className="header__nav">
                <li className="header__nav-item">
                  <a href="#contact" className="header__nav-link">
                    {t.header.nav.application}
                  </a>
                </li>
                <li className="header__nav-item">
                  <a href="#contact" className="header__nav-link">
                    {t.header.nav.contact}
                  </a>
                </li>
                <li className="header__nav-item">
                  <a href="#footer" className="header__nav-link">
                    {t.header.nav.iman}
                  </a>
                </li>
              </ul>
            </div>

            <button
              className={`menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
              onClick={openMobileMenu}
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="hamburger" />
              <span className="hamburger" />
              <span className="hamburger" />
            </button>

            <div className="header__lang-dropdown" ref={dropdownRef}>
              <button
                className={`header__lang-btn ${
                  isLangDropdownOpen ? "active" : ""
                }`}
                aria-expanded={isLangDropdownOpen}
                aria-haspopup="true"
              >
                <p className="header__lang-text">{t.header.language}</p>
                <span className="header__lang-icon">
                  <Image
                    src="/img/arrow-bottom.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                    loading="lazy"
                    style={{
                      transform: isLangDropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </span>
              </button>

              <div
                className={`header__lang-menu ${
                  isLangDropdownOpen ? "show" : ""
                }`}
              >
                {languages
                  .filter((lang) => lang.code !== language)
                  .map((lang) => (
                    <button
                      key={lang.code}
                      className="header__lang-option"
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      {lang.code === "uz"
                        ? "Uz"
                        : lang.code === "ru"
                        ? "Ру"
                        : "EN"}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu__overlay" onClick={closeMobileMenu} />
        <div className="mobile-menu__content">
          <div className="mobile-menu__header">
            <button
              className="mobile-menu__close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <ul className="mobile-menu__nav">
            <li className="mobile-menu__nav-item">
              <a
                href="#contact"
                className="mobile-menu__nav-link"
                onClick={closeMobileMenu}
              >
                {t.header.nav.application}
              </a>
            </li>
            <li className="mobile-menu__nav-item">
              <a
                href="#contact"
                className="mobile-menu__nav-link"
                onClick={closeMobileMenu}
              >
                {t.header.nav.contact}
              </a>
            </li>
            <li className="mobile-menu__nav-item">
              <a
                href="#footer"
                className="mobile-menu__nav-link"
                onClick={closeMobileMenu}
              >
                {t.header.nav.iman}
              </a>
            </li>
          </ul>

          <div className="mobile-menu__footer">
            <div className="mobile-menu__copyright">
              <p>© IMAN Group Ltd.</p>
            </div>

            <div className="mobile-menu__lang-wrapper" ref={mobileDropdownRef}>
              <button
                className={`mobile-menu__lang-btn ${
                  isMobileLangDropdownOpen ? "active" : ""
                }`}
                onClick={() =>
                  setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen)
                }
                aria-expanded={isMobileLangDropdownOpen}
                aria-haspopup="true"
              >
                <span className="mobile-menu__lang-text">
                  {t.header.language}
                </span>
                <svg
                  className="mobile-menu__lang-icon"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    transform: isMobileLangDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`mobile-menu__lang-dropdown ${
                  isMobileLangDropdownOpen ? "active" : ""
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`mobile-menu__lang-option ${
                      lang.code === language ? "current" : ""
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={lang.code === language}
                  >
                    <span className="flag">{lang.flag}</span>
                    <span>{lang.label}</span>
                    {lang.code === language && (
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ marginLeft: "auto" }}
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
