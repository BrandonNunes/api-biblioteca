import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/livro.controller";
const routerLivros = Router();

routerLivros.get("/livros", getBooks);

routerLivros.get("/livros/:id", getBookById);

routerLivros.post("/livros", createBook);

routerLivros.put("/livros", updateBook);

routerLivros.delete("/livros/:id", deleteBook);

export default routerLivros;
