const nodemailer = require("nodemailer");
require("dotenv").config();

/* -----------------------------------------------------------
   1. Transporter Setup
------------------------------------------------------------ */
const transporter = nodemailer.createTransport({
  host: "static.cmtradingco.com",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@static.cmtradingco.com",
    pass: process.env.SMTP_PASS || "KB_*d-~[!ST=",
  },
  logger: true,
  debug: true,
});

// Verify connection
transporter
  .verify()
  .then(() => console.log("✅ SMTP connected successfully"))
  .catch((err) => console.error("❌ SMTP connection failed:", err));

/* -----------------------------------------------------------
   2. Send Mail Helper
------------------------------------------------------------ */
async function sendMail(to, cc, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Rippotai Architecture" <no-reply@static.cmtradingco.com>`,
      to,
      cc, // Add CC field for queries and applications
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
}

/* -----------------------------------------------------------
   3. Middleware Wrapper
------------------------------------------------------------ */
function emailer(templateFn, emailType) {
  return async (req, res, next) => {
    if (res.headersSent) {
      console.warn("⚠️ Headers already sent, skipping emailer");
      return next();
    }

    try {
      const { to, params } = req.email;
      console.log(`📩 Sending ${emailType} email to: ${to}`);

      if (typeof templateFn !== "function") {
        throw new Error(`templateFn is not a function: ${templateFn}`);
      }

      const msg = templateFn(...params);
      const cc =
        emailType === "query"
          ? "sagar@rippotai.in"
          : "rippotaiarchitecture@gmail.com"; // CC logic based on email type
      await sendMail(to, cc, msg.subject, msg.text, msg.html);

      console.log(`✅ ${emailType} email sent successfully to: ${to}`);
      next();
    } catch (err) {
      console.error(`❌ ${emailType} email error for ${req.email?.to}:`, err);
      next(err);
    }
  };
}

/* -----------------------------------------------------------
   4. Base Template
------------------------------------------------------------ */
function baseTemplate(title, body) {
  return `
  <div style="font-family: 'Lato', Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e8ecef; border-radius: 8px; overflow: hidden; background-color: #f8f8f8;">
    <div style="background-color: #1a3c34; color: #ffffff; padding: 16px; text-align: center; font-size: 20px; font-family: 'Neuropol', sans-serif; font-weight: bold;">
      Rippotai Architecture
    </div>
    <div style="padding: 24px; font-size: 15px; line-height: 1.6; color: #333333;">
      <h2 style="color: #1a3c34; font-family: 'Neuropol', sans-serif; font-weight: 700; margin-bottom: 16px;">${title}</h2>
      ${body}
    </div>
    <div style="background-color: #e8ecef; padding: 12px; text-align: center; font-size: 13px; color: #777777;">
      © ${new Date().getFullYear()} Rippotai Architecture. All rights reserved.
    </div>
  </div>`;
}

/* -----------------------------------------------------------
   5. Templates
------------------------------------------------------------ */

// Query Confirmation Email (to user)
function queryConfirmationEmail(name, subject, message) {
  const emailSubject = "Thank You for Your Inquiry | Rippotai Architecture";

  const text = `
Hi ${name},

Thank you for reaching out to Rippotai Architecture with your inquiry: "${subject}".

Your message:
"${message}"

Our team will review your inquiry and get back to you soon.

Best regards,
Rippotai Architecture`;

  const html = baseTemplate(
    "Thank You for Your Inquiry",
    `<p style="margin-bottom: 20px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Hi ${name},</p>
     <p style="margin-bottom: 20px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Thank you for reaching out to Rippotai Architecture with your inquiry: <strong>${subject}</strong>.</p>
     <blockquote style="border-left: 3px solid #d4a017; padding-left: 12px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">${message}</blockquote>
     <p style="margin-bottom: 20px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Our team will review your inquiry and get back to you soon.</p>
     <p style="margin-bottom: 0; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Best regards,<br>Rippotai Architecture</p>`
  );

  return { subject: emailSubject, text, html };
}

// Admin Query Notification Email
function adminQueryNotificationEmail(name, email, subject, message) {
  const emailSubject = "New Inquiry Submission | Rippotai Architecture";

  const text = `
New inquiry received:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

Please follow up with the user.`;

  const html = baseTemplate(
    "New Inquiry Submission",
    `<p style="margin-bottom: 20px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">A new inquiry has been received:</p>
     <ul style="list-style: none; margin-bottom: 20px; padding: 0; line-height: 1.8; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px;">
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Name:</strong> ${name}</li>
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Email:</strong> ${email}</li>
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Subject:</strong> ${subject}</li>
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Message:</strong> ${message}</li>
     </ul>
     <p style="margin-bottom: 0; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Please follow up with the user.</p>`
  );

  return { subject: emailSubject, text, html };
}

// Job Application Confirmation Email (to applicant)
function jobApplicationConfirmationEmail(name, position) {
  const emailSubject = "Application Received | Rippotai Architecture";

  const text = `
Hi ${name},

Thank you for applying for the ${position} position at Rippotai Architecture.

We have received your application and will review it shortly. If your qualifications match our needs, we will reach out to schedule an interview.

Best regards,
Rippotai Architecture`;

  const html = baseTemplate(
    "Application Received",
    `<p style="margin-bottom: 20px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Hi ${name},</p>
     <p style="margin-bottom: 20px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Thank you for applying for the <strong>${position}</strong> position at Rippotai Architecture.</p>
     <p style="margin-bottom: 20px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">We have received your application and will review it shortly. If your qualifications match our needs, we will reach out to schedule an interview.</p>
     <p style="margin-bottom: 0; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Best regards,<br>Rippotai Architecture</p>`
  );

  return { subject: emailSubject, text, html };
}

// Admin Job Application Notification Email
function adminJobApplicationNotificationEmail(
  name,
  email,
  position,
  coverLetter,
  resumeUrl
) {
  const emailSubject = "New Job Application | Rippotai Architecture";

  const text = `
New job application received:

Name: ${name}
Email: ${email}
Position: ${position}
Cover Letter: ${coverLetter || "Not provided"}
Resume: ${resumeUrl}

Please review the application.`;

  const html = baseTemplate(
    "New Job Application",
    `<p style="margin-bottom: 20px; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">A new job application has been received:</p>
     <ul style="list-style: none; margin-bottom: 20px; padding: 0; line-height: 1.8; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px;">
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Name:</strong> ${name}</li>
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Email:</strong> ${email}</li>
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Position:</strong> ${position}</li>
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Cover Letter:</strong> ${
         coverLetter || "Not provided"
       }</li>
       <li style="list-style: disc; padding-left: 15px;"><strong style="font-weight: 700;">Resume:</strong> <a href="${resumeUrl}" style="color: #d4a017; text-decoration: underline;">View Resume</a></li>
     </ul>
     <p style="margin-bottom: 0; color: #333333; font-family: 'Lato', Arial, sans-serif; font-size: 14px; line-height: 1.6;">Please review the application.</p>`
  );

  return { subject: emailSubject, text, html };
}

/* -----------------------------------------------------------
   6. Exports
------------------------------------------------------------ */
module.exports = {
  sendMail,
  emailer,
  queryConfirmationEmail,
  adminQueryNotificationEmail,
  jobApplicationConfirmationEmail,
  adminJobApplicationNotificationEmail,
};
