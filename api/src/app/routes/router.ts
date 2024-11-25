import { Server } from "socket.io"
import partyRouter from "./party/party"
import { Express} from "express"

const router = (app: Express, io: Server) => {
	app.use(
		"/party",
		(req, res, next) => {
			res.locals.io = io;
			next()
		},
		partyRouter
	)
}

export default router
