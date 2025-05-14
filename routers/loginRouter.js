const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/loginController");



router.post("/signup", signup);
router.post("/login", login);

// Ahora exportamos este router creado
module.exports = router;