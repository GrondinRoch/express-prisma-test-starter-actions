import { StatusCodes } from "http-status-codes";
import CommandeRepository from "./CommandeRepository.js";

export default class CommandeController {
  repository = new CommandeRepository();

  index = async (req, resp, next) => {
    const result = await this.repository.index();
    return resp.status(StatusCodes.OK).json({ commandes: result.commandes });
  };

  store = async (req, resp, next) => {
    const { client, items } = req.body;

    const result = await this.repository.store({ client, items });

    return resp.status(StatusCodes.CREATED).json({ commande: result.commande });
  };
}
