import Party from "../app/models/party"

(async () => {
	await Party.sync({ alter: true });
})();
