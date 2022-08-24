import * as express from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRoute = express.Router();

matchesRoute.get('/matches', MatchesController.getAll);

export default matchesRoute;
