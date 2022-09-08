import Aluno from "../database/models/aluno.model";
import { Request, Response } from "express";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Aluno.findAll();
    return res.json({ students });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id === "")
      return res
        .status(404)
        .json({ mensagem: "Um ID de aluno válido deve ser fornecido!" });
    const student = await Aluno.findByPk(id);
    if (!student)
      return res.status(404).json({ mensagem: "Aluno não encontrado!" });
    return res.json({ student });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export const createNewStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = await Aluno.create(req.body);
    return res
      .status(201)
      .json({ mensagem: "Aluno inserido com sucesso!", newStudent });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id, nome, ano, turma, telefone } = req.body;
  try {
    const student = await Aluno.findByPk(id);
    if (!student)
      return res.status(404).json({ mensagem: "Aluno não encontrado!" });
    await Aluno.update({ nome, ano, turma, telefone }, { where: { id } });
    return res.json({ mensagem: "Aluno atualizado com sucesso!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const student = await Aluno.findByPk(id);
    if (!student)
      return res.status(404).json({ mensagem: "Aluno não encontrado!" });
    await Aluno.destroy({ where: { id } });
    return res.status(202).json({ mensagem: "Aluno excluído com sucesso" });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
