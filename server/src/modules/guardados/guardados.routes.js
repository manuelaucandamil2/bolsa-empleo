const { Router } = require('express')
const controller = require('./guardados.controller')
const { requireAuth } = require('../../middleware/auth')

const router = Router()

router.use(requireAuth)
router.get('/', controller.list)
router.post('/', controller.save)
router.delete('/:vacanteId', controller.unsave)

module.exports = router
