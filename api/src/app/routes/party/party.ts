import Express from "express"
import PartyController from "../../controllers/party-controller"

const router = Express.Router()

router.post('/create', Express.json(), PartyController.insert)
router.get('/', PartyController.getAll)
router.put('/update',Express.json(),PartyController.update)
router.delete('/delete',Express.json(), PartyController.delete)

export default router
