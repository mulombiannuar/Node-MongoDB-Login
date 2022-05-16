const Joi = require("joi");

//Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.ref("password"),
  });

  //Validate data
  return schema.validate(data);
};

//Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    confirm_password: Joi.ref("password"),
  });

  //Validate data
  return schema.validate(data);
};

//Updation validation
const updationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
    //email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.ref("password"),
  });

  //Validate data
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.updationValidation = updationValidation;
