import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentController {
  constructor() {}

  // Listar comentários de um post
  async listComments(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.postId);
      const comments = await prisma.comment.findMany({
        where: {
          postId: postId,
        },
        include: {
          user: true, // Incluir informações do usuário (opcional)
        },
      });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar comentários." });
    }
  }

  // Criar um novo comentário
  async createComment(req: Request, res: Response) {
    try {
      const { postId, userId, content } = req.body;

      const newComment = await prisma.comment.create({
        data: {
          postId: parseInt(postId),
          userId: parseInt(userId),
          content: content,
        },
      });

      res.status(201).json({
        status: 201,
        newComment: newComment,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Erro ao criar comentário." });
    }
  }

  // Atualizar um comentário
  async updateComment(req: Request, res: Response) {
    try {
      const commentId = parseInt(req.params.id);
      const { content } = req.body;

      const updatedComment = await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          content: content,
        },
      });

      res.json({
        status: 200,
        updatedComment: updatedComment,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Erro ao atualizar comentário." });
    }
  }

  // Deletar um comentário
  async deleteComment(req: Request, res: Response) {
    try {
      const commentId = parseInt(req.params.id);

      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Comentário deletado com sucesso.",
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Erro ao deletar comentário." });
    }
  }
}

export default new CommentController();
