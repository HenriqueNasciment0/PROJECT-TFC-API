import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/team';
import { Response } from 'superagent';




chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
    {
        "id": 1,
        "teamName": "Avaí/Kindermann"
    },
    {
        "id": 2,
        "teamName": "Bahia"
    },
    {
        "id": 3,
        "teamName": "Botafogo"
    },

];

const teamMock = {
    "id": 5,
    "teamName": "Cruzeiro"
};

describe('Testa rota /teams', () => {

    describe('Deve retornar', () => {

        let chaiHttpResponse: Response;

        before(async () => {
            sinon
                .stub(Teams, "findAll")
                .resolves([...teamsMock] as Teams[]);
        });

        after(() => {
            (Teams.findAll as sinon.SinonStub).restore();
        })

        it('status 200', async () => {
            chaiHttpResponse = await chai
                .request(app)
                .post('/teams')
                .send(teamMock)

            expect(chaiHttpResponse.status).to.equal(200);
        });

        it('um token válido', async () => {
            chaiHttpResponse = await chai
                .request(app)
                .post('/teams')
                .send(teamsMock)

            expect(chaiHttpResponse.body).to.equal(teamsMock);
        });

    })

});

describe('Testa rota /teams/:id', () => {

    describe('Deve retornar', () => {

        let chaiHttpResponse: Response;

        before(async () => {
            sinon
                .stub(Teams, "findOne")
                .resolves(teamMock as Teams);
        });

        after(() => {
            (Teams.findAll as sinon.SinonStub).restore();
        })

        it('status 200', async () => {
            chaiHttpResponse = await chai
                .request(app)
                .post('/teams/5')
                .send(teamMock)

            expect(chaiHttpResponse.status).to.equal(200);
        });

        it('um token válido', async () => {
            chaiHttpResponse = await chai
                .request(app)
                .post('/teams/5')
                .send(teamMock)

            expect(chaiHttpResponse.body).to.equal(teamMock);
        });

    });

});
