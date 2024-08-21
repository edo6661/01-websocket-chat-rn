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

    await Promise.all([newMessage.save(), conversationExist.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error on sendMessage", error);

    if ((error as any).kind === "ObjectId") {
      res.status(400).json({
        message: "Invalid user id format",
      });
    }
  }
};
export const getMessages: RequestHandler = async (req, res) => {
  try {
    const { userId: userToChatId } = req.params;
    const senderId = (req.user?._id as string).toString();

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    const message =
      userToChatId === senderId
        ? "You can't chat with yourself"
        : conversation?.messages || "No messages yet";

    res.status(200).json({
      message,
    });
  } catch (err) {
    console.error("Error on getMessages", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
