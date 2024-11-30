import express from "express";
import cors from "cors";

const app = express();
const router = express.Router();

// Middleware
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail", async (req, res, next) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return next(
        res.status(400).json({
          success: false,
          message: "Please provide all details",
        })
      );
    }
    try {
      await sendEmail({
        email: "saagor.16@gmail.com",
        subject: "GYM WEBSITE CONTACT",
        message,
        userEmail: email,
      });
      res.status(200).json({
        success: true,
        message: "Message Sent Successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: " Internal Server Error",
      });
    }
  });


app.use(router);

// Set PORT directly in the code
const PORT = 3000; // Replace 3000 with your desired port

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
