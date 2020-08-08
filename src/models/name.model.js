const mongoose = require('mongoose');

const { Schema } = mongoose;
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)

const schema = new Schema({
    name: { 
        type: String,
        unique: true,
    }
});

module.exports = mongoose.model('Name', schema);