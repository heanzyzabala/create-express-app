const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        unique: true,
    },
});

module.exports = mongoose.model('Name', schema);
