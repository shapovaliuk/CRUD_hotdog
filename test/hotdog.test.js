// Test for all the server.
process.env.NODE_ENV = 'test';
let Hotdog = require('../models/hotdog');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

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
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('method: GET (by given id)', (done) => {
        const hotdog = new Hotdog({name: 'BigDog', price: 15});
        hotdog.save((err, book) => {
            chai.request(server)
                .get('/api/hot-dogs/' + hotdog.id)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('price');
                    res.body.should.have.property('_id').eql(hotdog.id);
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
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.equal('ValidationError');
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
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('price');
                res.body.name.should.be.a('string');
                res.body.price.should.be.a('number');
                done();
            });
    });

    it('method: PUT', (done) => {
        const hotdog = new Hotdog({name: 'SmallDog', price: 12});
        hotdog.save((err, hotdog) => {
            chai.request(server)
                .put('/api/hot-dogs/' + hotdog.id)
                .send({name: 'BigDog', price: 15})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('BigDog');
                    res.body.should.have.property('price').eql(15);
                    done();
                });
        });
    });

    it('method: DELETE', (done) => {
        const hotdog = new Hotdog({name: 'BigDog', price: 15});
        hotdog.save((err, hotdog) => {
            chai.request(server)
                .delete('/api/hot-dogs/' + hotdog.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('BigDog');
                    res.body.should.have.property('price').eql(15);
                    res.body.should.have.property('_id').eql(hotdog.id);
                    done();
                });
        });
    });
});
