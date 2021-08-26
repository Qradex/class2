import register from './routes/register.js'
import login from './routes/login.js'
import profile from './routes/profile.js'
import board from './routes/board.js'
import list from './routes/list.js'
import card from './routes/card.js'

import { createRequire } from "module"
import swaggerUi from 'swagger-ui-express'
const require = createRequire(import.meta.url)
const swaggerDocument = require('./routes/configs/swagger-output.json')

import express from 'express'
import cors from 'cors'

const app = express()

const { LISTEN_DOOR } = process.env

const corsOptions = {
  exposedHeaders: 'auth-superman'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(register)
app.use(login)
app.use(profile)
app.use(board)
app.use(list)
app.use(card)

app.listen(LISTEN_DOOR)