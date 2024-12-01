// Import required modules
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js"; // Import the sendEmail utility

// Initialize the Express app
const app = express();
const router = express.Router();

// Load environment variables from .env file
config({ path: "./config.env" });

// Middleware for handling CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Allow requests only from the frontend URL
    methods: ["POST"], // Restrict to POST method
    credentials: true, // Allow credentials like cookies
  })
);

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Route to handle sending emails
 * POST /send/mail
 */
router.post("/send/mail", async (req, res, next) => {
  const { name, email, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    // Send email using the sendEmail utility
    await sendEmail({
      email: "your-email@gmail.com", // Recipient email
      subject: "Website Contact Form", // Email subject
      message, // Message content
      userEmail: email, // Sender's email address
    });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Error sending email:", error.message);

    // Respond with an error message
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Use the router
app.use(router);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
