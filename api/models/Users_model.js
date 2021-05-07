const mongoose = require('mongoose');

const validator = require('validator');

const Schema = mongoose.Schema;


const userSchima = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email);
            },
            Message: `{VALUE} is not email`
        }
    },
    password: String
});


const Users = mongoose.model('users', userSchima)

module.exports = Users;