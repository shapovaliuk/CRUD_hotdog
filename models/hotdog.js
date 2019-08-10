const mongoose = require('mongoose');
const validate = require('mongoose-validator');
mongoose.set('useFindAndModify', false);

const hotDogValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 10],
        message: 'Name should be between 3 and 50 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only'
    })
];

let HotDogSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, validate: hotDogValidator },
        price: { type: Number, required: true }

    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('HotDog', HotDogSchema);
