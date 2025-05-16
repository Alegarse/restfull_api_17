const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/auth-token");

const signup = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const newUser = {
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    await userModel.create(newUser)
    res.status(200).send("El usuario se ha creado correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel
      .findOne({ email: email })
      .select("name lastName email password role");

    if (!user) {
      return res.status(404).send("Usuario o contraseña no validos");
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(404).send("Usuario o contraseña no validos");
    }

    // ZONA CREACION TOKEN
    const payload = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    const token = generateToken(payload, false);
    const token_refresh = generateToken(payload, true);

    res.status(200).send({ status: "Success", data: user, token ,token_refresh });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getTokens = (req, res) => {
  try {
    const payload = {
      _id: req.payload._id,
      name: req.payload.name,
      role: req.payload.role,
    }

    const token = generateToken(payload, false);
    const token_refresh = generateToken(payload, true);

    res.status(200).send({ status: "Success", token ,token_refresh });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
}

module.exports = {
  signup,
  login,
  getTokens,
};
