import httpStatus from 'http-status';
import ApiError from '../helpers/ApiError';
import { IContact } from '../interfaces/contact.interface';
import Contact from '../models/contact.model';

export default class ContactService {
	// Create Contact
	public static async createContact(name: string, phone: string, user: string): Promise<IContact> {
		const contactBody = {
			name,
			phone,
			user
		}

		const contact = await Contact.create(contactBody);
		return contact;
	}

	// Get Contacts
	public static async getContacts(user: string, page: number, limit: number): Promise<IContact[]> {
		const contacts = await Contact.find({ user })
			.sort({ name: "asc" })
			.skip((page - 1) * limit)
			.limit(limit);
		return contacts;
	}

	// Get Single Contact
	public static async getSingleContact(user: string, contactId: string): Promise<IContact> {
		const contact = await Contact.findOne({ user, _id: contactId });
		if (!contact) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Contact does not exist");
		}
		return contact;
	}

	// Edit Contact
	public static async editContact(user: string, contactId: string, contactBody: IContact): Promise<IContact> {
		const contact = await Contact.findOneAndUpdate(
			{ _id: contactId, user },
			contactBody,
			{ new: true }
		);
		if (!contact) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Unable to edit");
		}
		return contact;
	}

	// Delete Contact
	public static async deleteContact(user: string, contactId: string): Promise<void> {
		const contact = await Contact.findOneAndDelete({ _id: contactId, user },);
		if (!contact) {
			throw new ApiError(httpStatus.NOT_FOUND, "Not Found");
		}
	}

	// Search Contact
	public static async searchContact(user: string, searchTerm: string, page: number, limit: number): Promise<IContact[]> {
		if (!searchTerm) throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "Search Term required");
		const search_results = await Contact.find(
			{ user, $text: { $search: searchTerm } },
			{ score: { $meta: "textScore" } }
		)
			.sort(
				{ score: { $meta: "textScore" } }
			)
			.skip((page - 1) * limit)
			.limit(limit);

		return search_results;
	}
}