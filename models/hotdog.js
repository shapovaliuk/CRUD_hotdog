const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

let HotDogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('HotDog', HotDogSchema);
