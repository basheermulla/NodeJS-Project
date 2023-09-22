const User = require('../models/userModel');
const userFile = require('../DAL/actionsFile');
const userWS = require('../DAL/usersWS');

/*** Data Structure */
/**
 * [{ "id": 1,                              **[[ WS ]]**
 *      "name": "Leanne Graham",            **[[ WS ]]**
 *      "email": "Sincere@april.biz",       **[[ WS ]]**
 *      "phone": "052-22222",               **[[ Json File ]]**
 *      "address":
 *      {
 *          "city": "London",               **[[ Mongodb ]]**
 *          "Country": "UK"                 **[[ Mongodb ]]**
 *      }
 *  },
 *  { "id": 2,                              **[[ WS ]]**
 *      "name": "Ervin Howell",             **[[ WS ]]**
 *      "email": "Shanna@melissa.tv",       **[[ WS ]]**
 *      "phone": "054-5555",                **[[ Json File ]]**
 *      "address":
 *      {
 *          "city": "New York",             **[[ Mongodb ]]**
 *          "Country": "USA"                **[[ Mongodb ]]**
 *      }
 *  }]
 */

/*** MongoDB CRUD ***/
/*** For Adresses ***/
/***provided from a MongoDB collection called “users” ***/
/*** Create, Read, Update, Delete ***/

// GET - Get All Users - Read
const getAllAUsers = async () => {

    const userData = [];

    /* Option 1 */
    const { data: usersWeb } = await userWS.getAllUsers(2);    //From WS

    const { persons } = await userFile.getPhones(); // From File

    const addresses = await User.find({});          // From Mongo DB

    /* Option 2 - Promise All */ /* ללמוד ולהשלים */

    // console.log(usersWeb, persons, addresses)

    //let all = [1]
    //all = Promise.all([usersWeb, persons, addresses]).then((data) => console.log(data))

    
    usersWeb.forEach(user => {
        const obj = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        const phone = persons.find(phone => phone.id === user.id);
        if (phone) {
            obj.phone = phone.phone;
        }

        const addresss = addresses.find(address => Math.floor(address.externalId) === user.id);
        
        if (addresss) {
            obj.address = {
                city: addresss.city,
                country: addresss.country
            }
        }
        userData.push(obj);
    });

    return userData;
};

// GET - Get Address By Id - Read
const getUserById = async (id) => {

    const userData = [];

    const { data: usersWeb } = await userWS.getUserById(id);    //From WS

    const { persons } = await userFile.getPhones(); // From File

    const addresses = await User.findById({ _id: id });          // From Mongo DB

    usersWeb.forEach(user => {
        const obj = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        const phone = persons.find(phone => phone.id === user.id);
        if (phone) {
            obj.phone = phone.phone;
        }

        const addresss = addresses.find(address => Math.floor(address.externalId) === user.id);
        if (addresss) {
            obj.address = {
                city: addresss.city,
                country: addresss.country
            }
        }
        userData.push(obj);
    });

    return userData;
};

// POST - Create a Address
/*const addAddress = async (obj) => {
    const user = new User(obj);
    await user.save();
    return 'Created';
};

// PUT - Update a Address
const updateAddress = async (id, obj) => {
    await User.findByIdAndUpdate(id, obj);
    return 'Updated'
};

// DELETE - Delete a Address
const deleteAddress = async (id) => {
    await User.findByIdAndDelete(id);
    return 'Deleted'
};*/

module.exports = {
    getAllAUsers,
    getUserById,
    /*addAddress,
    updateAddress,
    deleteAddress*/
};

