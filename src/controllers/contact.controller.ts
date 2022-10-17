import { Response, NextFunction } from "express";
import { IContact } from "../interfaces/contact.interface";
import httpStatus from "http-status";
import ContactService from "../services/contact.service";
import responseMessage from "../helpers/responseMessage";
import { AuthRequest } from '../interfaces/user.interface';

export default class ContactController {
  // Create Contact
  async createContact(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const contactBody: IContact = req.body;
      const { name, phone } = contactBody;
      const contact = await ContactService.createContact(name, phone, req.user!);
      return res
        .status(httpStatus.CREATED)
        .send(responseMessage("Contact Created Successfully", contact));
    } catch (error) {
      next(error);
    }
  }

  // Get Contacts
  async getContacts(req: AuthRequest, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page!) ? parseInt(req.query.page!) : 1;
    const limit = parseInt(req.query.limit!) ? parseInt(req.query.limit!) : 10;
    try {
      const contacts = await ContactService.getContacts(req.user!, page, limit);
      return res
        .status(httpStatus.OK)
        .send(responseMessage("Contacts fetched", contacts));
    } catch (error) {
      next(error);
    }
  }

  // Get Contacts
  async getSingleContact(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const contacts = await ContactService.getSingleContact(req.user!, req.params.id!);
      return res
        .status(httpStatus.OK)
        .send(responseMessage("Contact fetched", contacts));
    } catch (error) {
      next(error);
    }
  }

  // Search Contacts
  async searchContact(req: AuthRequest, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page!) ? parseInt(req.query.page!) : 1;
    const limit = parseInt(req.query.limit!) ? parseInt(req.query.limit!) : 10;
    try {
      const contacts = await ContactService.searchContact(req.user!, req.query.searchTerm!, page, limit);
      return res
        .status(httpStatus.OK)
        .send(responseMessage("Contact fetched", contacts));
    } catch (error) {
      next(error);
    }
  }

   // Update Contact
   async editContact(req: AuthRequest, res: Response, next: NextFunction) {
    const contactBody: IContact = req.body;
    try {
      const contact = await ContactService.editContact(req.user!, req.params.id!, contactBody);
      return res
        .status(httpStatus.OK)
        .send(responseMessage("Contact Updated Successfully", contact));
    } catch (error) {
      next(error);
    }
  }

  // Delete Contact
  async deleteContact(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await ContactService.deleteContact(req.user!, req.params.id!);
      return res
        .status(httpStatus.OK)
        .send(responseMessage("Contact Deleted Successfully"));
    } catch (error) {
      next(error);
    }
  }
}
