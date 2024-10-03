import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class postController {
  constructor() {}

  async createPost(req: Request, res: Response) {
    try {
      const { userId, content, imageUrl } = req.body;
  
      // Verificar o valor de userId
      console.log("Valor recebido de userId:", userId);
  
      // Tente converter userId para um número
      const parsedUserId = parseInt(userId, 10);
      if (isNaN(parsedUserId)) {
        return res.status(400).json({ error: "Invalid userId" });
      }
  
      const newPost = await prisma.post.create({
        data: {
          userId: parsedUserId,
          content: content,
          imageUrl: imageUrl || null,
        },
      });
  
      res.status(201).json({ status: 201, newPost: newPost });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: 400,
        message: "Erro ao criar o post",
        error: error,
      });
    }
  }
}
export default new postController();
