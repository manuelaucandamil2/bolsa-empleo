const service = require('./perfil.service')
const ApiError = require('../../utils/ApiError')

async function getProfile(req, res) {
  const profile = await service.getProfile(req.user.id)
  res.json(profile)
}

async function updateProfile(req, res) {
  const profile = await service.updateProfile(req.user.id, req.body)
  res.json(profile)
}

async function addEducation(req, res) {
  const { institution, degree, level, year } = req.body
  if (!institution || !degree) throw new ApiError(400, 'institution y degree son obligatorios.')
  const education = await service.addEducation(req.user.id, { institution, degree, level, year })
  res.status(201).json(education)
}

async function removeEducation(req, res) {
  await service.removeEducation(req.user.id, req.params.id)
  res.status(204).send()
}

async function addExperience(req, res) {
  const { company, role, period, description } = req.body
  if (!company || !role) throw new ApiError(400, 'company y role son obligatorios.')
  const experience = await service.addExperience(req.user.id, { company, role, period, description })
  res.status(201).json(experience)
}

async function removeExperience(req, res) {
  await service.removeExperience(req.user.id, req.params.id)
  res.status(204).send()
}

async function addSkill(req, res) {
  const { name } = req.body
  if (!name) throw new ApiError(400, 'name es obligatorio.')
  const skill = await service.addSkill(req.user.id, name)
  res.status(201).json(skill)
}

async function removeSkill(req, res) {
  await service.removeSkill(req.user.id, req.params.id)
  res.status(204).send()
}

async function updateDocument(req, res) {
  const { status, fileUrl } = req.body
  const document = await service.updateDocument(req.user.id, req.params.documentTypeId, { status, fileUrl })
  res.json(document)
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
