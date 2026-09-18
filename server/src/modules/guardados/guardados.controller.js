const service = require('./guardados.service')
const ApiError = require('../../utils/ApiError')

async function list(req, res) {
  const saved = await service.list(req.user.id)
  res.json(saved)
}

async function save(req, res) {
  const { vacanteId } = req.body
  if (!vacanteId) throw new ApiError(400, 'vacanteId es obligatorio.')
  const saved = await service.save(req.user.id, vacanteId)
  res.status(201).json(saved)
}

async function unsave(req, res) {
  await service.unsave(req.user.id, req.params.vacanteId)
  res.status(204).send()
}

module.exports = { list, save, unsave }
