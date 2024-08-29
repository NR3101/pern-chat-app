import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js";

const app = express();

dotenv.config(); //to read .env file

app.use(cookieParser()); //to parse cookies in the request headers
app.use(express.json()); //to parse json data in the request body
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //to allow cross-origin requests

//routes for auth and messages
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
