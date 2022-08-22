import * as joi from 'joi';
import CustomError from '../utils/CustomError';

function validationLogin(email: string, password: string) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(7),
  });

  const schemaValidate = schema.validate({ email, password });

  if (schemaValidate.error) {
    throw new CustomError(400, 'All fields must be filled');
  }
}

export default validationLogin;
