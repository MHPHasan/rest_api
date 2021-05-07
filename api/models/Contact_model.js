const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;


const ContactSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        trim: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator: (val) => {
                return validator.isEmail(val);
            },
            message: `{VALUE} is not Email!!!`
        }
    }
});


const Contacts = mongoose.model('Contacts', ContactSchema);

module.exports = Contacts;