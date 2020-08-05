const express = require('express');

const router = express.Router();
const nameService = require('../services/name.service');
const nameSchema = require('../schemas/name.schema');

router.get('/greet/:name', async (req, res) => {
    const { name } = req.params;
    if (!isValidName(name)) {
        return res.status(422).json({ error: 'Invalid Name' });
    }
    if (name !== 'heanzy' && await nameService.get(name) == null) {
        return res.status(404).json({ error: 'Who are you again?' });
    }
    return res.status(200).json({ message: `Hi, ${name}!` });
});

router.post('/greet', async (req, res) => {
    const { name } = req.body;
    if (!isValidName(name)) {
        return res.status(422).json({ error: 'Invalid Name' });
    }
    await nameService.save(name);
    return res.status(201).json({ message: `I'll keep ${name} in mind.`})
});

async function isValidName(name) {
    return await nameSchema.isValid({ name });
}
module.exports = router;