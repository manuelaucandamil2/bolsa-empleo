const { Router } = require('express')
const controller = require('./perfil.controller')
const { requireAuth } = require('../../middleware/auth')

const router = Router()

router.use(requireAuth)
router.get('/me', controller.getProfile)
router.patch('/me', controller.updateProfile)
router.post('/educacion', controller.addEducation)
router.delete('/educacion/:id', controller.removeEducation)
router.post('/experiencia', controller.addExperience)
router.delete('/experiencia/:id', controller.removeExperience)
router.post('/habilidades', controller.addSkill)
router.delete('/habilidades/:id', controller.removeSkill)
router.patch('/documentos/:documentTypeId', controller.updateDocument)

module.exports = router
