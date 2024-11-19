import partyRouter from "./party/party"
import { Express} from "express"

const router = (app: Express) => {
	app.use("/party", partyRouter)
}

export default router
