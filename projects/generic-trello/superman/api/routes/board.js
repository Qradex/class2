import app from "./configs/app.js"
import { Mongoose, UsersSchema, BoardsSchema } from './configs/mongo.js'
import validationToken from './configs/validationToken.js'


app.get('/board', validationToken, async (req, res) => {

  const idUser = req.user._id

  const Users = Mongoose.model('users', UsersSchema, 'users')
  const Boards = Mongoose.model('boards', BoardsSchema, 'boards')

  try {

    const foundUser = await Users.findOne({ _id: idUser })

    if (foundUser) {

      const foundBoard = await Boards.find({ members: idUser })

      if (foundBoard.length == 0) {
        return res.status(404).send('Você ainda não possui nenhum quadro!')
      }

      res.status(200).send(foundBoard)
    }

  } catch (err) {

    return res.status(404).send('Usuário não encontrado')

  }
})

app.delete('/board', async (req, res) => {
  const { idBoard, idUser } = req.body

  const Boards = Mongoose.model('boards', BoardsSchema, 'boards')

  const foundBoards = await Boards.findOne({ _id: idBoard })

  if (foundBoards) {
    if (foundBoards.idUser == idUser) {
      Boards.deleteOne({ _id: idBoard }).exec()

      return res.status(200).json({
        error: false,
        message: "Quadro apagado com sucesso!"
      })
    }
    return res.status(404).send('Somente o dono do quadro pode deletar')
  }
  return res.status(404).send('Quadro Não encontrado')
})

app.patch('/boardtitle', async (req, res) => {
  const { idBoard, title } = req.body

  if (title.length < 5) {
    return res.status(400).send('Título deve possuir no mínimo 5 caracteres!')
  }

  const Boards = Mongoose.model('boards', BoardsSchema, 'boards')

  try {

    const foundBoard = await Boards.findOne({ _id: idBoard })

    if (foundBoard) {
      await foundBoard.updateOne({ title })
      return res.status(200).send('Título atualizado com sucesso!')
    }

    return res.status(404).send('Quadro não encontrado!')

  } catch (err) {
    return res.status(400).send(err)
  }
})

app.patch('/boardmembers', async (req, res) => {
  const { idBoard, members } = req.body

  const Boards = Mongoose.model('boards', BoardsSchema, 'boards')
  const Users = Mongoose.model('users', UsersSchema, 'users')

  try {

    const foundBoard = await Boards.findOne({ _id: idBoard })

    if (foundBoard) {

      const foundMembers = await Users.find({ _id: { $in: members } })

      if (foundMembers.length != 0) {

        const newMembers = foundMembers.map((member) => {
          return member._id.toString()
        }).filter((member) => {
          return !foundBoard.members.includes(member)
        })

        if (newMembers.length == 0) {
          return res.status(404).send('Membro já faz parte desde quadro!')
        }

        foundBoard.members.push(...newMembers)

        await foundBoard.updateOne({ members: foundBoard.members })
        return res.status(200).send('Novos membros inseridos com sucesso!')
      }

      return res.status(404).send('Membro não encontrado!')
    }

    return res.status(404).send('Quadro não encontrado!')

  } catch (err) {
    return res.status(400).send(err)
  }
})

export default app