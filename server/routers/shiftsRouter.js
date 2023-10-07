const express = require('express');
const jwt = require('jsonwebtoken');
const shiftsBLL = require('../BLL/shiftsBLL');

const router = express.Router();

// Entry Point: http://localhost:3000/shifts

// Get All Shifts
router.get('/', (req, res) => {
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

        // The User has been Authorized ********************** Get All Shifts *******
        try {
            const shifts = await shiftsBLL.getAllShifts();
            //const shifts = [ {FirstName: 'Basheer'}, {LastName: 'Mulla'} ];
            res.send(shifts);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// GET - Get Shift By Id
router.get('/:id', async (req, res) => {
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

        // The User has been Authorized ******************** GET - Get Shift By Id **
        try {
            const { id } = req.params;
            const Shift = await shiftsBLL.getShiftById(id);
            res.send(Shift);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// POST - Create a Shift
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

        // The User has been Authorized ******************** POST - Create an Shift *
        try {
            const { Date, StartingHour, EndingHour } = req.body; // In use
            const obj_no = req.body; // Not in use
            const obj = {
                Date,
                StartingHour,
                EndingHour
            }
            console.log (obj)
            const result = await shiftsBLL.addShift(obj);
            res.status(201).send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

// PUT - Update a Shift
router.put('/:id', async (req, res) => {
    /*const token = req.headers['x-access-token'];
    // If 'username' and 'password' are exist in DB:
    if (!token) {
        res.status(401).send('No token provided') // Unauthorized
    }

    const { ACCESS_SECRET_TOKEN } = process.env;

    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
        if (err) {
            res.status(500).send('Fail to authenticate token')
        }*/

        // The User has been Authorized ******************** PUT - Update an Shift **
        try {
            const { id } = req.params;
            const obj = req.body;
            const result = await shiftsBLL.updateShift(id, obj, { new: true });
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    /*});*/
});

// DELETE - Delete a Shift
router.delete('/:id', async (req, res) => {
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

        // The User has been Authorized ****************** DELETE - Delete a Shift *
        try {
            const { id } = req.params;
            const result = await shiftsBLL.deleteShift(id);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
        // *****************************************************************************
    });
});

module.exports = router;