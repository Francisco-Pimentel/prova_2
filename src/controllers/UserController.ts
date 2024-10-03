import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  constructor() {}

  // Listar todos os usuários
  async listUser(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error,
      });
    }
  }

  // Criar um novo usuário
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, profile_image, bio } = req.body;

      // Verifica se o email e a senha foram passados
      if (!email || !password) {
        return res.status(400).json({
          status: 400,
          message: "Você precisa passar o email e a senha no corpo da requisição",
        });
      }

      // Cria um novo usuário com os dados fornecidos
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          profileImage: profile_image || null,
          bio: bio || null,
        },
      });

      res.json({
        status: 200,
        newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  // Atualizar um usuário existente
  async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name, email, password, profile_image, bio } = req.body;

      // Atualiza o usuário com base no ID
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password,
          profileImage: profile_image,
          bio,
        },
      });

      res.json({
        status: 200,
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  // Deletar um usuário pelo ID
  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      await prisma.user.delete({
        where: { id },
      });

      res.status(200).json({
        status: 200,
        message: "Usuário deletado com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Falha ao deletar o registro",
      });
    }
  }
}

export default new UserController();

