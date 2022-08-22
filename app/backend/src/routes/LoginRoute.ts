import * as express from 'express';
import verifyJWT from '../auth/JWTVerify';
import LoginController from '../controllers/LoginController';

const loginRouter = express.Router();

loginRouter.post('/login', LoginController.verifyEmailUser);

loginRouter.get('/login/validate', verifyJWT);

export default loginRouter;
