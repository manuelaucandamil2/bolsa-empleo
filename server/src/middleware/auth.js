const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')

function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return next(new ApiError(401, 'No autenticado.'))
  }

  const token = header.slice('Bearer '.length)
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    next(new ApiError(401, 'Token inválido o expirado.'))
  }
}

module.exports = { requireAuth }
