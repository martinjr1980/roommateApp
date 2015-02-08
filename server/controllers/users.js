var User = require('./../models/user');
var Listing = require('./../models/listing');

module.exports = (function() {
	return {
		index: function (req, res) {
			User.find({}, function (err, results) {
				res.json(results);
			})
		},

		create: function (req, res) {
			User.findOne({ _fb_id: req.body._fb_id }, function (err, user) {
				if (user === null) {
					user = new User(req.body);
					user.created_at = new Date();
					user.save(function (err) {
						res.json(user);
					})
				}
				else {
					res.json(user);
				}
			})
		},

		show: function (req, res) {
			User.findOne({ _fb_id: req.params._fb_id })
				.populate('listings')
				.exec(function (err, user) {
					res.json(user);
				})
		}
	}
})();