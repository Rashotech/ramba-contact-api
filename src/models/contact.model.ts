import mongoose, { Schema, model } from "mongoose";
import { IContact } from '../interfaces/contact.interface';

// A Schema corresponding to the document interface.
const contactSchema: Schema<IContact> = new Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// name field search index
contactSchema.index({ name: 'text' });

// Contact Model
const Contact = model<IContact>("Contact", contactSchema);

export default Contact;
