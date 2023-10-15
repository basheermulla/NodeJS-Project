const jFile = require('jsonfile');

const file = 'data/actions.json'

/*** Json File CRUD ***/
/*** For Actions ***/
/***provided from a Local "jsonfile" ***/
/*** Read, Write ***/

// Read - Get All Actions from a json file
const getActions = async () => {
    const result = await jFile.readFile(file);
    return result;
};

// Write - Write Actions to a json file
const setAction = async (data) => {
    await jFile.writeFile(file, data, 'utf8', (err) => {
        if (err) console.error(err);
    });
};

module.exports = {
    getActions,
    setAction
};