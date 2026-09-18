const authService = require('./auth.service')
const ApiError = require('../../utils/ApiError')

async function register(req, res) {
  const { email, password, fullName, docType, document, city, specialty } = req.body
  if (!email || !password || !fullName) {
    throw new ApiError(400, 'Correo, contraseña y nombre son obligatorios.')
  }
  const result = await authService.register({ email, password, fullName, docType, document, city, specialty })
  res.status(201).json(result)
}

async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    throw new ApiError(400, 'Correo y contraseña son obligatorios.')
  }
  const result = await authService.login({ email, password })
  res.json(result)
}

async function me(req, res) {
  const user = await authService.me(req.user.id)
  res.json(user)
}

module.exports = { register, login, me }
