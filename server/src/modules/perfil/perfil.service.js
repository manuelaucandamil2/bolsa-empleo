const prisma = require('../../config/prisma')
const ApiError = require('../../utils/ApiError')

const UPDATABLE_FIELDS = ['fullName', 'docType', 'document', 'city', 'phone', 'specialty', 'photoUrl', 'birthDate']

function omitPasswordHash(user) {
  const safeUser = { ...user }
  delete safeUser.passwordHash
  return safeUser
}

async function getProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: true, education: true, experience: true, skills: true },
  })
  if (!user) throw new ApiError(404, 'Usuario no encontrado.')

  const [documentTypes, userDocuments] = await Promise.all([
    prisma.documentType.findMany(),
    prisma.userDocument.findMany({ where: { userId } }),
  ])

  const requiredDocs = documentTypes.filter(
    (dt) => dt.requiredFor.length === 0 || dt.requiredFor.includes(user.specialty),
  )
  const documents = requiredDocs.map((dt) => {
    const existing = userDocuments.find((ud) => ud.documentTypeId === dt.id)
    return {
      documentTypeId: dt.id,
      name: dt.name,
      status: existing?.status ?? 'Pendiente',
      fileUrl: existing?.fileUrl ?? null,
    }
  })

  return { ...omitPasswordHash(user), role: user.role.name, documents }
}

async function updateProfile(userId, data) {
  const payload = {}
  for (const key of UPDATABLE_FIELDS) {
    if (data[key] !== undefined) payload[key] = data[key]
  }
  // Los <input type="date"> del frontend mandan solo "YYYY-MM-DD" (sin hora),
  // pero Prisma exige un DateTime ISO-8601 completo para este campo.
  if (payload.birthDate) payload.birthDate = new Date(payload.birthDate)

  const user = await prisma.user.update({ where: { id: userId }, data: payload })
  return omitPasswordHash(user)
}

async function addEducation(userId, data) {
  return prisma.education.create({ data: { ...data, userId } })
}

async function removeEducation(userId, id) {
  await prisma.education.deleteMany({ where: { id, userId } })
}

async function addExperience(userId, data) {
  return prisma.experience.create({ data: { ...data, userId } })
}

async function removeExperience(userId, id) {
  await prisma.experience.deleteMany({ where: { id, userId } })
}

async function addSkill(userId, name) {
  return prisma.skill.upsert({
    where: { userId_name: { userId, name } },
    create: { userId, name },
    update: {},
  })
}

async function removeSkill(userId, id) {
  await prisma.skill.deleteMany({ where: { id, userId } })
}

async function updateDocument(userId, documentTypeId, { status, fileUrl }) {
  const documentType = await prisma.documentType.findUnique({ where: { id: documentTypeId } })
  if (!documentType) throw new ApiError(404, 'Tipo de documento no encontrado.')

  return prisma.userDocument.upsert({
    where: { userId_documentTypeId: { userId, documentTypeId } },
    create: { userId, documentTypeId, status, fileUrl },
    update: { status, fileUrl },
  })
}

module.exports = {
  getProfile,
  updateProfile,
  addEducation,
  removeEducation,
  addExperience,
  removeExperience,
  addSkill,
  removeSkill,
  updateDocument,
}
