import Route, { Method } from "../Route";
import { Request, Response } from "express";
import * as controller from "./login-controller";

class LoginRoute extends Route {

    constructor() {
        super('/login');
        this.registerRoute('/', Method.POST, this.onLogin);
    }

    onLogin(req: Request, res: Response) {
        const { name, uuid, primaryRank } = req.body;

        controller.savePlayer(name, uuid, (primaryRank !== null ? primaryRank : "default"))
        .then((player) => res.status(200).json(player))
        .catch((error) => res.status(500).json(error));
        console.log(`[Login] Fetched player data: ${name}`.magenta);
    }
}

export default new LoginRoute();