// Controllers for server.
const Hotdog = require('../models/hotdog');

module.exports.get = async(ctx) => {
    ctx.count = await Hotdog.countDocuments();

    ctx.data =  await Hotdog.find({})
        .skip(ctx.offset)
        .limit(ctx.limit)
        .sort({
            '_id': -1
        });

    ctx.body = {
        items: ctx.data
    };
};

module.exports.getById = async(ctx) => {
    const { id: _id } = ctx.params;
    ctx.body = await Hotdog.findOne({ _id });
};

module.exports.create = async(ctx) => {
    const { name, price } = ctx.request.body;

    if (!name || !price) {
        ctx.throw(400, 'badRequest');
    }

    const hotdog = await new Hotdog({
        name,
        price
    });

    if (hotdog.errors) {
        ctx.throw(409, 'validationError');
    }

    ctx.body = await hotdog.save();
};

module.exports.update = async(ctx) => {
    const { id: _id } = ctx.params;
    const { name, price } = ctx.request.body;

    if (!name || !price) {
        ctx.throw(400, 'badRequest');
    }

    ctx.body = await Hotdog.findOneAndUpdate({ _id }, {
        name,
        price
    }, {
        new: true
    });
};

module.exports.delete = async(ctx) => {
    const { id } = ctx.params;

    await Hotdog.findByIdAndDelete(id);

    ctx.response.status = 204;
};

module.exports.root = async(ctx) => {
    ctx.render('index', {
        title: 'HotDogs'
    });
};
