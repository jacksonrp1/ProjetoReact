const jwt = require('jsonwebtoken')

module.exports = function VerifyToken(req, res, next) {
  try {
    const token = req.headers['x-access-token']
    jwt.verify(token, 'Token', (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ Auth: false, Error: 'Código de acesso expirado.' })
      }
      req.id = decoded.id
      next()
    })
  } catch (error) {
    return error
  }
}
