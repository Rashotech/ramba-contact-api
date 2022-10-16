import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import validate from '../middleware/validate.middleware';
import AuthValidation from '../validations/auth.validate';

export default class AuthRoutes {
    public router: Router;
    private controller = new AuthController();
    private validation = new AuthValidation();

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.post('/signup', validate(this.validation.registerValidation), this.controller.register);
        this.router.post('/signin', validate(this.validation.loginValidation), this.controller.login);
        this.router.post('/logout', validate(this.validation.logoutValidation), this.controller.logout);
    }
}
