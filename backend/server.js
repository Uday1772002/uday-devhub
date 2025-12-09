const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Validation middleware
const validateContactForm = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),
];

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Contact form endpoint
app.post("/api/contact", limiter, validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, message } = req.body;

    // Email options for sending to yourself
    const mailOptionsToSelf = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #00d4ff; margin-bottom: 20px;">New Contact Form Submission</h2>
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Name:</strong>
              <p style="color: #666; margin: 5px 0;">${name}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Email:</strong>
              <p style="color: #666; margin: 5px 0;">${email}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Message:</strong>
              <p style="color: #666; margin: 5px 0; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    };

    // Email options for auto-reply to sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #00d4ff; margin-bottom: 20px;">Thanks for reaching out, ${name}!</h2>
            <p style="color: #666; line-height: 1.6;">
              I've received your message and will get back to you as soon as possible.
            </p>
            <p style="color: #666; line-height: 1.6; margin-top: 20px;">
              Here's a copy of your message:
            </p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00d4ff; margin: 20px 0;">
              <p style="color: #666; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #666; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              <strong>Jayaram Uday</strong>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToSelf);
    await transporter.sendMail(mailOptionsToSender);

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(
    `📧 Email service configured with: ${process.env.EMAIL_SERVICE || "gmail"}`
  );
});
