const ApiError = require('../utils/ApiError')

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  if (err?.code === 'P2002') {
    return res.status(409).json({ message: 'El registro ya existe.' })
  }

  console.error(err)
  res.status(500).json({ message: 'Error interno del servidor.' })
}

module.exports = errorHandler
