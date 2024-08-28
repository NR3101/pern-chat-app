import e, { Request, Response } from "express";
import prisma from "../db/prisma.js";

// send message to a user by id (receiver)
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body; // get message from request body
    const { id: receiverId } = req.params; // get receiver id from request params
    const senderId = req.user.id; // get sender id from request user object

    // find if a conversation already exists between sender and receiver
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantsIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    // if conversation does not exist, create a new conversation
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantsIds: [senderId, receiverId],
        },
      });
    }

    // create a new message for either new or existing conversation
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    // if message is created, connect and add it to the conversation
    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    // TODO : add socket.io to emit message to receiver

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get messages from a conversation by id
export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id: userToChatWithId } = req.params; // get receiver id from request params
    const senderId = req.user.id; // get sender id from request user object

    // find if a conversation already exists between sender and receiver
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantsIds: {
          hasEvery: [senderId, userToChatWithId],
        },
      },
      include: {
        // include messages in the conversation order by createdAt in ascending order
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    // if conversation does not exist, return empty array
    if (!conversation) {
      return res.status(200).json([]);
    }

    // if conversation exists, return messages
    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.error("Error in getMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get users for sidebar (conversations)
export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user.id; // get authenticated user id

    // find all users except the authenticated user
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });

    res.status(200).json(users); // return users
  } catch (error: any) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
