import { Request, Response } from "express";
import Genero from "../database/models/genero.model";

export const getGenders = async (req: Request, res: Response) => {
  try {
    const genders = await Genero.findAll();
    return res.json(genders);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
export const createGender = async (req: Request, res: Response) => {
  const { descricao } = req.body;
  try {
    if (descricao === "")
      return res
        .status(400)
        .json({ mensagem: "O genero deve ter uma descricao/nome!" });
    const newGender = await Genero.create(req.body);
    return res
      .status(201)
      .json({ mensagem: "Novo genero adicionado com sucesso!", newGender });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
export const updateGender = async (req: Request, res: Response) => {
  const { id, descricao } = req.body;
  try {
    if (descricao === "")
      return res
        .status(400)
        .json({ mensagem: "O genero deve ter uma descricao/nome!" });
    const verifyGender = await Genero.findByPk(id);
    if (!verifyGender)
      return res.status(404).json({ mensagem: "Genero não encontrado!" });
    const gender = await Genero.update({ descricao }, { where: { id } });
    return res
      .status(201)
      .json({ mensagem: "Genero Atualizado com sucesso!", gender });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
export const deleteGender = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id === "")
      return res
        .status(400)
        .json({ mensagem: "Um genero deve ser fornecido!" });
    const verifyGender = await Genero.findByPk(id);
    if (!verifyGender)
      return res.status(404).json({ mensagem: "Genero não encontrado!" });
    await Genero.destroy({ where: { id } });
    return res
      .status(200)
      .json({ mensagem: "O genero foi excluido com sucesso!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
