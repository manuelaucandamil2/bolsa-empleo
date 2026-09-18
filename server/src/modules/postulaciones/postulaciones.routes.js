const { Router } = require('express')
const controller = require('./postulaciones.controller')
const { requireAuth } = require('../../middleware/auth')

const router = Router()

router.use(requireAuth)
router.get('/', controller.listMine)
router.post('/', controller.apply)

module.exports = router
