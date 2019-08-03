const Koa = require("koa");
const config = require("./config");
const Router = require("koa-router");
const serve = require("koa-static");
const Pug = require("koa-pug");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const logger = require('koa-logger');
const routes = require("./routes/routes.js");


const app = new Koa();
const router = new Router();
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

app.use(serve(__dirname + "/public"));

app.use(bodyParser());
app.use(logger());

// app.on('error', err => log.error('server error', err));

mongoose.connect(process.env.MONGODB_URI || config.db.connectionString,
    {useNewUrlParser: true}, function(err){
        if(err) return console.log(err);
});

router.get("/api/hot-dogs", routes.get);

router.get("/api/hot-dogs/:id", routes.getById);

router.post("/api/hot-dogs", routes.create);

router.delete("/api/hot-dogs/:id", routes.delete);

router.put("/api/hot-dogs/:id", routes.put);

router.get("/", async ctx => {
    ctx.render("index", {title: "HotDogs"})
});

app
    .use(router.routes())
    .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Server was started at ${PORT} port...`);
});



