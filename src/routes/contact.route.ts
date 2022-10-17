import express, { Router } from 'express';
import ContactController from '../controllers/contact.controller';
import validate from '../middleware/validate.middleware';
import ContactValidation from '../validations/contact.validate';
import authMiddleware from '../middleware/auth.middleware';

export default class ContactRoutes {
    public router: Router;
    private controller = new ContactController();
    private validation = new ContactValidation();

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.post('/', validate(this.validation.createContact), authMiddleware, this.controller.createContact);
        this.router.get('/', authMiddleware, this.controller.getContacts);
        this.router.get('/search', authMiddleware, this.controller.searchContact);
        this.router.get('/:id', authMiddleware, this.controller.getSingleContact);
        this.router.get('/:id', authMiddleware, this.controller.getSingleContact);
        this.router.patch('/:id', validate(this.validation.editContact), authMiddleware, this.controller.editContact);
        this.router.delete('/:id', authMiddleware, this.controller.deleteContact);
    }
}
