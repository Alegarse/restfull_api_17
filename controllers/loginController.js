const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");


const signup = async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;
        const newUser = {
            name,
            lastName,
            email,
            password: await bcrypt.hash(password, 10)
        }
        await userModel.create(newUser);
        res.status(200).send("El usuario se ha creado correctamente");
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
}

module.exports = {
    signup
}