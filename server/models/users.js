const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String
    },
    message: {
        type: String
    }
});

module.exports = mongoose.model('user', userSchema);