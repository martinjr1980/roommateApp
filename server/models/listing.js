var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListingSchema = new mongoose.Schema ({
	_craigslist_id: String,
	url: String,
	rent: Number,
	bed: Number,
	bath: Number,
	address: String,
	latitude: Number,
	longitude: Number,
	images: [{ type: String }],
	created_at: Date
});

module.exports = mongoose.model('Listing', ListingSchema);