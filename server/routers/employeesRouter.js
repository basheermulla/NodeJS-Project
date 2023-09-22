const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: http://localhost:3000/employees
router.get('/', (req, res) => {
    
    const token = req.headers['x-access-token'];

    // If 'username' and 'password' are exist in DB:
    if (!token) {
        res.status(401).send('No token provided') // Unauthorized
    }

    const { ACCESS_SECRET_TOKEN } = process.env;

    console.log(ACCESS_SECRET_TOKEN);

    jwt.verify(token, ACCESS_SECRET_TOKEN, (err, data) => {
        if (err) {
            res.status(500).send('Fail to authenticate token') 
        }

        console.log(data)
        const employees = [ {FirstName: 'Basheer'}, {LastName: 'Mulla'} ];
        res.send(employees); // Authorized

    } )

})

module.exports = router;