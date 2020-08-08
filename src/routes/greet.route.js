/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const nameService = require('../services/name.service');
const nameSchema = require('../schemas/name.schema');

async function isValidName(name) {
    return nameSchema.isValid({ name });
}

router.get('/greet/:name', async (req, res) => {
    const { name } = req.params;
    if (!await isValidName(name)) {
        return res.status(422).json({ error: 'Invalid Name' });
    }
    if (name !== 'heanzy' && await nameService.get(name) == null) {
        return res.status(404).json({ error: 'Who are you again?' });
    }
    return res.status(200).json({ message: `Hi, ${name}!` });
});

router.post('/greet', async (req, res) => {
    try {
        const { name } = req.body;
        if (!await isValidName(name)) {
            return res.status(422).json({ error: 'Invalid Name' });
        }
        await nameService.save(name);
        return res.status(201).json({ message: `I'll keep '${name}' in mind.` });
    } catch (err) {
        console.error(err);
        const { name, code } = err;
        if (name && code === 11000) {
            return res.status(422).json({ error: 'I already know that name' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
