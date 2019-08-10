const config = {
    app: {
        port: 3000
    },

    db: {
        host: 'localhost',
        port: '27017',
        name: 'hot-dog',
        connectionString: 'mongodb://localhost:27017/hot-dog',
        newUrlParser: true
    }
};

module.exports = config;
