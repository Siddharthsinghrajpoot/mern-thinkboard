import express from 'express';
const app = express();
import noteRoute from './routes/note.js';
import cors from "cors";
import { mongoose } from 'mongoose';
import { rateLimiter } from './middleware/rateLimiter.js';
import dotenv from "dotenv"
dotenv.config();





mongoose.connect(
 process.env.MONGO_URI 
);
// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/api/notes', noteRoute);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
