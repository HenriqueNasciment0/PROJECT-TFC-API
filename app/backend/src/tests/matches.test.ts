import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/match';
import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

const matcheMock = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },

    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    }
  ]

describe('Testa rota /matches', () => {

  describe('Deve retornar', () => {

    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves([ ...matcheMock ] as Matches[]);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(matcheMock)

      expect(chaiHttpResponse.status).to.equal(200);
    });

    it('um array de partidas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(matcheMock)

      expect(chaiHttpResponse.body).to.equal(matcheMock);
    });

  })
});

describe('testa rota /matches/:id/finish', () => {
    describe('Deve retornar', () => {

        let chaiHttpResponse: Response;

        before(async () => {
          sinon
            .stub(Matches, "update")
            .resolves();
        });

        after(() => {
          (Matches.update as sinon.SinonStub).restore();
        })

        it('status 200', async () => {
          chaiHttpResponse = await chai
            .request(app)
            .post('/matches/1/finish')
            .send(matcheMock)

          expect(chaiHttpResponse.status).to.equal(200);
        });

        it('um array de partidas', async () => {
          chaiHttpResponse = await chai
            .request(app)
            .post('/matches/1/finish')
            .send(matcheMock)

            const message = { message: 'Finished' };

          expect(chaiHttpResponse.body).to.equal(message);
        });

      })
})
