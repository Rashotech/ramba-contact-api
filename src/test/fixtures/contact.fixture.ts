import Contact from '../../models/contact.model';
import { IContact } from '../../interfaces/contact.interface';

const testContact: IContact = {
    name: "Adebayo Ola",
    phone: "+2348122880099"
};

const contactOne: IContact = {
    name: "Adelabu Ola",
    phone: "+2348122880090"
};

const contactTwo: IContact = {
    name: "Bola Ola",
    phone: "+2348122880091"
};

const insertContacts = async (contacts: IContact[], userID: string) => {
    await Contact.insertMany(contacts.map((user) => ({ ...user, user: userID })));
};

const insertContact = async (contact: IContact, userID: string) => {
    const result = await Contact.create({ ...contact, user: userID});
    return result;
};

export {
    testContact,
    contactOne,
    contactTwo,
    insertContacts,
    insertContact
};