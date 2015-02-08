var mongoose = require('mongoose');
var Listing = require('./listing')
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema ({
	_fb_id: String,
	first_name: String,
	last_name: String,
	url: String,
	birthday: Date,
	like_listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
	created_at: Date
});

module.exports = mongoose.model('User', UserSchema);