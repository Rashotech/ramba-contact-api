import express from 'express';
import AuthRoute from './auth.route';
import ContactRoute from './contact.route';

// API Routes
const routes = (server: express.Application): void => {
    server.use('/api/user', new AuthRoute().router);
    server.use('/api/contact', new ContactRoute().router);
};

export default routes;