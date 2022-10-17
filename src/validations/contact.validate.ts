import Joi from "joi";

class ContactValidation {
  public createContact = Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().required(),
  });

  public editContact = Joi.object().keys({
    name: Joi.string(),
    phone: Joi.string()
  });
}

export default ContactValidation;
