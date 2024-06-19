const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    // logger.info(`No Token Provided`);
    return res.status(403).send({ message: 'No token provided.' });
  }

  const token = header.split(' ')[1];
  try {
    // const decoded = jwtDecode(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await User.findById(decoded._id).exec();
    req.user = user;
    next();
  } catch (err) {
    // logger.error(`Unauthorized - ${err}`);
    return res.status(401).send({ message: 'Unauthorized.' });
  }
};

module.exports = { validateToken };
