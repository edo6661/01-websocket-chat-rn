import { getMessages, sendMessage } from "@/controllers/message.controller";
import { protectedRoute } from "@/middlewares/protectedRoute";
import { Router } from "express";

const router = Router();
router.get("/:userId", protectedRoute, getMessages);
router.post("/send/:userId", protectedRoute, sendMessage);

export default router;
