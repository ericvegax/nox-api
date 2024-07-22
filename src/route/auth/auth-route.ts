import Route, { Method } from "../Route";
import { Request, Response } from "express";
import { createHash } from 'crypto';

class AuthRoute extends Route {

    constructor() {
        super('/auth');
        this.registerRoute('/offline', Method.POST, this.isOffline);
    }

    isOffline(req: Request, res: Response) {
        const { name, uuid } = req.body;
        const offlineUUID: string = this.getHash(`OfflinePlayer:${name}`);

        if (offlineUUID === uuid) { // is offline
            return true;
        }
        return false;
    }

    getHash(input: string): string {
        return createHash('sha256').update(input).digest('hex');
    }
}