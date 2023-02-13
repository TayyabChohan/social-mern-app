const jwt = require("jsonwebtoken");
module.exports.jwtoken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(403).send("Access Denied");
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).timLeft();
    }
    const varified = jwt.verify(token, process.env.JWT_SECRET);
    res.user = varified;
    next();
  } catch (err) {
    res.status(500).json({ msg: err.meaasge });
  }
};
