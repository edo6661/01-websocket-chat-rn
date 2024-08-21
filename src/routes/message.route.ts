import { sendMessage } from "@/controllers/message.controller";
import { protectedRoute } from "@/middlewares/protectedRoute";
import { Router } from "express";

const router = Router();
router.post("/send/:userId", protectedRoute, sendMessage);

export default router;
