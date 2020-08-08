/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const faker = require('faker');
const app = require('../src/app');

describe('app', () => {
    describe('GET /api/greet/:name', () => {
        context('given a valid name', () => {
            it('should return a greeting message with name', (done) => {
                const name = 'heanzy';
                request(app)
                    .get(`/api/greet/${name}`)
                    .end((err, res) => {
                        if (err) return done(err);

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
                        if (err) return done(err);

                        expect(res.status).to.be.equal(422);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error).to.be.equal('Invalid Name');

                        return done();
                    });
            });
        });
        context('given a non-existing name', () => {
            it('should return an error', (done) => {
                const name = faker.name.firstName();
                request(app)
                    .get(`/api/greet/${name}`)
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(res.status).to.be.equal(404);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error).to.be.equal('Who are you again?');

                        return done();
                    });
            });
        });
    });
    describe('POST /api/greet', () => {
        context('given a valid name', () => {
            it('should save name', (done) => {
                const name = faker.name.firstName();
                request(app)
                    .post('/api/greet')
                    .send({ name })
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(res.status).to.be.equal(201);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.be.equal(`I'll keep '${name}' in mind.`);

                        return done();
                    });
            });
        });
        context('given an invalid name', () => {
            it('should return an error', (done) => {
                const name = '12345';
                request(app)
                    .post('/api/greet')
                    .send({ name })
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(res.status).to.be.equal(422);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error).to.be.equal('Invalid Name');

                        return done();
                    });
            });
        });
        context('given an existing name', () => {
            it('should return an error', (done) => {
                const name = faker.name.firstName();
                request(app)
                    .post('/api/greet')
                    .send({ name })
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(res.status).to.be.equal(201);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.be.equal(`I'll keep '${name}' in mind.`);

                        request(app)
                            .post('/api/greet')
                            .send({ name })
                            .end((_err, _res) => {
                                if (_err) return done(_err);

                                expect(_res.status).to.be.equal(422);
                                expect(_res.body).to.have.property('error');
                                expect(_res.body.error).to.be.equal('I already know that name.');

                                return done();
                            });
                        return done();
                    });
            });
        });
    });
});
