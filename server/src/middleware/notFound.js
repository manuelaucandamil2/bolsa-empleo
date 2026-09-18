function notFound(req, res) {
  res.status(404).json({ message: 'Recurso no encontrado.' })
}

module.exports = notFound
