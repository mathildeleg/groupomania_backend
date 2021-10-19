// create token for users
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({error: 'UserId not valable'});
    } else {
      req.userId = userId;
      next();
    }
  } catch {
    res.status(401).json({error: 'Requête non authentifiée '});
  }
};