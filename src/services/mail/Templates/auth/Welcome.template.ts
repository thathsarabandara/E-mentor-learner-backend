import { mailConfig } from "../../../../config/Mail.Config";
import { transporter } from "../../../../services/mail/Mail.Service";

export const sendWelcomeMail = async(to: string, username: string): Promise<void> =>{
    try {
        const year = new Date().getFullYear();

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Welcome to E-Mentor</title>
            </head>
            <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">

            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 40px 0;">
                <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" bgcolor="#ff6b00" style="padding: 24px;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎉 Welcome to E-Mentor LMS!</h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 32px; color: #333333; font-size: 16px;">
                        <p style="margin-top: 0;">Hi <strong>${username}</strong>,</p>
                        <p>Welcome aboard! We're thrilled to have you as part of the E-Mentor community. Whether you're here to learn or teach, you're in the right place!</p>

                        <p>Here’s what you can do next:</p>
                        <ul>
                            <li>🚀 Explore available courses</li>
                            <li>📚 Track your progress</li>
                            <li>🤝 Connect with other learners and mentors</li>
                        </ul>

                        <p>If you ever need help or have questions, feel free to reach out to our support team.</p>

                        <p>Happy learning!<br><strong>The E-Mentor LMS Team</strong></p>
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
            subject: '🎉 Welcome to E-Mentor LMS!',
            html
        }

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Failed to send welcome email:", error);
        throw new Error("Welcome email sending failed");
    }
}