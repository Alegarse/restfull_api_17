const jwt = require("jsonwebtoken");
 
const verifyToken = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Acceso denegado");
 
    const payload = jwt.verify(token,  process.env.SECRET_TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).send({ status: "Token expired", error: error.message });
  }
};
 
module.exports = verifyToken;