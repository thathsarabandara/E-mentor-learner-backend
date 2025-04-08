import { mailConfig } from "config/Mail.Config";
import { transporter } from "services/mail/Mail.Service";

export const sendOTPMail = async (to: string, otp: string, username: string): Promise<void> => {
  try {
    const year = new Date().getFullYear();

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title> E-Mentor - OTP Service </title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
              
              <!-- Header -->
              <tr>
                <td align="center" bgcolor="#ff6b00" style="padding: 24px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🔐 E-Mentor LMS - OTP Verification</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 32px; color: #333333; font-size: 16px;">
                  <p style="margin-top: 0;">Hi <strong>${username}</strong>,</p>
                  <p>You're almost there! Use the following One-Time Password (OTP) to complete your action. This code is valid for <strong>10 minutes</strong>.</p>
                  
                  <table cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
                    <tr>
                      <td align="center" style="padding: 16px; background-color: #fff5ec; border: 2px dashed #ff6b00; font-size: 28px; font-weight: bold; letter-spacing: 8px; color: #ff6b00;">
                        ${otp}
                      </td>
                    </tr>
                  </table>

                  <p>If you didn’t request this, please ignore this email. Your account is still safe.</p>

                  <p>Thanks & regards,<br><strong>The E-Mentor LMS Team</strong></p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" bgcolor="#fafafa" style="padding: 16px; font-size: 13px; color: #888888;">
                  © ${year} E-Mentor LMS. All rights reserved.<br>
                  Need help? <a href="mailto:support@ementor.io" style="color: #ff6b00; text-decoration: none;">Contact Support</a>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>

    </body>
    </html>
    `;

    const mailOptions = {
      from: mailConfig.from,
      to,
      'E-Mentor - OTP Service',
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw new Error("OTP email sending failed");
  }
};
