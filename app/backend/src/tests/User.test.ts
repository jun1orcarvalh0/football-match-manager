import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import { bodyWithoutEmail, bodyWithoutPassword, bodyWithSuccess, bodyWithWrongEmail, bodyWithWrongPassword, roleMock, tokenMock } from './mocks/User.mock';
import userService from '../services/user.service';
import Token from '../utils/tokenGenerator';

const tokenHandler = new Token();

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

    it('Não é possível entrar sem token em login/validate', async () => {
  
      const { body, status } = await chai.request(app).get('/login/validate')

      expect(body).to.deep.equal({ message: 'Token não enviado' });
      expect(status).to.equal(400);
    });

    it('Não é possível entrar sem token em login/validate', async () => {

      sinon.stub(tokenHandler, 'verifyToken').resolves(null);
  
      const { body, status } = await chai.request(app).get('/login/validate').set('authorization', 'tokeninvalido');

      expect(body).to.deep.equal({ message: 'Token inválido' });
      expect(status).to.equal(401);
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

  describe('Testes com campos corretos', () => {
    it('É possível realizar o login', async () => {
      const token = tokenMock;
  
      sinon.stub(tokenHandler, 'generateToken').resolves(token);
      sinon.stub(userService, 'login').resolves(token)

      const { body, status } = await chai.request(app).post('/login').send(bodyWithSuccess);

      expect(body).to.deep.equal({ token });
      expect(status).to.equal(200);
    });
    it('É possível validar o token pelo login/validate', async () => {
      const token = tokenMock;
      const role = roleMock;

      sinon.stub(tokenHandler, 'verifyToken').resolves('admin');
      sinon.stub(userService, 'getUserRole').resolves('admin')
  
      const { body, status } = await chai.request(app).get('/login/validate').set('authorization', token);

      expect(body).to.deep.equal({ role });
      expect(status).to.equal(200);
    });
  });
});
