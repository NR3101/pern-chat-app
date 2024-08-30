import express from "express";
import { login, logout, signup, getMe, } from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
router.post("/signup", signup); // signup route
router.post("/login", login); // login route
router.post("/logout", logout); // logout route
// protectRoute middleware is used to protect the route from unauthorized access
router.get("/me", protectRoute, getMe); // getMe route to get the logged in user
export default router;
