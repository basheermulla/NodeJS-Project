const jFile = require('jsonfile');

const file = 'data/users.json'

/*** Json File CRUD ***/
/*** For Phone ***/
/***provided from a Local "jsonfile" ***/
/*** Create, Read, Update, Delete ***/

// Read - Get All Phones from a json file
const getPhones = () => {
    return jFile.readFile(file)
};

// Write - Write Phones to a json file
const setPhones = (data) => {
    return jFile.writeFile(file, data);
};

module.exports = {
    getPhones,
    setPhones
};