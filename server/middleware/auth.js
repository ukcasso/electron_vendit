const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json({ isAuth: false, error: true });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json({ isAuth: false, error: true });

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
