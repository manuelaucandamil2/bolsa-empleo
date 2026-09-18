const service = require('./postulaciones.service')
const ApiError = require('../../utils/ApiError')

async function listMine(req, res) {
  const postulaciones = await service.listMine(req.user.id)
  res.json(postulaciones)
}

async function apply(req, res) {
  const { vacanteId } = req.body
  if (!vacanteId) throw new ApiError(400, 'vacanteId es obligatorio.')
  const postulacion = await service.apply(req.user.id, vacanteId)
  res.status(201).json(postulacion)
}

module.exports = { listMine, apply }
