import express, { json, urlencoded, Application, RequestHandler } from 'express';
import Mongoose from 'mongoose';
import Server from './server';
import config from './config/constant';
import cors from 'cors';
import compression from 'compression';

const app: Application = express();
const server: Server = new Server(app, Mongoose, config.port);

const routes: Array<RequestHandler> = [
   
];

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    optionsSuccessStatus: 204,
};

const globalMiddleware: Array<RequestHandler> = [
    urlencoded({ extended: false }),
    json(),
    cors(corsOptions),
    compression(),
];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
        server.loadMiddleware(globalMiddleware);
        server.loadRoutes(routes);
        server.run();
    });