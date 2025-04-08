import { mailConfig } from "../../../../config/Mail.Config";
import { transporter } from "../../../../services/mail/Mail.Service";

export const sendLoginAttemptMail = async (
  to: string,
  username: string,
  ip: string,
  userAgent: string,
  location: string
): Promise<void> => {
  try {
    const time = new Date().toLocaleString();
    const year = new Date().getFullYear();

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Login Attempt Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
        <table align="center" width="600" style="background-color:#fff; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1); padding: 24px;">
          <tr>
            <td style="text-align:center; background-color:#007bff; padding: 16px; color:#fff; border-radius:8px 8px 0 0;">
              <h2 style="margin:0;">🔐 E-Mentor LMS - Login Attempt</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px; font-size: 16px; color: #333;">
              <p>Hello <strong>${username}</strong>,</p>
              <p>A login attempt was made using your account credentials.</p>

              <p><strong>Details:</strong></p>
              <ul>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>IP Address:</strong> ${ip}</li>
                <li><strong>Device:</strong> ${userAgent}</li>
                <li><strong>Location:</strong> ${location}</li>
              </ul>

              <p>If this was you, no further action is required.</p>
              <p>If you didn’t authorize this attempt, please <strong>change your password</strong> immediately.</p>

              <p>Stay safe,<br><strong>E-Mentor LMS Team</strong></p>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size: 13px; color: #888; padding-top: 24px;">
              © ${year} E-Mentor LMS • Need help? <a href="mailto:support@ementor.io" style="color: #ff6b00;">Contact Support</a>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    const mailOptions = {
      from: mailConfig.from,
      to,
      subject: "E-Mentor - Login Attempt Alert",
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send login attempt email:", error);
    throw new Error("Login attempt email failed");
  }
};
