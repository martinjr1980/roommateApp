// var mongoose = require('mongoose');
module.exports = {
	index: function(req, res) {
		res.render('index');
	},

	welcome: function(req, res) {
		res.render('welcome');
	},

	profile: function(req, res) {
		res.render('profile');
	},

	list: function(req, res) {
		res.render('list');
	},

	map: function(req, res) {
		res.render('map');
	}
}