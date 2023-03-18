import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import matchesModel from '../database/models/MatchesModel';
import { allMatchesMock, finishedMatchesMock, inProgressMatchesMock, newMatchMock, newMatchWithNotInDbTeam, newMatchWithSameTeams, returnMatchInProgress, returnMatchNotInProgress, returnNewMatch, updateMatch } from './mocks/Match.mock';
import Match from '../interfaces/IMatch';
import TokenHandler from '../utils/TokenHandler';
import { bodyWithSuccess, tokenMock } from './mocks/User.mock';
import matchesService from '../services/matches.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Seção 3: Matches', () => {
  afterEach(sinon.restore);

  describe('Testes que retornam com sucesso', () => {
    it('É possível retornar todas as partidas', async () => {
      sinon.stub(matchesModel, 'findAll').resolves(allMatchesMock as Match[] | any);
      const { body, status } = await chai.request(app).get('/matches')

      expect(body).to.deep.equal(allMatchesMock);
      expect(status).to.equal(200);
    });

    it('É possível retornar todas as partidas em progresso', async () => {
      sinon.stub(matchesModel, 'findAll').resolves(inProgressMatchesMock as Match[] | any);
      const { body, status } = await chai.request(app).get('/matches?inProgress=true')

      expect(body).to.deep.equal(inProgressMatchesMock);
      expect(status).to.equal(200);
    });

    it('É possível retornar todas as partidas que foram finalizadas', async () => {
      sinon.stub(matchesModel, 'findAll').resolves(finishedMatchesMock as Match[] | any);
      const { body, status } = await chai.request(app).get('/matches?inProgress=false')

      expect(body).to.deep.equal(finishedMatchesMock);
      expect(status).to.equal(200);
    });

    it('É possível criar uma nova partida', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(bodyWithSuccess)

      sinon.stub(matchesModel, 'create').resolves(returnNewMatch as Match | any);
      const { body, status } = await chai.request(app).post('/matches').send(newMatchMock).set({ authorization: token })

      expect(body).to.deep.equal(returnNewMatch);
      expect(status).to.equal(201);
    });

    it('É possível terminar uma partida em andamento', async () => {
      sinon.stub(matchesModel, 'findByPk').resolves(returnMatchInProgress as Match | any);
      sinon.stub(matchesModel, 'update').resolves({id: 42,
        homeTeamId: 5,
        homeTeamGoals: 1,
        awayTeamId: 13,
        awayTeamGoals: 1,
        inProgress: false
      } as Match | any);
      const { body, status } = await chai.request(app).patch('/matches/42/finish');

      expect(body).to.deep.equal({ message: 'Finished' });
      expect(status).to.equal(200);
    });

    it('É possível atualizar uma partida em andamento', async () => {
      sinon.stub(matchesModel, 'findByPk').resolves(returnMatchInProgress as Match | any);
      const { body, status } = await chai.request(app).patch('/matches/6').send(updateMatch as Match | any);

      expect(body).to.deep.equal({ message: 'Match was updated' });
      expect(status).to.equal(200);
    });
  });

  describe('Testes que retornam alguma falha', () => {
    it('Não é possível terminar uma partida já finalizada', async () => {
      sinon.stub(matchesModel, 'findByPk').resolves(returnMatchNotInProgress as Match | any);

      const { body, status } = await chai.request(app).patch('/matches/6/finish');

      expect(body).to.deep.equal({ message: 'This match was already finished' });
      expect(status).to.equal(401);
    });

    it('Não é possível terminar uma partida que não existe', async () => {
      sinon.stub(matchesModel, 'findByPk').resolves(null);

      const { body, status } = await chai.request(app).patch('/matches/220/finish');

      expect(body).to.deep.equal({ message: 'This match was not found' });
      expect(status).to.equal(401);
    });

    it('Não é possível atualizar uma partida que não existe', async () => {
      sinon.stub(matchesModel, 'findByPk').resolves(null);
      const { body, status } = await chai.request(app).patch('/matches/215').send(updateMatch as Match | any);

      expect(body).to.deep.equal({ message: 'Match was not found' });
      expect(status).to.equal(404);
    });

    it('Não é possível inserir uma partida com times iguais', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(bodyWithSuccess)

      const { body, status } = await chai.request(app).post('/matches').send(newMatchWithSameTeams).set({ authorization: token })

      expect(body).to.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
      expect(status).to.equal(422);
    });

    it('Não é possível inserir uma partida com um time inexistente na tabela teams', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(bodyWithSuccess)

      const { body, status } = await chai.request(app).post('/matches').send(newMatchWithNotInDbTeam).set({ authorization: token })

      expect(body).to.deep.equal({ "message": "There is no team with such id!" });
      expect(status).to.equal(404);
    });

    it('Não é possível inserir uma partida com um token inválido', async () => {
      const { body, status } = await chai.request(app).post('/matches').send(newMatchWithNotInDbTeam).set({ authorization: 'tokeninvalido' })

      expect(body).to.deep.equal({ "message": "Token must be a valid token" });
      expect(status).to.equal(401);
    });
  });
});