// create token for users
const jwt = require('jsonwebtoken');
const {getToken} = require('../helpers/auth')

module.exports = (req, res, next) => {
  try {
    const token = getToken(req)
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({error: 'UserId not valable'});
    } else {
      req.userId = userId;
      next();
    }
  } catch {
    return res.status(401).json({error: 'Requête non authentifiée '});
  }
};