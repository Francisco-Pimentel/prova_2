import { Router } from "express";
import PostController from "../controllers/postController"; // ajuste o caminho conforme necessário

const PostRouter = Router();

// Criar um novo post
PostRouter.post("/post", PostController.createPost);

export default PostRouter;
