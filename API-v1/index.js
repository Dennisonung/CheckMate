const express = require("express");
const sha512 = require("js-sha512").sha512;
const fs = require("fs");
const path = require("path");
require("./modules/startup.js").run(fs,path);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
global.api = "/api/v1";
global.Config = JSON.parse(fs.readFileSync(__dirname + '/config/config.json'));
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://checkmateAdmin:${Config.mongoosePassword}@cluster0.wag2biu.mongodb.net/`)
	.then(() => console.log('Connected to MongoDB.'));
global.forbidden = ["null","forbidden","fs"];
const ForbiddenFiles = ["startup.js"];
let modules = fs.readdirSync("./modules");
for (const i in modules) {
	let file = modules[i];
	if (!ForbiddenFiles.includes(file)) {
		const userModule = require("./modules/" + file);
		console.debug("Init module " + file);
		userModule.run(app, path, fs, sha512, global. Config);
	};
}
app.all('/*', (req, res) => res.status(404).send({ error: "Endpoint does not exist", code: 404}));

app.listen(8080, () => console.log(`checkmate listening on port ${Config.port}!`));
console.debug("checkmate loaded.");