import express from "express";
import comentController from "../controllers/comentController";

const router = express.Router();

// Rotas para comentários
router.get("/posts/:postId/comments", comentController.listComments);
router.post("/comments", comentController.createComment);
router.put("/comments/:id", comentController.updateComment);
router.delete("/comments/:id", comentController.deleteComment);

export default router;
