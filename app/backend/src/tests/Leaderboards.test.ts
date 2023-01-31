import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import teamsModel from '../database/models/TeamsModel';
import { team, teams } from './mocks/Team.mock';
import { homeLeaderboard, homeTeamMatchesMock } from './mocks/Leaderboard.mock';
import Matches from '../database/models/MatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Seção 4: Leaderboards', () => {
  afterEach(sinon.restore);

  describe('Testes que retornam com sucesso', () => {
    it.skip('É possível retornar todos os times com a classificação da casa', async () => {
      const { body, status } = await chai.request(app).get('/leaderboard/home');

      expect(body).to.deep.equal(homeLeaderboard);
      expect(status).to.equal(200);
    });
  });
});