"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useLanguage } from "@/hooks/use-language";
import { usePhoneFormatting } from "@/hooks/use-phone-formatting";
import { SuccessModal } from "./success-modal";

const MIJOZ_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzI9SlyQHdeYp8g2E0dN6UxKXtXgxJYJIBszVYFWa5IJszhboH_VCzYdBYOHgaiMLg2/exec";
const KOMPANIYA_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzgMQEdNq8NkQ1l1xoJElvTbklFveOwSuTcTxqwwT0AmBZ5nduoDfwa8hYwjp5RXsbE/exec";

export function ContactForms() {
  const { t } = useLanguage();
  const [activeForm, setActiveForm] = useState<"mijoz" | "kompaniya">("mijoz");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const mijozFormRef = useRef<HTMLFormElement>(null);
  const kompaniyaFormRef = useRef<HTMLFormElement>(null);

  usePhoneFormatting();

  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  const handleMijozSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setTimeout(() => {
      form.reset();
      setShowSuccessModal(true);
    }, 1000);

    try {
      const data = {
        ism: formData.get("ism"),
        "telefon raqam": formData.get("telefon"),
        Email: formData.get("email"),
        "Hujjat raqami": formData.get("hujjat"),
        Mavzu: formData.get("mavzu"),
        Xabar: formData.get("xabar"),
      };

      await fetch(MIJOZ_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data as Record<string, string>),
      });
    } catch (error) {
      console.error("Error submitting mijoz form:", error);
    }
  };

  const handleKompaniyaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    form.reset();
    setShowSuccessModal(true);

    try {
      const data = {
        "Kompaniya Nomi": formData.get("kompaniya_nomi"),
        "Kompaniy INNsi": formData.get("kompaniya_inn"),
        "Mijoz ism-sharfi": formData.get("mijoz_ism"),
        "Telefon raqam": formData.get("telefon"),
        Email: formData.get("email"),
        "Hujjat raqami": formData.get("hujjat"),
        Mavzu: formData.get("mavzu"),
        Xabar: formData.get("xabar"),
      };

      await fetch(KOMPANIYA_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data as Record<string, string>),
      });
    } catch (error) {
      console.error("Error submitting kompaniya form:", error);
    }
  };

  return (
    <section className="form__sec" id="contact">
      <div className="form__sec-container">
        <div className="form__sec-left">
          <h2 className="form__sec-title" dangerouslySetInnerHTML={{ __html: t.form.title }} />
          <p className="form__sec-text" dangerouslySetInnerHTML={{ __html: t.form.description.split('\n').join('<br/>') }} />
        </div>
        <div className="form__sec-right">
          <div className="form-btns">
            <button
              className={`form__change-btn ${
                activeForm === "mijoz" ? "active" : ""
              }`}
              onClick={() => setActiveForm("mijoz")}
            >
              {t.form.tabs.client}
            </button>
            <button
              className={`form__change-btn ${
                activeForm === "kompaniya" ? "active" : ""
              }`}
              onClick={() => setActiveForm("kompaniya")}
            >
              {t.form.tabs.company}
            </button>
          </div>

          {/* Client Form */}
          <form
            ref={mijozFormRef}
            className={`form_client ${activeForm === "mijoz" ? "active" : ""}`}
            onSubmit={handleMijozSubmit}
          >
            <input
              className="form__inp"
              type="text"
              name="ism"
              placeholder={t.form.fields.clientName}
              required
            />
            <input
              className="form__inp phone-input"
              type="tel"
              name="telefon"
              placeholder={t.form.fields.phone}
              required
            />
            <input
              className="form__inp"
              type="email"
              name="email"
              placeholder={t.form.fields.email}
              required
            />
            <input
              className="form__inp"
              type="text"
              name="hujjat"
              placeholder={t.form.fields.documentNumber}
              required
            />
            <input
              className="form__inp"
              type="text"
              name="mavzu"
              placeholder={t.form.fields.subject}
              required
            />
            <textarea
              className="form__massage"
              name="xabar"
              placeholder={t.form.fields.message}
              required
            />
            <button className="form__btn" type="submit">
              <span className="btn-text">{t.form.submit}</span>
            </button>
          </form>

          {/* Company Form */}
          <form
            ref={kompaniyaFormRef}
            className={`form_company ${
              activeForm === "kompaniya" ? "active" : ""
            }`}
            onSubmit={handleKompaniyaSubmit}
          >
            <input
              className="form__inp"
              type="text"
              name="kompaniya_nomi"
              placeholder={t.form.fields.companyName}
              required
            />
            <input
              className="form__inp"
              type="text"
              name="kompaniya_inn"
              placeholder={t.form.fields.companyInn}
              required
            />
            <input
              className="form__inp"
              type="text"
              name="mijoz_ism"
              placeholder={t.form.fields.clientName}
              required
            />
            <input
              className="form__inp phone-input"
              type="tel"
              name="telefon"
              placeholder={t.form.fields.phone}
              required
            />
            <input
              className="form__inp"
              type="email"
              name="email"
              placeholder={t.form.fields.email}
              required
            />
            <input
              className="form__inp"
              type="text"
              name="hujjat"
              placeholder={t.form.fields.documentNumber}
              required
            />
            <input
              className="form__inp"
              type="text"
              name="mavzu"
              placeholder={t.form.fields.subject}
              required
            />
            <textarea
              className="form__massage"
              name="xabar"
              placeholder={t.form.fields.message}
              required
            />
            <button className="form__btn" type="submit">
              <span className="btn-text">{t.form.submit}</span>
            </button>
          </form>
        </div>

        <p className="form__sec-text-bottom" dangerouslySetInnerHTML={{ __html: t.form.footer }}></p>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </section>
  );
}
