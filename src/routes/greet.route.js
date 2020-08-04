const express = require('express');

const router = express.Router();
const nameSchema = require('../schemas/name.schema');

router.get('/greet/:name', async (req, res) => {
    const { name } = req.params;
    const valid = await nameSchema.isValid({ name });
    if (!valid) {
        return res.status(422).json({ error: 'Invalid Name' });
    }
    return res.status(200).json({ message: `Hi, ${name}!` });
});

module.exports = router;