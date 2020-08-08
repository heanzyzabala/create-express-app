const yup = require('yup');

module.exports = yup.object().shape({
    name: yup.string().required().matches(/^[a-zA-Z]+$/),
});
