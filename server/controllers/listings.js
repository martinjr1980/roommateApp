var User = require('./../models/user');
var Listing = require('./../models/listing');

module.exports = (function() {
	return {
		index: function (req, res) {
			Listing.find({}, function (err, results) {
				res.json(results);
			})
		},

		create: function (req, res) {
			Listing.findOne({ _craigslist_id: req.body._craigslist_id }, function (err, listing) {
				if (listing === null) {
					listing = new Listing(req.body);
					listing.created_at = new Date();
					listing.save(function (err) {
						res.json(listing);
					})
				}
				else {
					res.json(listing);
				}
			})
		},

		like: function (req, res) {
			if (req.body.like_status === true) {
				User.findOne({ _fb_id: req.body._fb_id }, function (err, user) {
					user.like_listings.push(req.body._craigslist_id);
					user.save(function (err) {
						res.end();
					})
				})
			}
			else {
				User.findOne({ _fb_id: req.body._fb_id }, function (err, user) {
					for (var j=0; j<user.like_listings.length; j++) {
						if (user.like_listings[j] == req.body._craigslist_id) {
							user.like_listings[j] = user.like_listings[user.like_listings.length-1];
							user.like_listings.pop();
							j--;
						}
					}
					user.save(function (err) {
						res.end();
					})
				})
			}
		}
	}
})();