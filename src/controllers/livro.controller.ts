import { Request, Response } from "express";
import Livro from "../database/models/livro.model";
import Genero from "../database/models/genero.model";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Livro.findAll({ include: Genero });
    return res.json(books);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Livro.findOne({ include: Genero, where: { id } });
    if (!book) return res.json({ mensagem: "Nenhum livro encontrado!" });
    return res.json(book);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = await Livro.create(req.body);
    return res
      .status(201)
      .json({ mensagem: "Livro adicionado com sucesso!", newBook });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  let {
    id,
    autor,
    id_genero,
    estante,
    prateleira,
    quantidade,
    qtd_disponivel,
  } = req.body;
  try {
    const verifyBook: any = await Livro.findByPk(id);
    if (!verifyBook) {
      return res.status(404).json({ mensagem: "Livro não encontrado!" });
    }
    let compare = Number(verifyBook.quantidade) - Number(quantidade);
    console.log(compare);
    if (compare != 0) {
      let newValor = Number(verifyBook.qtd_disponivel) - Number(compare);
      if (newValor < 0) {
        qtd_disponivel = 0;
      } else {
        qtd_disponivel = newValor;
      }
    }
    await Livro.update(
      { autor, id_genero, estante, prateleira, quantidade, qtd_disponivel },
      { where: { id } }
    );
    return res.status(202).json({ mensagem: "Livro atualizado com sucesso!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const verifyBook = await Livro.findByPk(id);
    if (!verifyBook)
      return res.status(404).json({ mensagem: "Livro não encontrado!" });
    await Livro.destroy({ where: { id } });
    return res.status(202).json({ mensagem: "Livro excluído com sucesso!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
