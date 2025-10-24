import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer must run in the Node runtime (not edge)
export const runtime = "nodejs";

type LeadBody =
  | {
      kind: "client";
      name: string;
      phone?: string;
      email: string;
      docNumber?: string;
      subject: string;
      message: string;
    }
  | {
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

function bad(msg: string, code = 400) {
  return new Response(msg, { status: code });
}

export async function POST(req: NextRequest) {
  // Parse body
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return bad("Invalid JSON");
  }

  // Validate required fields
  const common = (b: any) =>
    !!b?.subject && !!b?.message && typeof b?.email === "string";

  const valid =
    (body.kind === "client" && !!(body as any).name && common(body)) ||
    (body.kind === "company" &&
      !!(body as any).companyName &&
      !!(body as any).clientName &&
      common(body));

  if (!valid) return bad("Missing required fields");

  // Build plain-text email
  const lines: string[] = [];
  lines.push(`Turi: ${body.kind}`);
  if (body.kind === "client") {
    const b = body as Extract<LeadBody, { kind: "client" }>;
    lines.push(`Ism-Sharif: ${b.name}`);
  } else {
    const b = body as Extract<LeadBody, { kind: "company" }>;
    lines.push(`Kompaniya: ${b.companyName}`);
    if (b.companyInn) lines.push(`INN: ${b.companyInn}`);
    lines.push(`Mijoz: ${b.clientName}`);
  }
  if (body.phone) lines.push(`Telefon: ${body.phone}`);
  lines.push(`Email: ${body.email}`);
  if (body.docNumber) lines.push(`Hujjat raqami: ${body.docNumber}`);
  lines.push("", "Xabar:", body.message);

  // Transporter (Zoho SMTP)
  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST || "smtp.zoho.com", // use smtp.zoho.eu/.in if needed
    port: 465,
    secure: true, // 465 = SSL
    auth: {
      user: process.env.ZOHO_USER!,
      pass: process.env.ZOHO_PASS!,
    },
  });

  // Send
  try {
    await transporter.sendMail({
      from: `"Website Lead" <${process.env.ZOHO_USER}>`, // must be your authenticated Zoho address
      to: process.env.LEAD_TO!, // e.g. rahmatullohrustam@gmail.com
      subject: `Lead: ${body.subject}`,
      text: lines.join("\n"),
      replyTo: body.email, // reply goes to the visitor
    });

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("SMTP error:", e?.message || e);
    return bad("Email send failed", 500);
  }
}
