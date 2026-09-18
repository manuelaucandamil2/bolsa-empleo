const service = require('./vacantes.service')

async function list(req, res) {
  const vacantes = await service.list()
  res.json(vacantes)
}

async function getById(req, res) {
  const vacante = await service.getById(req.params.id)
  res.json(vacante)
}

module.exports = { list, getById }
