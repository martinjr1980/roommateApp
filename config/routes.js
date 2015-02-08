var users = require('./../server/controllers/users.js');

// These routes are all going to return JSON data to the angular front end
module.exports = function (app) {
	app.get('/', function (req, res) {
		users.index(req, res);
	}),

	app.get('/welcome', function (req, res) {
		users.welcome(req, res);
	})

	app.get('/profile', function (req, res) {
		users.profile(req, res);
	})

	app.get('/list', function (req, res) {
		users.list(req, res);
	}),

	app.get('/map', function (req, res) {
		users.map(req, res);
	})
}
