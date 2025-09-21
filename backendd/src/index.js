import express from "express";
const app = express();
import noteRoute from "./routes/note.js";
import cors from "cors";
import mongoose from "mongoose";
import { rateLimiter } from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Enable CORS only in development
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

// Middleware
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", noteRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/vite-project/dist");
  app.use(express.static(frontendPath));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
