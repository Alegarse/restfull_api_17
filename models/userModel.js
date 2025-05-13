const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: [true, "El correo ya existe"],
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

const userModel = mongoose.model("user", userSchema, "users");

module.exports = userModel;