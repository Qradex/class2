import { Router } from "express"
import cors from 'cors'
import listsColumn from "../controllers/lists/post.js"
import UserRegister from "../controllers/Users/register-post.js"
import UserLogin from "../controllers/Users/login-post.js"
import verifyToken from "../middlewares/verify-token.js"
import { validateUser } from "../middlewares/user-validate.js"
import { UserSchema } from "../validation/user-validation.js"
import { validateLogin } from "../middlewares/login-validate.js"
import { LoginSchema } from "../validation/login-validation.js"
import { validateBoard } from "../middlewares/board-validate.js"
import { BoardSchema, BoardUpdateSchema } from "../validation/board-validation.js"
import { BoardControllerPost } from "../controllers/Boards/post.js"
import { BoardControllerUpdate } from "../controllers/Boards/patch.js"
import { BoardControllerDelete } from "../controllers/Boards/delete.js"
import { BoardControllerGet } from "../controllers/Boards/get.js"
import deleteListColunm from "../controllers/lists/delete.js"
import cardController from "../controllers/Cards/post.js"
import changeLists from "../controllers/lists/patch.js"
import getLists from "../controllers/lists/get.js"
import Terms from "../controllers/Terms-Of-Services/get.js"
import { cardControllerUpdate } from "../controllers/Cards/patch.js"
import { cardControllerDelete } from "../controllers/Cards/delete.js"
import { cardControllerGet } from "../controllers/Cards/get.js"
import swaggerUi from 'swagger-ui-express'
import { createRequire } from "module"
import { UsersControllerGet } from "../controllers/Users/get.js"
import { BoardControllerUnassign } from "../controllers/Boards/patch-unassign-user.js"
import { Profile } from "../controllers/Users/profile.js"
import UsersFromBoard from "../controllers/Boards/users-bord.js"
import cardList from "../controllers/Cards/cards-list.js"
import ListsCards from "../controllers/lists/get-card-lists.js"
const require = createRequire(import.meta.url)
const swaggerFile = require("../swagger-output.json")

const routes = Router()

const corsOpition = {
  exposedHeaders: 'auth-token',
}

routes.use(cors(corsOpition))

routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

routes.get('/terms', Terms.TermsOfServices)

routes.get('/list/card', verifyToken, ListsCards.getListsCard)
routes.get('/list/:id', verifyToken, getLists.AllLists)
routes.post('/list', verifyToken, listsColumn.CreateList)
routes.patch('/list', verifyToken, changeLists.UpdateList)
routes.delete('/list', verifyToken, deleteListColunm.DeleteList)
routes.get('/card/list/:id', verifyToken, cardList.getCardList)

routes.post('/register', validateUser(UserSchema), UserRegister.creatUser)
routes.post('/login', validateLogin(LoginSchema), UserLogin.loginUser)
routes.get('/profile', verifyToken, Profile.ProfileUser)
routes.get('/users', verifyToken, UsersControllerGet.GetUsers)

routes.post("/board", verifyToken, validateBoard(BoardSchema), BoardControllerPost.CreateBoard)
routes.get("/board", verifyToken, BoardControllerGet.GetBoard)
routes.patch("/board/:id", verifyToken, validateBoard(BoardUpdateSchema), BoardControllerUpdate.UpdateBoard)
routes.patch("/board/:id/unassign", verifyToken, BoardControllerUnassign.UnassignUser)
routes.delete("/board/:id", verifyToken, BoardControllerDelete.DeleteBoard)
routes.get("/board/:id", verifyToken, UsersFromBoard.GetUsersFromBoard)

routes.delete('/card', verifyToken, cardControllerDelete.deleteCard)
routes.post('/card', verifyToken, cardController.createCard)
routes.patch('/card', verifyToken, cardControllerUpdate.updateCard)
routes.get('/card/:id', verifyToken, cardControllerGet.getCard)


export default routes