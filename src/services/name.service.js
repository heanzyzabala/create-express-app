const nameModel = require('../models/name.model');

module.exports = {
    async save(name) {
        return nameModel.create({ name });
    },
    async get(name) {
        return nameModel.findOne({ name });
    },
};
