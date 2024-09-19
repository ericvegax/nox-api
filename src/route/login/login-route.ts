import Route, { Method } from "../Route";
import { Request, Response } from "express";
import * as controller from "./login-controller";

class LoginRoute extends Route {
  constructor() {
    super("/login");
    this.registerRoute("/", Method.POST, this.onLogin);
    this.registerRoute("/:uuid", Method.GET, this.getPlayerData);
  }

  onLogin(req: Request, res: Response) {
    const { name, uuid, primaryRank } = req.body;

    controller
      .savePlayer(name, uuid, primaryRank !== null ? primaryRank : "default")
      .then((player) => {
        res.status(200).json(player);
        console.log(`[Login] Saved player data: ${name}`.magenta);
      })
      .catch((error) => res.status(500).json(error));
  }

  getPlayerData(req: Request, res: Response) {
    const playerUUID: string = req.params.uuid;

    controller
      .getPlayer(playerUUID)
      .then((player) => {
        res.status(200).json(player);
        console.log(`[Login] Fetched player data: ${player!.name}`.magenta);
      })
      .catch((error) => res.status(400).json(error));
  }
}

export default new LoginRoute();
