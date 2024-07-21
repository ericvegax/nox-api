import express, { Router } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import "colors";
import * as routes from './routes';

export class Server {
    
    constructor(private app: express.Application = express(), private port: number = parseInt(process.env.API_PORT!) || 3000) {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
    }

    public setRoutes() {
        const router: Router = express.Router();

        /* Router initializer */
        Object.entries(routes).forEach(([name, route]) => router.use(route.basePath, route.router));
        this.app.use('/api', router);
    }

    public startServer = () => this.app.listen(this.port, () => console.log(`[Nox API] Server started on port ${this.port}`.green));
}