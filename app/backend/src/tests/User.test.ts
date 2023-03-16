import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import UserModel from '../database/models/UserModel';
import { bodyWithoutEmail, bodyWithoutPassword, bodyWithSuccess, bodyWithWrongEmail, bodyWithWrongPassword, rightUser, roleMock, tokenMock } from './mocks/User.mock';

import { Response } from 'superagent';

import * as jwt from 'jsonwebtoken';
import userService from '../services/user.service';
import IUser from '../interfaces/IUser';
import TokenHandler from '../utils/TokenHandler';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da Seção 1: Users e Login', () => {
  afterEach(sinon.restore);

  describe('Testes com campos corretos', () => {
    beforeEach(sinon.restore)
    it('É possível realizar o login', async () => {
      sinon.stub(UserModel, 'findOne').resolves(rightUser as any)
      // sinon.stub(userService, 'validateUser').resolves(rightUser as any);;

      const { body, status } = await chai.request(app).post('/login').send(bodyWithSuccess);

      expect(body).to.haveOwnProperty('token');
      expect(status).to.equal(200);
    });
    it('É possível validar o token pelo login/validate', async () => {
      sinon.stub(UserModel, 'findOne').resolves(rightUser as any)
      const { body: { token } } = await chai.request(app).post('/login').send(bodyWithSuccess);

      const { body, status } = await chai.request(app).get('/login/validate').set({ authorization: token });

      expect(body).to.deep.equal({ role: 'user' });
      expect(status).to.equal(200);
    });
  });

  describe.skip('Testes com campos faltando', () => {

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

    it('Não é possível entrar sem token em login/validate', async () => {
  
      const { body, status } = await chai.request(app).get('/login/validate')

      expect(body).to.deep.equal({ message: 'Token not found' });
      expect(status).to.equal(400);
    });

    it('Não é possível entrar sem token um token válido em login/validate', async () => {

      sinon.stub(TokenHandler, 'verifyToken').resolves(null);
  
      const { body, status } = await chai.request(app).get('/login/validate').set('authorization', 'tokeninvalido');

      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
      expect(status).to.equal(401);
    });
  });

  describe.skip('Testes com campos inválidos', () => {

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
