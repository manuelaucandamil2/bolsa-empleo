const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../../config/prisma')
const ApiError = require('../../utils/ApiError')

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )
}

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    docType: user.docType,
    document: user.document,
    city: user.city,
    specialty: user.specialty,
    photoUrl: user.photoUrl,
    role: user.role.name,
    provider: user.provider,
  }
}

async function register({ email, password, fullName, docType, document, city, specialty }) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new ApiError(409, 'Ya existe una cuenta con este correo.')

  const role = await prisma.role.findUnique({ where: { name: 'candidato' } })
  if (!role) throw new ApiError(500, 'El rol "candidato" no está configurado. Ejecuta el seed.')

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, passwordHash, fullName, docType, document, city, specialty, roleId: role.id },
    include: { role: true },
  })

  return { user: toPublicUser(user), token: signToken(user) }
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } })
  if (!user?.passwordHash) throw new ApiError(401, 'Correo o contraseña incorrectos.')

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) throw new ApiError(401, 'Correo o contraseña incorrectos.')

  return { user: toPublicUser(user), token: signToken(user) }
}

async function me(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } })
  if (!user) throw new ApiError(404, 'Usuario no encontrado.')
  return toPublicUser(user)
}

module.exports = { register, login, me }
