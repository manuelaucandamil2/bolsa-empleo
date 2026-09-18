const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./modules/auth/auth.routes')
const vacantesRoutes = require('./modules/vacantes/vacantes.routes')
const postulacionesRoutes = require('./modules/postulaciones/postulaciones.routes')
const guardadosRoutes = require('./modules/guardados/guardados.routes')
const perfilRoutes = require('./modules/perfil/perfil.routes')

const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? '*' }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/vacantes', vacantesRoutes)
app.use('/api/postulaciones', postulacionesRoutes)
app.use('/api/guardados', guardadosRoutes)
app.use('/api/perfil', perfilRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
