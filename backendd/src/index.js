import express from "express";
const app = express();
import noteRoute from "./routes/note.js";
import cors from "cors";
import mongoose from "mongoose";
import { rateLimiter } from "./middleware/rateLimiter.js";
import dotenv from "dotenv";


dotenv.config();



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Enable CORS only in development
  app.use(cors());


// Middleware
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", noteRoute);

// Serve frontend in production




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
