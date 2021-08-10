import app from "./configs/app.js"
import { Mongoose, UserSchema } from './configs/db.js'
import bcrypt from 'bcrypt'
import { singupValidation } from './configs/users-validation.js'

app.post('/register', async (req, res) => {
  const { error } = singupValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
 
  const email = req.body.email
  const salt = await bcrypt.genSalt(10)
  const cryptograf = await bcrypt.hash(req.body.password, salt)
  const password = cryptograf
  
  const Users = Mongoose.model('users', UserSchema, 'users')
  
  try {
    const foundUser = await Users.findOne({ email: email }).exec()
    if(foundUser) {
      return res.status(409).send('E-mail já cadastrado!')
    }
      const user = new Users({ email, password })
      await user.save()
      res.status(201).send('Cadastro realizado com sucesso!')
  } catch (err) {
    res.send(err)
  }
})

export default app