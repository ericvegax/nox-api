import Route, { Method } from "../Route";
import { Request, Response } from "express";

class ChatCommand extends Route {

    private blackListedCommands: string[] = ["icanseebukkit", "pl", "plugins", "op", "reload", "version"];

    constructor() {
        super('/chat');
        this.registerRoute('/command-check', Method.POST, this.onCommand);
    }

    async onCommand(req: Request, res: Response) {
        /** checks whether or not the incoming request contains a black listed command */
        this.blackListedCommands.forEach((cmd) => {
            if (req.params.command === cmd) {
                res.json(true);
            } else {
                res.json(false);
            }
        });
    }
}