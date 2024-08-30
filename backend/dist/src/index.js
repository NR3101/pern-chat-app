import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
dotenv.config(); //to read .env file
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); // to get the current directory path for serving static files
app.use(cookieParser()); //to parse cookies in the request headers
app.use(express.json()); //to parse json data in the request body
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //to allow cross-origin requests
//routes for auth and messages
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
// Serve static assets if in production
if (process.env.NODE_ENV !== "development") {
    // Set static folder for frontend assets
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    // for any route other than the api routes, serve the index.html file
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
server.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
