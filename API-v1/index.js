const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
global.api = "/api/v1";
global.Config = JSON.parse(fs.readFileSync(__dirname + '/config/config.json'));
global.forbidden = ["null","forbidden","fs"];

let cores = fs.readdirSync("./" + Config.API_Version +"/modules");
for (const i in cores) {
	let file = cores[i];
	if (!ForbiddenFiles.includes(file)) {
		const userModule = require("./" + Config.API_Version +"/modules/" + file);
		console.debug("Init module " + file);
		userModule.run(app, path, fs, sha512);
	};
}
app.all('/*', (req, res) => res.status(404).send({ error: "Endpoint does not exist", code: 404}));

app.listen(8080, () => console.log(`checkmate listening on port ${Config.port}!`));
console.debug("checkmate loaded.");