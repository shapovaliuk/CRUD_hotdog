const Koa = require("koa");
const config = require("./config");
const serve = require("koa-static");
const Pug = require("koa-pug");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const logger = require('koa-logger');

const app = new Koa();

const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

app.use(serve(__dirname + "/public"));
app.use(bodyParser());
app.use(logger());

app.on('error', err => console.error('server error', err));

mongoose.connect(process.env.MONGODB_URI || config.db.connectionString,
    {useNewUrlParser: true}, function(err){
        if(err) return console.log(err);
});

const router = require('./routes/routes');
app
    .use(router.routes())
    .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Server was started at ${PORT} port...`);
});



