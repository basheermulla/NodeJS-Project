const actionsFile = require('../DAL/actionsFile')

const getAllActions = async () => {
    let { actions } = await actionsFile.getActions();
    return actions;
}

module.exports = { getAllActions }