import Route, { Method } from "../Route";
import { Request, Response } from "express";
import Filter from 'bad-words'; 

class ChatFilter extends Route {

    private filter: Filter = new Filter();

    constructor() {
        super('/chat');
        this.registerRoute('/filter', Method.POST, this.onChat);
    }

    async onChat(req: Request, res: Response) {
        /* sends back the filtered chat message to the client */
        res.json(this.filter.clean(req.body.message));
    }
}

export default new ChatFilter();