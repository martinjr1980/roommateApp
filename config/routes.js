var users = require('./../server/controllers/users.js');

// These routes are all going to return JSON data to the angular front end
module.exports = function (app) {
	app.get('/users.json', function (req, res) {
		users.index(req, res);
	})

	app.post('/users/create', function (req, res) {
		users.create(req, res);
	})

	app.get('/listings.json', function (req, res) {
		listings.index(req, res);
	})

	app.post('/listings/create', function (req, res) {
		listings.create(req, res);
	})

	app.get('/listings/like', function (req, res) {
		listings.like(req, res);
	})

	// app.get('/welcome', function (req, res) {
	// 	users.welcome(req, res);
	// })

	// app.get('/profile', function (req, res) {
	// 	users.profile(req, res);
	// })

	// app.get('/list', function (req, res) {
	// 	users.list(req, res);
	// }),

	// app.get('/map', function (req, res) {
	// 	users.map(req, res);
	// })
}
