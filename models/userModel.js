const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [5, "El nombre debe tener al menos 5 caracteres"],
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: [true, "El correo ya existe"],
    trim: true,
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
  favourites: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: "Movie",//HAce referencia al modelo Movie de MoviesModel.js
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});

// Nosotro indicamos aqui que todas la sveces que haya un find ejecutado
// no nos muestre la password en la respuesta
userSchema.pre(/^find/, function (next) {
  /* if (this.skipIsActiveFilter) {
    this.find( { isActive: true });
  } */
  this.select("-password");
  next(); // Esto es un middleware, indica que debe hacer ahora, en este caso continuar para seguir el flujo
});

const userModel = mongoose.model("user", userSchema, "users");

module.exports = userModel;
