import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { nom, telephone } = await request.json();

    if (!nom || !telephone) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Rappel Expert - Site Canalisation" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🔔 Nouveau rappel demandé — ${nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #F7941D; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">Nouveau rappel demandé</h1>
          </div>
          <div style="padding: 28px;">
            <p style="color: #718096; font-size: 14px; margin-bottom: 20px;">Un client souhaite être rappelé par un expert.</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 16px; background: #F7FAFC; border-radius: 8px; font-weight: 700; color: #2D3748; width: 40%;">Nom</td>
                <td style="padding: 12px 16px; background: #F7FAFC; border-radius: 8px; color: #2D3748;">${nom}</td>
              </tr>
              <tr><td colspan="2" style="padding: 4px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: #FFF7ED; border-radius: 8px; font-weight: 700; color: #F7941D; width: 40%;">Téléphone</td>
                <td style="padding: 12px 16px; background: #FFF7ED; border-radius: 8px; color: #2D3748; font-size: 18px; font-weight: 700;">${telephone}</td>
              </tr>
            </table>
            <p style="color: #A0AEC0; font-size: 12px; margin-top: 24px; text-align: center;">Reçu le ${new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
