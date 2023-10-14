const jFile = require('jsonfile');

const file = 'data/actions.json'

/*** Jsoncd File CRUD ***/
/*** For Actions ***/
/***provided from a Local "jsonfile" ***/
/*** Read, Write ***/

// Read - Get All Phones from a json file
const getActions = () => {
    return jFile.readFile(file)
};

// Write - Write Phones to a json file
const setAction = (data) => {
    return jFile.writeFile(file, data);
};

module.exports = {
    getActions,
    setAction
};