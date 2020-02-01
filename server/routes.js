// All server.
const pagination = require('../middleware/pagination');

const Router = require('koa-router');
const controllers = require('./controllers');

const router = new Router();

router.get('/api/hot-dogs', pagination, controllers.get);

router.get('/api/hot-dogs/:id', controllers.getById);

router.post('/api/hot-dogs', controllers.create);

router.put('/api/hot-dogs/:id', controllers.update);

router.delete('/api/hot-dogs/:id', controllers.delete);

router.get('/', controllers.root);

module.exports = router;
