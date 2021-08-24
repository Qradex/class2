import { Mongoose } from '../../index.js'
import listSchema from '../../models/list-schema.js'

const deleteListColunm = {

  async DeleteList(req, res) {
    const { listId } = req.body

    try {
      const List = await Mongoose.model('list', listSchema, 'list')
      const foundList = await List.findOne({ _id: listId })
      if (!foundList) {
        return res
          .status(404)
          .send({
            message: 'Não existe essa lista'
          })
      }
      const deleteList = await List.deleteOne({ _id: listId })
      return res
        .status(200)
        .send({
          message: `Lista deletada com sucesso ${deleteList}`
        })
    } catch (error) {
      return res
        .status(400)
        .send({
          message: 'Erro ao tentar deletar lista'
        })
    }
  }
}

export default deleteListColunm