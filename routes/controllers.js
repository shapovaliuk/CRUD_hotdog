// Controllers for routes.
const Hotdog = require('../models/hotdog');

module.exports.get = async(ctx) => {
    await Hotdog.find({}, function(err, hotdogs) {
        if (err) return console.log(err);

        ctx.response.body = hotdogs;
    });
};

module.exports.getById = async(ctx) => {
    const id = ctx.params.id;
    await Hotdog.findOne({_id: id}, function(err, hotdog) {

        if (err) return console.log(err);
        ctx.body = hotdog;
    });
};

module.exports.create = async(ctx) => {
    if (!ctx.request.body) return ctx.response.status = 400;

    const name = ctx.request.body.name;
    const price = ctx.request.body.price;
    const hotdog = await new Hotdog({name, price});

    if (hotdog.errors) {
        return ctx.body = { error: 'ValidationError' };
    }

    await hotdog.save();

    ctx.body = hotdog;
};

module.exports.delete = async(ctx) => {
    const id = await ctx.params.id;
    await Hotdog.findByIdAndDelete(id, function(err, hotdog) {

        if (err) return console.log(err);
        ctx.body = hotdog;
    });
};

module.exports.update = async(ctx) => {
    if (!ctx.request.body) return ctx.status = 400;
    console.log(ctx.params.id);
    const id = ctx.params.id;
    const name = ctx.request.body.name;
    const price = ctx.request.body.price;
    const newHotdog = {name, price};

    await Hotdog.findOneAndUpdate({_id: id}, newHotdog, {new: true}, function(err, hotdog) {
        if (err) return console.log(err);
    });
    ctx.body = newHotdog;
};

module.exports.root = async(ctx) => {
    ctx.render('index', {title: 'HotDogs'});
};


