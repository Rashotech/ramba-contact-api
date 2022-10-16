import express from 'express';
import AuthRoute from './auth.route';

// API Routes
const routes = (server: express.Application): void => {
    server.use('/api/user', new AuthRoute().router);
};

export default routes;