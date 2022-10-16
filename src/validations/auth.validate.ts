import Joi from "joi";

class AuthValidation {
  public registerValidation = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  public loginValidation = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  public logoutValidation = Joi.object().keys({
    refreshToken: Joi.string().required(),
  });
}

export default AuthValidation;
