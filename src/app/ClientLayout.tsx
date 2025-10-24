"use client";

import type React from "react";
import { useRef, useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { usePhoneFormatting } from "@/hooks/use-phone-formatting";
import { SuccessModal } from "./success-modal";

type ClientPayload = {
  kind: "client";
  name: string;
  phone?: string;
  email: string;
  docNumber?: string;
  subject: string;
  message: string;
};

type CompanyPayload = {
  kind: "company";
  companyName: string;
  companyInn?: string;
  clientName: string;
  phone?: string;
  email: string;
  docNumber?: string;
  subject: string;
  message: string;
};

const API_URL = "/api/leads";

export function ContactForms() {
  const { t } = useLanguage();
  const [activeForm, setActiveForm] = useState<"mijoz" | "kompaniya">("mijoz");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const mijozFormRef = useRef<HTMLFormElement>(null);
  const kompaniyaFormRef = useRef<HTMLFormElement>(null);

  usePhoneFormatting();

  const postLead = async (payload: ClientPayload | CompanyPayload) => {
    setSubmitting(true);
    setErrorText(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setShowSuccessModal(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Lead send error:", msg);
      setErrorText(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMijozSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload: ClientPayload = {
      kind: "client",
      name: String(fd.get("ism") ?? ""),
      phone: String(fd.get("telefon") ?? ""),
      email: String(fd.get("email") ?? ""),
      docNumber: String(fd.get("hujjat") ?? ""),
      subject: String(fd.get("mavzu") ?? ""),
      message: String(fd.get("xabar") ?? ""),
    };

    await postLead(payload);
    form.reset();
  };

  const handleKompaniyaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload: CompanyPayload = {
      kind: "company",
      companyName: String(fd.get("kompaniya_nomi") ?? ""),
      companyInn: String(fd.get("kompaniya_inn") ?? ""),
      clientName: String(fd.get("mijoz_ism") ?? ""),
      phone: String(fd.get("telefon") ?? ""),
      email: String(fd.get("email") ?? ""),
      docNumber: String(fd.get("hujjat") ?? ""),
      subject: String(fd.get("mavzu") ?? ""),
      message: String(fd.get("xabar") ?? ""),
    };

    await postLead(payload);
    form.reset();
  };

  return (
    <section className="form__sec" id="contact">
      <div className="form__sec-container">
        <div className="form__sec-left">
          <h2
            className="form__sec-title"
            dangerouslySetInnerHTML={{ __html: t.form.title }}
          />
          <p
            className="form__sec-text"
            dangerouslySetInnerHTML={{
              __html: t.form.description.split("\n").join("<br/>"),
            }}
          />
        </div>

        <div className="form__sec-right">
          <div className="form-btns">
            <button
              type="button"
              className={`form__change-btn ${
                activeForm === "mijoz" ? "active" : ""
              }`}
              onClick={() => setActiveForm("mijoz")}
              aria-pressed={activeForm === "mijoz"}
            >
              {t.form.tabs.client}
            </button>
            <button
              type="button"
              className={`form__change-btn ${
                activeForm === "kompaniya" ? "active" : ""
              }`}
              onClick={() => setActiveForm("kompaniya")}
              aria-pressed={activeForm === "kompaniya"}
            >
              {t.form.tabs.company}
            </button>
          </div>

          {/* Client Form */}
          <form
            ref={mijozFormRef}
            className={`form_client ${activeForm === "mijoz" ? "active" : ""}`}
            onSubmit={handleMijozSubmit}
            noValidate
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
            <button className="form__btn" type="submit" disabled={submitting}>
              <span className="btn-text">
                {submitting ? t.form.sending ?? "Yuborilmoqda..." : t.form.submit}
              </span>
            </button>
            {errorText && (
              <p className="form__error" role="alert" style={{ marginTop: 8 }}>
                {errorText}
              </p>
            )}
          </form>

          {/* Company Form */}
          <form
            ref={kompaniyaFormRef}
            className={`form_company ${
              activeForm === "kompaniya" ? "active" : ""
            }`}
            onSubmit={handleKompaniyaSubmit}
            noValidate
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
            <button className="form__btn" type="submit" disabled={submitting}>
              <span className="btn-text">
                {submitting ? t.form.sending ?? "Yuborilmoqda..." : t.form.submit}
              </span>
            </button>
            {errorText && (
              <p className="form__error" role="alert" style={{ marginTop: 8 }}>
                {errorText}
              </p>
            )}
          </form>
        </div>

        <p
          className="form__sec-text-bottom"
          dangerouslySetInnerHTML={{ __html: t.form.footer }}
        />
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </section>
  );
}
