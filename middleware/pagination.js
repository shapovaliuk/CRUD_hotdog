module.exports = async(ctx, next) => {
    ctx.page = parseInt(ctx.request.query.page) || 1;
    ctx.limit = 3;
    ctx.offset = (ctx.page - 1) * ctx.limit;

    await next();
    const totalPages = Math.ceil(ctx.count / ctx.limit) || 1;

    if (ctx.page > totalPages) {
        ctx.throw(400, 'Incorrect page');
    }

    ctx.body = {
        total: ctx.count,
        limit: ctx.limit,
        page: ctx.page,
        totalPages,
        ...ctx.body
    };
};
