const express = require('express');
const jwt = require('jsonwebtoken');
const usersBLL = require('../BLL/usersBLL');

const router = express.Router();

// Entry Point: http://localhost:3000/auth
router.post('/login', async (req, res) => {
    const { username, email } = req.body;
    const { ACCESS_SECRET_TOKEN } = process.env;

    // Get users from 'users' Collection in jsonplaceholder WS:
    const usersWS = await usersBLL.getAllAUsers();

    // Check if the user is registered
    const isUserVerified = usersWS.find(user => user.username === username && user.email === email);

    // If 'username' and 'password' are exist in DB:
    if (isUserVerified) {
        // Get users from 'users' Collection in mongo DB
        const usersWasLogined = await usersBLL.getUsersFromMongoDB();
        const isUserWasLogined = usersWasLogined.find(user => user.ExternalID === isUserVerified.id)
        
        // If the registered user was not login in the past
        if (!isUserWasLogined) {
            const objUser = {
                FullName: isUserVerified.name,
                NumOfActions: 5,
                ExternalID: isUserVerified.id
            }

            await usersBLL.addUserToMongoDB(objUser);
        }

        const userId = 'someId'; // Find user's ID
        const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET_TOKEN/*, { expiresIn: '1h' }*/);

        res.send({ accessToken });
    }

    res.status(401) // Unauthorized
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    //res.redirect('/auth/login');
    res.send('The user was logout');
});

module.exports = router;