import Conversation from "@/models/conversation.model";
import Message from "@/models/message.model";
import User from "@/models/user.model";
import { RequestHandler } from "express";

export const sendMessage: RequestHandler = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!message) {
      res.status(400).json({
        message: "Message is required",
      });
      return;
    }
    const receiverExist = await User.findById(receiverId);
    if (!receiverExist) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

    let conversationExist = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    if (!conversationExist) {
      conversationExist = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (!newMessage) {
      res.status(400).json({
        message: "Failed to create message",
      });
      return;
    }

    conversationExist.messages.push(newMessage._id);

    res.status(201).json({
      message: "Message sent",
    });
  } catch (error) {
    console.error("Error on sendMessage", error);

    if (error instanceof Error && (error as any).kind === "ObjectId") {
      res.status(400).json({
        message: "Invalid user id format",
      });
    }
  }
};
