import nodeMailer from "nodemailer";

/**
 * Utility to send emails using Nodemailer
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email address
 * @param {string} options.subject - Subject of the email
 * @param {string} options.message - Message body
 * @param {string} options.userEmail - User's email who sent the message
 */
export const sendEmail = async (options) => {
  try {
    // Create a transporter using SMTP settings
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL, // Your email
        pass: process.env.SMTP_PASSWORD, // App password
      },
    });

    // Define email options
    const mailOptions = {
      from: `Contact Form <${process.env.SMTP_MAIL}>`, // Sender's email
      to: options.email, // Recipient's email
      subject: options.subject, // Email subject
      text: `${options.message}\n\nSender's Email: ${options.userEmail}`, // Email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email.");
  }
};
