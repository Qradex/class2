import home from './routes/home.js'
import profile from './routes/profile.js'
import register from './routes/register.js'
import board from './routes/board.js'
import login from './routes/login.js'
import boards from './routes/board.js'
import express from 'express'
import cors from 'cors'

const app = express()

const { LISTEN_DOOR } = process.env

const corsOptions = {
  exposedHeaders: 'auth-superman'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(home)
app.use(profile)
app.use(register)
app.use(board)
app.use(login)
app.use(boards)

app.listen(LISTEN_DOOR)