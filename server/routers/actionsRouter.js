const express = require('express');
const moment = require('moment');

const router = express.Router();

// Entry Point: http://localhost:3000/actions

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
        setTimeout(function () {
            reset();              //      <-- This is the function being called at midnight.
            resetAtMidnight();    //      Then, reset again next midnight.
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
        console.log('-------------------------------------------------------------------------------------')
        console.log(req.session.cookie._expires.toString() + ' |  Expiere session.cookie  |')
        console.log('-------------------------------------------------------------------------------------')
        req.session
        req.session.views++;
        //console.log(`You visited in this page ${req.session.views} times`);
        const obj_views = {
            views: req.session.views
        }
        res.send(obj_views);
    }
});

// Logout when you reached to the maximum actions allowed
router.get('/logOutThisDay', (req, res) => {
    req.session.destroy();
    //res.redirect('/auth');
    res.send();
});

module.exports = router;