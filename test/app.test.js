const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

describe('app', () => {
    describe('GET /api/greet/:name', () => {
        context('given a valid name', () => {
            it('should return a greeting message with name', (done) => {
                const name = 'heanzy';
                request(app)
                    .get(`/api/greet/${name}`)
                    .end((err, res) => {
                        if(err) return done(err);

                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.be.equal(`Hi, ${name}!`);

                        return done();
                    });
            });
        });
        context('given an invalid name', () => {
            it('should return an error', (done) => {
                const name = '12345';
                request(app)
                    .get(`/api/greet/${name}`)
                    .end((err, res) => {
                        if(err) return done(err);

                        expect(res.status).to.be.equal(422);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error).to.be.equal('Invalid Name');

                        return done();
                    });
            });
        });
    });
});