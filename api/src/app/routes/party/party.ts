import Express from "express"
import PartyController from "../../controllers/party-controller"

const router = Express.Router()

router.post('/create', Express.json(), PartyController.insert)
router.get('/', PartyController.getAll)
router.put('/join',Express.json(),PartyController.join)
router.post('/play',Express.json(),PartyController.play)

export default router
