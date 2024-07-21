import Route, { Method } from "../Route";
import { Request, Response } from "express";
import * as controller from "./login-controller";

class LoginRoute extends Route {

    constructor() {
        super('/login');
        this.registerRoute('/', Method.POST, this.onLogin);
    }

    onLogin(req: Request, res: Response) {
        const { name, uuid } = req.body;

        controller.savePlayer(name, uuid)
        .then((player) => res.status(200).json([player, {uuid: player?.uuid}]))
        .catch((error) => res.status(500).json(error));
    }
}

export default new LoginRoute();