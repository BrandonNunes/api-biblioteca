import Locacao from "../database/models/locacoes.model";
import { Request, Response } from "express";
import Aluno from "../database/models/aluno.model";
import Livro from "../database/models/livro.model";
import { Model } from "sequelize";

export const novaLocacao = async (req: Request, res: Response) => {
  const { id_livro, id_aluno } = req.body;
  if (!id_aluno)
    return res.status(400).json({ mensagem: "Um aluno deve ser informado!" });
  if (!id_livro)
    return res.status(400).json({ mensagem: "Um livro deve ser informado!" });
  try {
    const livro: any = await Livro.findByPk(id_livro);
    if (livro.qtd_disponivel === 0) {
      return res.status(400).json({ mensagem: "Não há livros disponíveis!" });
    }
    const newLocation = await Locacao.create(req.body);
    await Livro.update(
      { qtd_disponivel: livro.qtd_disponivel - 1 },
      { where: { id: id_livro } }
    );
    return res
      .status(201)
      .json({ mensagem: "Locação criada com sucesso!", locacao: newLocation });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", erro: e });
  }
};
export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Locacao.findAll({
      include: [Aluno, Livro],
      attributes: { exclude: ["id_livro", "id_aluno"] },
    });
    return res.status(200).json(locations);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", erro: e });
  }
};
export const deleteLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Locacao.destroy({ where: { id } });
    return res.status(202).json({ mensagem: "Locação excluida com sucesso!" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", erro: e });
  }
};
export const updateLocation = async (req: Request, res: Response) => {
  const { id, data_devolucao, status } = req.body;
  try {
    const location: any = await Locacao.findByPk(id, {
      include: [Livro],
    });
    if (status == 1) {
      await Livro.update(
        {
          qtd_disponivel:
            Number(location.dataValues.livro.dataValues.qtd_disponivel) + 1,
        },
        { where: { id: location.dataValues.id_livro } }
      );
    }
    await Locacao.update({ data_devolucao, status }, { where: { id } });
    return res
      .status(202)
      .json({ mensagem: "Locação atualizada com sucesso!" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", erro: e });
  }
};
