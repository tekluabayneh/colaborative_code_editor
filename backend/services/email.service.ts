import * as SibApiV3Sdk from "sib-api-v3-sdk";
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const defaultClient = SibApiV3Sdk.ApiClient.instance;
// @ts-expect-error
const apiKey = defaultClient.authentications["api-key"] as SibApiV3Sdk.ApiKeyAuthentication;
apiKey.apiKey = BREVO_API_KEY;

// * Generic function to send emails via Brevo API
export async function EmailSender({
    senderName,
    senderEmail,
    recipientEmail,
    subject,
    htmlContent,
}: {
    senderName: string;
    senderEmail: string;
    recipientEmail: string;
    subject: string;
    htmlContent: string;
}): Promise<void> {
    try {
        const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

        // @ts-expect-error
        const sendSmtpEmail: SibApiV3Sdk.SendSmtpEmail = {
            sender: { name: senderName, email: senderEmail },
            to: [{ email: recipientEmail }],
            subject,
            htmlContent,
        };

        const result = await transactionalApi.sendTransacEmail(sendSmtpEmail);
        console.log("✅ Email sent successfully via Brevo API!");
        console.log("Message ID:", result.messageId);
    } catch (error: any) {
        console.error("❌ Failed to send email via Brevo API:");
        console.error(error?.response?.body || error?.message || error);
    }
}

// Invitation email
export const sendInvitationLink = async (to: string, invitationLink: string) => {
    const senderName = "CodeSync";
    const senderEmail = "tekluabayneh@gmail.com";
    const subject = "You’ve Been Invited to CodeSync 🎉";

    const html = `
<div style="font-family: Arial, sans-serif; background-color: #f7f8fa; padding: 30px; text-align: center;">
  <h1 style="color: #4A90E2; font-size: 28px; margin-bottom: 10px;">
    <span style="background-color:#4A90E2; color:#fff; padding:8px 14px; border-radius:6px;">
      CodeSync
    </span>
  </h1>
  <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; max-width: 450px; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="color: #333; font-size: 20px;">You’ve Been Invited!</h2>
    <p style="color: #555; font-size: 15px; line-height: 1.5;">
      An <strong>Admin</strong> (or <strong>Super Admin</strong>) has invited you to join <strong>CodeSync</strong>.<br>
      Click the button below to accept your invitation and get started:
    </p>
    <div style="margin: 20px 0;">
      <a href="${invitationLink}"
         style="display: inline-block; background-color: #4A90E2; color: #fff; padding: 12px 20px; font-size: 16px; text-decoration: none; border-radius: 6px;">
        Accept Invitation
      </a>
    </div>
    <p style="color: #888; font-size: 13px;">
      This link will expire in 24 hours. If you did not expect this invitation, you can ignore this email.
    </p>
  </div>
  <p style="color: #999; font-size: 12px; margin-top: 20px;">
    © ${new Date().getFullYear()} CodeSync. All rights reserved.
  </p>
</div>`;

    await EmailSender({
        senderName,
        senderEmail,
        recipientEmail: to,
        subject,
        htmlContent: html,
    });
};

// Password reset email
export const sendResetPasswordLink = async (to: string, resetLink: string) => {
    const senderName = "CodeSync";
    const senderEmail = "tekluabayneh@gmail.com";
    const subject = "Password Reset Request - CodeSync";

    const html = `
<div style="font-family: Arial, sans-serif; background-color: #f7f8fa; padding: 30px; text-align: center;">
  <h1 style="color: #4A90E2; font-size: 28px; margin-bottom: 10px;">
    <span style="background-color:#4A90E2; color:#fff; padding:8px 14px; border-radius:6px;">
      CodeSync
    </span>
  </h1>
  <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; max-width: 400px; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="color: #333; font-size: 20px;">Reset Your Password</h2>
    <p style="color: #555; font-size: 15px; line-height: 1.5;">
      We received a request to reset your password.<br>
      Click the button below to set a new password:
    </p>
    <div style="margin: 20px 0;">
      <a href="${resetLink}"
         style="display: inline-block; background-color: #4A90E2; color: #fff; padding: 12px 20px; font-size: 16px; text-decoration: none; border-radius: 6px;">
        Reset Password
      </a>
    </div>
    <p style="color: #888; font-size: 13px;">
      If you didn’t request this change, you can safely ignore this email.<br>
      This link will expire in 15 minutes.
    </p>
  </div>
  <p style="color: #999; font-size: 12px; margin-top: 20px;">
    © ${new Date().getFullYear()} CodeSync. All rights reserved.
  </p>
</div>`;

    await EmailSender({
        senderName,
        senderEmail,
        recipientEmail: to,
        subject,
        htmlContent: html,
    });
};

// OTP email
export const sendOtpEmail = async (to: string, otp: string) => {
    const senderName = "CodeSync";
    const senderEmail = "tekluabayneh@gmail.com";
    const subject = "Your OTP Code - from CodeSync";

    const html = `
<div style="font-family: Arial, sans-serif; background-color: #f7f8fa; padding: 30px; text-align: center;">
  <h1 style="color: #4A90E2; font-size: 28px; margin-bottom: 10px;">
    <span style="background-color:#4A90E2; color:#fff; padding:8px 14px; border-radius:6px;">
      CodeSync
    </span>
  </h1>
  <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; max-width: 400px; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="color: #333; font-size: 20px;">Your OTP Code</h2>
    <p style="color: #555; font-size: 15px; line-height: 1.5;">
      Use the following code to complete your verification process:
    </p>
    <div style="margin: 20px 0;">
      <span style="display: inline-block; background-color: #4A90E2; color: #fff; padding: 12px 20px; font-size: 22px; letter-spacing: 4px; border-radius: 6px;">
        ${otp}
      </span>
    </div>
    <p style="color: #888; font-size: 13px;">
      This code will expire in 5 minutes.<br>
      Please do not share it with anyone.
    </p>
  </div>
  <p style="color: #999; font-size: 12px; margin-top: 20px;">
    © ${new Date().getFullYear()} CodeSync. All rights reserved.
  </p>
</div>`;

    await EmailSender({
        senderName,
        senderEmail,
        recipientEmail: to,
        subject,
        htmlContent: html,
    });
};

