// Test for all the server.
process.env.NODE_ENV = 'test';
let Hotdog = require('../models/hotdog');

//Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);


describe('API methods testing', () => {
    beforeEach((done) => { //Before each test - clear data base.
        Hotdog.deleteMany({}, (err) => {
            if (err) {
                throw err;
            }
            done();
        });
    });

    it('method: GET', (done) => {
        chai.request(server)
            .get('/api/hot-dogs')
            .end((err, res) => {
                expect(res.status).eq(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('items');
                expect(res.body.items).to.have.lengthOf(0);
                done();
            });
    });

    it('method: GET (by given id)', (done) => {
        const hotdog = new Hotdog({name: 'BigDog', price: 15});
        hotdog.save((err, hotdog) => {
            chai.request(server)
                .get(`/api/hot-dogs/${hotdog.id}`)
                .send(hotdog)
                .end((err, res) => {
                    expect(res.status).eq(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('name').eq(hotdog.name);
                    expect(res.body).to.have.have.property('price').eq(hotdog.price);
                    expect(res.body).to.have.property('_id').eq(hotdog.id);
                    done();
                });
        });
    });

    it('method: POST (with incorrect price value)', (done) => {
        const hotdog = {
            name: 'Middle',
            price: 'test_price'
        };

        chai.request(server)
            .post('/api/hot-dogs')
            .send(hotdog)
            .end((err, res) => {
                expect(res.status).eq(409);
                done();
            });
    });

    it('method: POST', (done) => {
        const hotdog = {
            name: 'Middle',
            price: 123
        };

        chai.request(server)
            .post('/api/hot-dogs')
            .send(hotdog)
            .end((err, res) => {
                expect(res.status).eq(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body.name).to.be.a('string');
                expect(res.body.price).to.be.a('number');
                done();
            });
    });

    it('method: PUT', (done) => {
        const hotdog = new Hotdog({name: 'SmallDog', price: 12});
        hotdog.save((err, hotdog) => {
            chai.request(server)
                .put(`/api/hot-dogs/${hotdog.id}`)
                .send({name: 'BigDog', price: 15})
                .end((err, res) => {
                    expect(res.status).eq(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('name').eq('BigDog');
                    expect(res.body).to.have.property('price').eq(15);
                    done();
                });
        });
    });

    it('method: DELETE', (done) => {
        const hotdog = new Hotdog({name: 'BigDog', price: 15});
        hotdog.save((err, hotdog) => {
            chai.request(server)
                .delete(`/api/hot-dogs/${hotdog.id}`)
                .end((err, res) => {
                    expect(res.status).eq(204);
                    done();
                });
        });
    });
});
