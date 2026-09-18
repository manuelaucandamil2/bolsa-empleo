const prisma = require('../../config/prisma')
const ApiError = require('../../utils/ApiError')

async function list(userId) {
  return prisma.savedJob.findMany({
    where: { userId },
    include: { vacante: true },
    orderBy: { createdAt: 'desc' },
  })
}

async function save(userId, vacanteId) {
  const vacante = await prisma.vacante.findUnique({ where: { id: vacanteId } })
  if (!vacante) throw new ApiError(404, 'Vacante no encontrada.')

  return prisma.savedJob.upsert({
    where: { userId_vacanteId: { userId, vacanteId } },
    create: { userId, vacanteId },
    update: {},
    include: { vacante: true },
  })
}

async function unsave(userId, vacanteId) {
  await prisma.savedJob.deleteMany({ where: { userId, vacanteId } })
}

module.exports = { list, save, unsave }
