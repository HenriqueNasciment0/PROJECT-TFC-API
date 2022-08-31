import * as express from 'express';
import LBRouter from './routes/LeaderBoardRoute';
import loginRouter from './routes/LoginRoute';
import matchesRoute from './routes/MathesRoute';
import teamsRouter from './routes/TeamsRoute';
import middlewareError from './utils/middlewareError';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use(loginRouter);

    this.app.use(teamsRouter);

    this.app.use(matchesRoute);

    this.app.use(LBRouter);

    this.app.use(middlewareError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
