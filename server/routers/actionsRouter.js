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

// Get Number Of Users Views
router.get('/getViews', (req, res) => {
    if (!req.session.arr_Employees_Session_Data) {
        const users_Views = {
            message: "NO user logged in the application"
        }
        console.log(users_Views);
        res.status(200).send(users_Views);
    } else {
        const users_Views = req.session.arr_Employees_Session_Data.map(user => {
            return {
                username: user.username,
                views: user.views,
                NumOfActions: user.NumOfActions
            }
        });
        console.log(users_Views);
        res.status(200).send(users_Views);
    }
});

// Check if the user can perform actions today
router.get('/checkViews/:username/:numOfActions', async (req, res) => {
    try {
        if (req.session.arr_Employees_Session_Data) {
            const current_User = req.session.arr_Employees_Session_Data.find(user => user.username === req.params.username)
            if (current_User) {
                const current_User_Views = current_User.views;
                const current_User_NumOfActions = +current_User.NumOfActions;
                if (current_User_Views >= current_User_NumOfActions) {
                    const alert = {
                        message: "You have reached your amount of allowed actions today"
                    }

                    console.log(alert);
                    res.status(200).send(alert);
                } else {
                    const alert = {
                        message: "You can do more actions today"
                    }

                    console.log(alert);
                    res.status(200).send(alert);
                }
            } else {
                const alert = {
                    message: "Welcome, this is the first visited time on this site today"
                }

                console.log(alert);
                res.status(200).send(alert);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Count actions & Update session express & Get All Actions from a json file
router.get('/:username/:numOfActions', async (req, res) => {

    try {
        //----------------------------- [Read] - Get All Actions from a json file -----------------------------/
        const resp_Actions = await actionsBLL.getAllActions();

        //------------------------- Calculate Number of millisecond (ms) to midnight  -------------------------/

        const now = new Date();
        const night = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1, // the next day, ...
            0, 0, 0 // ...at 00:00:00 hours
        );

        const msToMidnight = night.getTime() - now.getTime();

        //------------------------------------- Option 1 - Use maxAge -------------------------------------/

        //---     Update maxAge of cookie to set _expires cookie at midnight     ---/
        req.session.cookie.maxAge = msToMidnight;

        if (!req.session.flag) { // Just once a day
            req.session.flag = true;

            //---    Set an array json to save users session data    ---/
            req.session.arr_Employees_Session_Data = [];
        }

        //----------------------------------- Option 2 - Use setTimeout -----------------------------------/
        /*if (!req.session.flag) { // Just once a day
            req.session.flag = true;

            //--- Use setTimeout function & req.session.destroy() ---/
            setTimeout(() => {
                console.log('The session was destroyed at = ' + new Date());
                req.session.destroy();
            }, msToMidnight);

            //--- Set an array json to save users session data ---/
            req.session.arr_Employees_Session_Data = [];
        }*/

        //--- Insert the username of all users that already logged in today into let array[allLoginUsersToday] ***/
        let allLoginUsersToday = []
        const users_Session_Data = req.session.arr_Employees_Session_Data;
        users_Session_Data.forEach(user => {
            allLoginUsersToday.push(user.username);
        });
        console.log(users_Session_Data);
        //-------------------------- Check if the current username already login today  --------------------------/

        const current_User = req.session.arr_Employees_Session_Data.find(user => user.username === req.params.username)
        let current_User_Views = {};
        let current_User_NumOfActions = {};
        if (current_User) {
            current_User_Views = current_User.views;
            current_User_NumOfActions = +current_User.NumOfActions;
        }

        if (!allLoginUsersToday.includes(req.params.username)) {
            // The user has not logged in today 
            const obj_Username_Session = {
                username: req.params.username,
                views: 1,
                NumOfActions: req.params.numOfActions
            }

            req.session.arr_Employees_Session_Data.push(obj_Username_Session);

            console.log(req.session)
            console.log(`This is the ${obj_Username_Session.views} visited time on this page`);

            const resp_Views = { views: obj_Username_Session.views };

            // Response - both number of views and actions data
            res.status(200).json({ resp_Views, resp_Actions });
        } else {
            // The user has logged in today
            console.log('-------------------------------------------------------------------------------------');
            console.log(req.session.cookie._expires.toString() + ' |  Expiere session.cookie  |')
            console.log('-------------------------------------------------------------------------------------')

            let user_views = '';
            if (current_User_Views > current_User_NumOfActions) {
                user_views = current_User_Views;
            } else {
                req.session.arr_Employees_Session_Data.forEach(user => {
                    if (user.username === req.params.username) {
                        user.views++;
                        user_views = user.views
                    }
                });
            }

            console.log(req.session, req.session.cookie._expires, '   |   ', req.session.cookie._expires.toString());
            console.log(`You visited in this page ${user_views} times`);

            const resp_Views = { views: user_views };

            // Response - both number of views and actions data
            res.status(200).json({ resp_Views, resp_Actions });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});



// Logout when you reached to the maximum actions allowed --------->  // Not in use
router.get('/logOutThisDay', (req, res) => {
    //req.session.destroy();
    //res.redirect('/auth');
    res.send();
});

/****************************************************************************************************************************************/
/*****************************************************//* Write to Actions Json File *//*************************************************/
/****************************************************************************************************************************************/
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

        // The User has been Authorized ******* writeFile - Write an Action ******
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