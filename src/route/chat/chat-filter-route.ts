import Route, { Method } from "../Route";
import { Request, Response } from "express";
import Filter from 'bad-words'; 

const filter: Filter = new Filter();

class ChatFilter extends Route {

    constructor() {
        super('/chat');
        this.registerRoute('/filter', Method.POST, this.onChat);
        this.registerRoute('/add', Method.POST, this.addFilteredWord);
    }

    async onChat(req: Request, res: Response) {
        /* sends back the filtered chat message to the client */
        res.json(filter.clean(req.body.message));
    }

    /** 
     * client sends the word(s) to the filter
     */
    private addFilteredWord(req: Request, res: Response) {
        // the new word to be filtered
        const badWord = req.body.word;

        // add the word to the Chat Filter
        filter.addWords(badWord);

        // return a response back to the client
        res.status(200).json(`Successfully added ${badWord} to the Chat Filter!`);
    }
}

export default new ChatFilter();