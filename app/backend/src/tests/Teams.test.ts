import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import teamsModel from '../database/models/TeamsModel';
import { team, teams } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe.skip('Testes da Seção 2: Teams', () => {
  afterEach(sinon.restore);

  describe('Teste que retorna falha', () => {
    it('Não é possível retornar um time que não exista', async () => {
      sinon.stub(teamsModel, 'findByPk').resolves(null);
      const { body, status } = await chai.request(app).get('/teams/:id').query({ id: '19' });

      expect(body).to.deep.equal({ message: 'Time não encontrado' });
      expect(status).to.equal(404);
    });
  });

  describe('Testes que retornam com sucesso', () => {
    it('É possível retornar todos os times', async () => {
      sinon.stub(teamsModel, 'findAll').resolves(teams as teamsModel[]);
      const { body, status } = await chai.request(app).get('/teams').query({ id: '4' });

      expect(body).to.deep.equal(teams);
      expect(status).to.equal(200);
    });

    it('É possível retornar um time que exista', async () => {
      sinon.stub(teamsModel, 'findByPk').resolves(team as teamsModel);
      const { body, status } = await chai.request(app).get('/teams/:id').query({ id: '4' });

      expect(body).to.deep.equal(team);
      expect(status).to.equal(200);
    });
  });
});