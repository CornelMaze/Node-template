const Joi = require("joi");

const validateBody = (schema) => {
 return (req, res, next) => {
  // console.log(req.body);
  const result = schema.validate(req.body);
  // console.log(result);
  if (result.error) {
   return res.status(400).json(result.error);
  }

  if (!req.value) {
   req.value = {};
  }
  req.value["body"] = result.value;
  next();
 };
};
const schemas = Joi.object().keys({
 email: Joi.string().email().required(),
 password: Joi.string().required(),
});
// const schemas = {
//  authSchema: Joi.object().keys({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
//  }),
// };

module.exports = { validateBody, schemas };
