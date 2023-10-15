const express = require('express');
const jwt = require('jsonwebtoken');
const actionsBLL = require('../BLL/actionsBLL');

const router = express.Router();

/****************************************************************************************************************************************/
/****************************************//* Count number of views | Reset views every midnight *//**************************************/
/****************************************************************************************************************************************/
/******************************/// <======= Entry Point: http://localhost:3000/actions =======> //***************************************/
/****************************************************************************************************************************************/
/****************************************************************************************************************************************/

// Get Number Of Views
router.get('/getViews', (req, res) => {
    const obj_views = {
        views: req.session.views
    }
    res.send(obj_views);

});

// Count actions
router.get('/', (req, res) => {
    const now = new Date();

    const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );
    const msToMidnight = night.getTime() - now.getTime();

    if (!req.session.flag) {
        console.log(req.session.flag);
        setTimeout(() => {              //      <-- This is the function being called at midnight
            console.log(req.session)
            req.session.destroy();      //      <-- Then, destroy session.            
        }, msToMidnight);
        req.session.flag = true;
        console.log(req.session.flag);
    }

    req.session.cookie.maxAge = msToMidnight

    if (!req.session.views) {
        req.session.views = 1;
        console.log(`This is the ${req.session.views} visited time on this page`);
        const obj_views = {
            views: req.session.views
        }
        res.send(obj_views);
    } else {
        console.log('-------------------------------------------------------------------------------------');
        console.log(req.session.cookie._expires.toString() + ' |  Expiere session.cookie  |')
        console.log('-------------------------------------------------------------------------------------')
        req.session.views++;
        console.log(req.session.views)

        //console.log(`You visited in this page ${req.session.views} times`);
        const obj_views = {
            views: req.session.views
        }
        res.send(obj_views);
    }
});

// Logout when you reached to the maximum actions allowed
router.get('/logOutThisDay', (req, res) => {
    //req.session.destroy();
    //res.redirect('/auth');
    res.send();
});

/****************************************************************************************************************************************/
/*****************************************************//* Work with Actions Json File *//************************************************/
/****************************************************************************************************************************************/

// Read - Get All Actions from a json file
router.get('/getAllActions', async (req, res) => {
    //console.log(req.headers);

    const token = req.headers['x-access-token'];
    // If 'username' and 'password' are exist in DB:
    if (!token) {
        res.status(401).send('No token provided') // Unauthorized
    }

    const { ACCESS_SECRET_TOKEN } = process.env;

    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
        if (err) {
            res.status(500).send('Fail to authenticate token')
        }

        // The User has been Authorized ********************** Get All Actions *******
        try {
            const actions = await actionsBLL.getAllActions();

            res.send(actions);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// POST - Write to Actions Json File
router.post('/', async (req, res) => {
    const token = req.headers['x-access-token'];
    // If 'username' and 'password' are exist in DB:
    if (!token) {
        res.status(401).send('No token provided') // Unauthorized
    }

    const { ACCESS_SECRET_TOKEN } = process.env;

    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
        if (err) {
            res.status(500).send('Fail to authenticate token')
        }

        // The User has been Authorized ******* writeFile - Write an Action **
        try {
            const { firstName, lastName, startWorkYear } = req.body; // Not in use
            const obj = req.body; // In use
            const result = await actionsBLL.insertAction(obj);
            res.status(201).send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

module.exports = router;