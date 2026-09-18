const prisma = require('../../config/prisma')
const ApiError = require('../../utils/ApiError')

async function list() {
  return prisma.vacante.findMany({
    where: { status: 'abierta' },
    orderBy: { createdAt: 'desc' },
  })
}

async function getById(id) {
  const vacante = await prisma.vacante.findUnique({ where: { id } })
  if (!vacante) throw new ApiError(404, 'Vacante no encontrada.')
  return vacante
}

module.exports = { list, getById }
