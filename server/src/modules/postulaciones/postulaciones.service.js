const prisma = require('../../config/prisma')
const ApiError = require('../../utils/ApiError')
const { recordAudit } = require('../../utils/audit')

async function listMine(userId) {
  return prisma.postulacion.findMany({
    where: { userId },
    include: { vacante: true },
    orderBy: { createdAt: 'desc' },
  })
}

async function apply(userId, vacanteId) {
  const vacante = await prisma.vacante.findUnique({ where: { id: vacanteId } })
  if (!vacante) throw new ApiError(404, 'Vacante no encontrada.')

  const existing = await prisma.postulacion.findUnique({
    where: { userId_vacanteId: { userId, vacanteId } },
    include: { vacante: true },
  })
  if (existing) return existing

  const postulacion = await prisma.postulacion.create({
    data: { userId, vacanteId },
    include: { vacante: true },
  })

  await recordAudit({ userId, action: 'CREAR_POSTULACION', entity: 'Postulacion', entityId: postulacion.id })

  return postulacion
}

module.exports = { listMine, apply }
