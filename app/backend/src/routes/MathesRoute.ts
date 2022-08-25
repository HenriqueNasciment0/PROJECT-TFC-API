import * as express from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRoute = express.Router();

matchesRoute.get('/matches', MatchesController.getAll);

matchesRoute.post('/matches', MatchesController.create);

matchesRoute.patch('/matches/:id/finish', MatchesController.patchInProgressFalse);

matchesRoute.patch('/matches/:id', MatchesController.patchInProgressGoals);

export default matchesRoute;
