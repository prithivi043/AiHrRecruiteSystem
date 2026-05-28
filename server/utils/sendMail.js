// server/utils/sendMail.js

import { Resend } from "resend";

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

// ==============================
// Send Mail Utility
// ==============================

const sendMail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const response =
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM,
        to,
        subject,
        html,
      });

    console.log(
      "Email sent successfully"
    );

    return response;
  } catch (error) {
    console.log(
      "Email sending failed:",
      error.message
    );

    throw error;
  }
};

export default sendMail;