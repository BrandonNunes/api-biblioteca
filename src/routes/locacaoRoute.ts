import { Router } from "express";
import {
  getLocations,
  novaLocacao,
  deleteLocation,
  updateLocation,
} from "../controllers/locacao.controller";
const routerLocacoes = Router();

routerLocacoes.post("/locacao", novaLocacao);

routerLocacoes.get("/locacoes", getLocations);

routerLocacoes.delete("/locacao/:id", deleteLocation);

routerLocacoes.put("/locacao", updateLocation);

export default routerLocacoes;
