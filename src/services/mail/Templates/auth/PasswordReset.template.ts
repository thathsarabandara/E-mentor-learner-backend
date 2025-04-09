import { mailConfig } from "../../../../config/Mail.Config";
import { transporter } from "../../../../services/mail/Mail.Service";

export const sendResetPasswordMail = async (
  to: string,
  username: string,
  resetLink: string
): Promise<void> => {
  try {
    const year = new Date().getFullYear();

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reset Your Password</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 0 10px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td align="center" bgcolor="#ff6b00" style="padding: 24px;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🔐 Password Reset Request</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding: 32px; color: #333333; font-size: 16px;">
                    <p style="margin-top: 0;">Hi <strong>${username}</strong>,</p>
                    <p>We received a request to reset your password for your E-Mentor LMS account.</p>

                    <p>Click the button below to reset your password. This link is valid for <strong>15 minutes</strong>.</p>

                    <div style="text-align: center; margin: 24px 0;">
                      <a href="${resetLink}" style="background-color: #ff6b00; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px;">
                        Reset My Password
                      </a>
                    </div>

                    <p>If you didn’t request this, you can safely ignore this email.</p>

                    <p>Thanks,<br><strong>The E-Mentor LMS Team</strong></p>
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
      subject: '🔐 Reset Your Password - E-Mentor LMS',
      html
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error("Password reset email sending failed");
  }
};
