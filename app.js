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
  

// Define a test route
router.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/", router);

// Set PORT directly in the code
const PORT = 3000; // Replace 3000 with your desired port

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
