import { Router } from "express";
import {
  createGender,
  deleteGender,
  getGenders,
  updateGender,
} from "../controllers/genero.controller";
const routerGeneros = Router();

routerGeneros.get("/generos", getGenders);

routerGeneros.post("/generos", createGender);

routerGeneros.put("/generos", updateGender);

routerGeneros.delete("/generos/:id", deleteGender);

export default routerGeneros;
