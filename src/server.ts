import { Application, RequestHandler } from 'express';
import { Mongoose } from 'mongoose';
import http from 'http';
import config from './config/constant';

export default class Server {
    private app: Application;
    private database: Mongoose;
    private readonly port: number;

    constructor(app: Application, database: Mongoose, port: number) {
        this.app = app;
        this.database = database;
        this.port = port;
    }

    public run(): http.Server {
        return this.app.listen(this.port, () => {
            console.log(`The server is running on port ${this.port}`);
        });
    }

    public loadRoutes(routes: Array<RequestHandler>): void {
        routes.forEach((route) => {
            this.app.use('/api/v1/', route);
        });
    }

    public loadMiddleware(middlewares: Array<RequestHandler>): void {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    public async initDatabase(): Promise<void> {
        try {
            await this.database.connect(config.db[config.env === "development" ? "development" : "production"]);
            console.log('Database connected successfully');
        } catch (err) {
            console.error("Could not connect to db", err)
        }
    }
}