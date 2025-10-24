import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer must run in Node runtime (not edge)
export const runtime = "nodejs";

// ===== Types =====
interface CommonFields {
  phone?: string;
  email: string;
  docNumber?: string;
  subject: string;
  message: string;
}

export interface ClientLead extends CommonFields {
  kind: "client";
  name: string;
}

export interface CompanyLead extends CommonFields {
  kind: "company";
  companyName: string;
  companyInn?: string;
  clientName: string;
}

export type LeadBody = ClientLead | CompanyLead;

// ===== Helpers =====
function bad(msg: string, code = 400): Response {
  return new Response(msg, { status: code });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasCommonFields(b: unknown): b is CommonFields {
  if (!isRecord(b)) return false;
  return (
    typeof b.email === "string" &&
    typeof b.subject === "string" &&
    typeof b.message === "string"
  );
}

function isClientLead(b: unknown): b is ClientLead {
  return hasCommonFields(b) && isRecord(b) && b["kind"] === "client" && typeof b["name"] === "string";
}

function isCompanyLead(b: unknown): b is CompanyLead {
  return (
    hasCommonFields(b) &&
    isRecord(b) &&
    b["kind"] === "company" &&
    typeof b["companyName"] === "string" &&
    typeof b["clientName"] === "string"
  );
}

function buildLines(body: LeadBody): string[] {
  const out: string[] = [];
  out.push(`Turi: ${body.kind}`);
  if (body.kind === "client") {
    out.push(`Ism-Sharif: ${body.name}`);
  } else {
    out.push(`Kompaniya: ${body.companyName}`);
    if (body.companyInn) out.push(`INN: ${body.companyInn}`);
    out.push(`Mijoz: ${body.clientName}`);
  }
  if (body.phone) out.push(`Telefon: ${body.phone}`);
  out.push(`Email: ${body.email}`);
  if (body.docNumber) out.push(`Hujjat raqami: ${body.docNumber}`);
  out.push("", "Xabar:", body.message);
  return out;
}

// ===== Route =====
export async function POST(req: NextRequest) {
  // Parse body
  let unknownBody: unknown;
  try {
    unknownBody = await req.json();
  } catch {
    return bad("Invalid JSON");
  }

  // Validate
  let body: LeadBody;
  if (isClientLead(unknownBody) || isCompanyLead(unknownBody)) {
    body = unknownBody;
  } else {
    return bad("Missing required fields");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST || "smtp.zoho.com",
    port: 465,
    secure: true, // 465 = SSL
    auth: {
      user: process.env.ZOHO_USER!,
      pass: process.env.ZOHO_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Lead" <${process.env.ZOHO_USER}>`,
      to: process.env.LEAD_TO!,
      subject: `Lead: ${body.subject}`,
      text: buildLines(body).join("\n"),
      replyTo: body.email,
    });

    return Response.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown SMTP error";
    console.error("SMTP error:", msg);
    return bad("Email send failed", 500);
  }
}
