import { Router } from "express";
import {
  createNewStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../controllers/aluno.controller";
const routerAlunos = Router();

routerAlunos.get("/alunos", getStudents);

routerAlunos.get("/alunos/:id", getStudentById);

routerAlunos.post("/alunos", createNewStudent);

routerAlunos.put("/alunos", updateStudent);

routerAlunos.delete("/alunos/:id", deleteStudent);

export default routerAlunos;
