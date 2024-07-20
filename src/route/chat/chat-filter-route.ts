import Route, { Method } from "../Route";
import { Request, Response } from "express";
import Filter from 'bad-words'; 

const filter: Filter = new Filter();

class ChatFilter extends Route {

    constructor() {
        super('/chat');
        this.registerRoute('/filter', Method.POST, this.onChat);
    }

    async onChat(req: Request, res: Response) {
        /* sends back the filtered chat message to the client */
        res.json(filter.clean(req.body.message));
    }
}

export default new ChatFilter();