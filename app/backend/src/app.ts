import * as express from 'express';
import userRouter from './routes/user.routes';
import teamsRouter from './routes/teams.routes';
import matchesRouter from './routes/matches.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rotaa
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', userRouter.router);
    this.app.use('/teams', teamsRouter.router);
    this.app.use('/matches', matchesRouter.router);
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
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
