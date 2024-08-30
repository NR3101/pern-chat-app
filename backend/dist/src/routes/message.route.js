import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { sendMessage, getMessage, getUsersForSidebar, } from "../controllers/message.controller.js";
const router = express.Router();
// route to get users for sidebar (conversations)
router.get("/conversations", protectRoute, getUsersForSidebar);
// route to get messages from a conversation by id
router.get("/:id", protectRoute, getMessage);
// route to send message to a user by id
router.post("/send/:id", protectRoute, sendMessage);
export default router;
