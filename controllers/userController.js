const users = require("../db/users")

const getAllUser = (req, res) => {
    res.send(users);
}

const getUserById = (req, res) => {
    res.send(users[0]);
}

module.exports = {
    getAllUser,
    getUserById,
}