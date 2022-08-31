import * as express from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const LBRouter = express.Router();

LBRouter.get('/leaderboard/home', LeaderBoardController.getAll);

export default LBRouter;
