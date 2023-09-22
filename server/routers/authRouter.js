const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: http://localhost:3000/auth
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const { ACCESS_SECRET_TOKEN } = process.env;

    // If 'username' and 'password' are exist in DB:
    if (true) {
        const userId = 'someId'; // Find user's ID
        const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET_TOKEN/*, { expiresIn: '1h' }*/ );
        
        res.send({ accessToken });
    }

    res.status(401) // Unauthorized
})

module.exports = router;