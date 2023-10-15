const actionsFile = require('../DAL/actionsFile');

/****************************************************************************************************************************************/
/************************//* Work with - actionsFile.js *///     =======>     //* CRUD - getActions, setAction *//***********************/
/****************************************************************************************************************************************/

// Read - Get All Actions from a json file
const getAllActions = async () => {
    let actions  = await actionsFile.getActions();
    return actions;
}

// Write - Write Actions to a json file
const insertAction = async (obj) => {
    try {
        await actionsFile.setAction(obj);
        return 'Created'; 
      } catch (err) {
        console.error('Error while parsing JSON data:', err);
      }
};

module.exports = { 
    getAllActions,
    insertAction
}