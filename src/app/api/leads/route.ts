import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// ===== Types =====
interface CommonFields {
  phone?: string;
  email: string;
  docNumber?: string;
  subject: string;
  message: string;
}
interface ClientLead extends CommonFields {
  kind: "client";
  name: string;
}
interface CompanyLead extends CommonFields {
  kind: "company";
  companyName: string;
  companyInn?: string;
  clientName: string;
}
type LeadBody = ClientLead | CompanyLead;

// ===== Utils =====
function bad(msg: string, code = 400): Response {
  return new Response(msg, { status: code });
}

const esc = (v?: string) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const toLines = (b: LeadBody) => {
  const lines: string[] = [];
  lines.push(`Turi: ${b.kind}`);
  if (b.kind === "client") {
    lines.push(`Ism-Sharif: ${b.name}`);
  } else {
    lines.push(`Kompaniya: ${b.companyName}`);
    if (b.companyInn) lines.push(`INN: ${b.companyInn}`);
    lines.push(`Mijoz: ${b.clientName}`);
  }
  if (b.phone) lines.push(`Telefon: ${b.phone}`);
  lines.push(`Email: ${b.email}`);
  if (b.docNumber) lines.push(`Hujjat raqami: ${b.docNumber}`);
  lines.push("", "Xabar:", b.message);
  return lines;
};

// simple, inlined CSS for good Gmail/Outlook support
function toHtml(b: LeadBody): string {
  const rows: Array<[string, string]> = [];

  rows.push(["Turi", b.kind === "client" ? "Mijoz" : "Kompaniya"]);
  if (b.kind === "client") {
    rows.push(["Ism-Sharif", esc(b.name)]);
  } else {
    rows.push(["Kompaniya", esc(b.companyName)]);
    if (b.companyInn) rows.push(["INN", esc(b.companyInn)]);
    rows.push(["Mijoz", esc(b.clientName)]);
  }
  if (b.phone) rows.push(["Telefon", esc(b.phone)]);
  rows.push(["Email", `<a href="mailto:${esc(b.email)}">${esc(b.email)}</a>`]);
  if (b.docNumber) rows.push(["Hujjat raqami", esc(b.docNumber)]);
  rows.push(["Xabar", esc(b.message).replace(/\n/g, "<br/>")]);

  return `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Yangi lead</title>
    <style>
      /* Inlined-friendly styles */
      .wrapper{background:#f6f7f9;padding:24px}
      .card{max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;
            box-shadow:0 6px 24px rgba(0,0,0,.06);padding:20px;border:1px solid #eee}
      .h1{font:600 20px/1.3 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif;margin:0 0 12px;color:#111}
      .meta{color:#666;font:500 12px/1.2 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif;margin-bottom:16px}
      table{width:100%;border-collapse:collapse}
      th,td{padding:10px 12px;text-align:left;vertical-align:top;font:14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif}
      th{width:38%;color:#333;background:#fafafa;border:1px solid #eee}
      td{border:1px solid #eee}
      .footer{margin-top:16px;color:#999;font:12px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif}
      .badge{display:inline-block;background:#ff9d62;color:#fff;border-radius:999px;padding:4px 10px;font:600 12px/1 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif}
    </style>
  </head>
  <body class="wrapper">
    <div class="card">
      <div class="h1">Yangi murojaat</div>
      <div class="meta">
        <span class="badge">${b.kind === "client" ? "Mijoz" : "Kompaniya"}</span>
        &nbsp;•&nbsp; Mavzu: <strong>${esc(b.subject)}</strong>
      </div>
      <table role="presentation" aria-hidden="true">
        ${rows
          .map(
            ([k, v]) => `
            <tr>
              <th>${k}</th>
              <td>${v}</td>
            </tr>`
          )
          .join("")}
      </table>
      <div class="footer">
        Ushbu xat sayt formasi orqali avtomatik yuborildi. Javob berish uchun “Reply” tugmasidan foydalaning.
      </div>
    </div>
  </body>
</html>
  `.trim();
}

// ===== Route =====
export async function POST(req: NextRequest) {
  let bodyUnknown: unknown;
  try {
    bodyUnknown = await req.json();
  } catch {
    return bad("Invalid JSON");
  }

  // narrow types
  const isClient = (x: any): x is ClientLead =>
    x && x.kind === "client" && typeof x.name === "string" &&
    typeof x.email === "string" && typeof x.subject === "string" && typeof x.message === "string";
  const isCompany = (x: any): x is CompanyLead =>
    x && x.kind === "company" && typeof x.companyName === "string" &&
    typeof x.clientName === "string" &&
    typeof x.email === "string" && typeof x.subject === "string" && typeof x.message === "string";

  if (!isClient(bodyUnknown) && !isCompany(bodyUnknown)) {
    return bad("Missing required fields");
  }
  const body: LeadBody = bodyUnknown as LeadBody;

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST || "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: { user: process.env.ZOHO_USER!, pass: process.env.ZOHO_PASS! },
  });

  try {
    await transporter.sendMail({
      from: `"Website Lead" <${process.env.ZOHO_USER}>`,
      to: process.env.LEAD_TO!,
      subject: `Lead: ${body.subject}`,
      text: toLines(body).join("\n"), // plaintext fallback
      html: toHtml(body),             // pretty HTML
      replyTo: body.email,
    });
    return Response.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "SMTP error";
    console.error("SMTP error:", msg);
    return bad("Email send failed", 500);
  }
}
