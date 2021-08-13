import app from "./configs/app.js"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Mongoose, UserSchema } from './configs/db.js'
import { singinValidation } from './configs/users-validation.js'

dotenv.config()

app.post('/singin', async (req, res) => {
  const { error } = singinValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
 
  const{ email, password } = req.body
  const userModel = Mongoose.model('users', UserSchema, 'users')

  const user = await userModel.findOne({ email })
  if(!user){
    return res
    .status(400).send('email não encontrado')
  }

  const validPass = await bcrypt.compare(password, user.password)

  if(!validPass){
    return res.status(400).send('Senha invalida')
  }

  const token = jwt.sign({_id: user._id}, process.env.SECRET, { 

    expiresIn: 10000

})
  res.header('auth-token', token)
  res.send('logou')
})

export default app