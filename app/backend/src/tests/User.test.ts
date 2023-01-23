import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import { bodyWithoutEmail, bodyWithoutPassword, bodyWithWrongEmail, bodyWithWrongPassword } from './mocks/User.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Seção 1: Users e Login', () => {
  afterEach(sinon.restore);

  describe('Testes com campos faltando', () => {

    it('Não é possível realizar login sem o campo "email"', async () => {

      const { body, status } = await chai.request(app).post('/login').send(bodyWithoutEmail);

      expect(body).to.deep.equal({ 'message': 'All fields must be filled' });
      expect(status).to.equal(400);
    });

    it('Não é possível realizar login sem o campo "password"', async () => {

      const { body, status } = await chai.request(app).post('/login').send(bodyWithoutPassword);

      expect(body).to.deep.equal({ 'message': 'All fields must be filled' });
      expect(status).to.equal(400);
    });
  });

  describe('Testes com campos inválidos', () => {

    it('Não é possível realizar login sem o campo "email"', async () => {

      const { body, status } = await chai.request(app).post('/login').send(bodyWithWrongEmail);

      expect(body).to.deep.equal({ 'message': 'Incorrect email or password' });
      expect(status).to.equal(401);
    });

    it('Não é possível realizar login sem o campo "password"', async () => {

      const { body, status } = await chai.request(app).post('/login').send(bodyWithWrongPassword);

      expect(body).to.deep.equal({ 'message': 'Incorrect email or password' });
      expect(status).to.equal(401);
    });
  });
});
