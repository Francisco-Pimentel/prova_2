import { Router } from "express";
import UserController from "../controllers/UserController";

const UserRouter = Router();

// Listar todos os usuários
UserRouter.get("/users", UserController.listUser);

// Inserir um novo usuário
UserRouter.post("/user", UserController.createUser);

// Atualizar um usuário existente
UserRouter.put("/user/:id", UserController.updateUser);

// Deletar um usuário pelo ID
UserRouter.delete("/user/:id", UserController.deleteUser);

export default UserRouter;
