import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import prisma from "../db/prisma.js";
import generateToken from "../utils/generateToken.js";

// Signup controller
export const signup = async (req: Request, res: Response) => {
  try {
    // Destructure the request body
    const { username, fullName, password, confirmPassword, gender } = req.body;

    // Check if any of the required fields are missing
    if (!username || !fullName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the password and confirmPassword fields match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    // If the user already exists, return an error
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate a profile picture for the user based on their gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        fullName,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      //generate jwt token and set it in cookie in the response
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        message: "User created successfully",
      });
    } else {
      res.status(400).json({ error: "User could not be created" });
    }
  } catch (error: any) {
    console.log("Error in signup controller:", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login controller
export const login = async (req: Request, res: Response) => {
  try {
    // Destructure the request body
    const { username, password } = req.body;

    // Check if any of the required fields are missing
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user exists in the database
    const existingUser = await prisma.user.findUnique({ where: { username } });
    // If the user does not exist, return an error
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if the password is valid
    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );

    // If password is not valid, return an error
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //generate jwt token and set it in cookie in the response
    generateToken(existingUser.id, res);

    res.status(200).json({
      id: existingUser.id,
      username: existingUser.username,
      fullName: existingUser.fullName,
      profilePic: existingUser.profilePic,
      message: "User logged in successfully",
    });
  } catch (error: any) {
    console.log("Error in login controller:", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout controller
export const logout = async (req: Request, res: Response) => {
  try {
    //clear the cookie
    res.clearCookie("jwt");
    // res.cookie("jwt", "", { maxAge: 0 }); --> this also works

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error: any) {
    console.log("Error in logout controller:", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get the logged in user controller
export const getMe = async (req: Request, res: Response) => {
  try {
    // Find the user with the id from the request object (set by protectRoute middleware)
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the user data in the response
    res.status(200).json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in getMe controller:", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};
