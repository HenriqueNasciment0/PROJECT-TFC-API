import * as express from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = express.Router();

teamsRouter.get('/teams', TeamsController.getAll);

export default teamsRouter;
