import * as express from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = express.Router();

teamsRouter.get('/teams', TeamsController.getAll);

teamsRouter.get('/teams/:id', TeamsController.findById);

export default teamsRouter;
