import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Users from '../database/models/user';
import { Response } from 'superagent';
import ILogin from '../interfaces/ILogin';



chai.use(chaiHttp);

const { expect } = chai;

const loginMock: ILogin = { email: 'sansao@email.com', password: 'cabelo123' }

describe('Testa rota /login', () => {

  describe('Deve retornar', () => {

    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({
          ...loginMock
        } as Users);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginMock)

      expect(chaiHttpResponse.status).to.equal(200);
    });

    it('um token válido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginMock)

      expect(chaiHttpResponse.header).to.have.property('token');
    });

  })
});
