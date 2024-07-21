import express, { Router, Request, Response } from "express";

/**
 *
 * @class Route
 * @description represents a route/end-point in the Nox API
 */
class Route {

    constructor(public basePath: string, public router: Router = express.Router()) {}

    protected registerRoute(path: string, method: Method, callback: (req: Request, res: Response) => void) {
        switch (method) {
            case Method.GET:
                this.router.get(path, (req, res) => callback(req, res));
                break;

            case Method.POST:
                this.router.post(path, (req, res) => callback(req, res));
                break;

            case Method.PUT:
                this.router.put(path, (req, res) => callback(req, res));
                break;

            case Method.DELETE:
                this.router.delete(path, (req, res) => callback(req, res));
                break;
        }
    }
}

enum Method { GET, POST, PUT, DELETE }

export { Method }
export default Route;